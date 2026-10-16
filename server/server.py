
# Python server for demo purposes, using faster-whisper and huggingface transformers for ASR. Not intended for production use, only for prototypes and
import logging
import math
import os
import tempfile
import time
from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from faster_whisper import WhisperModel
from faster_whisper.audio import decode_audio

log = logging.getLogger("uvicorn.error")
LOG_TEXT = os.environ.get("LOG_TEXT") == "1"

MODELS = {
    "sv": ("faster", "KBLab/kb-whisper-small"),
    "en": ("faster", "small"),
    "ar": ("faster", "small"),
    "so": ("faster", "small"),
    "ti": ("hf", "waxal-benchmarking/whisper-tiny-waxal-tir"),
}

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://klindfors.github.io", "http://localhost:5173", "http://localhost:4173"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

loaded = {}


def get_model(engine, name):
    key = (engine, name)
    if key not in loaded:
        log.info("Loading %s:%s ...", engine, name)
        start = time.time()
        if engine == "faster":
            loaded[key] = WhisperModel(name, device="cpu", compute_type="int8")
        elif engine == "hf":
            from transformers import pipeline

            loaded[key] = pipeline("automatic-speech-recognition", model=name)
        else:
            raise HTTPException(500, f"Unknown engine {engine}")
        log.info("Loaded %s:%s in %.1fs", engine, name, time.time() - start)
    return loaded[key]


@app.get("/languages")
def languages():
    return {code: {"engine": e, "model": m} for code, (e, m) in MODELS.items()}


@app.get("/status")
def status():
    return {"loaded": [f"{e}:{n}" for (e, n) in loaded]}


@app.post("/transcribe")
def transcribe(audio: UploadFile, language: str = Form(...)):
    if language not in MODELS:
        log.warning("Request for unconfigured language %r", language)
        raise HTTPException(400, f"No model for language {language}")
    engine, name = MODELS[language]
    model = get_model(engine, name)
    start = time.time()
    extra = {}
    fd, path = tempfile.mkstemp(suffix=".webm")
    try:
        with os.fdopen(fd, "wb") as f:
            f.write(audio.file.read())
        if engine == "faster":
            segments, info = model.transcribe(path, language=language, task="transcribe")
            parts = list(segments)
            text = " ".join(s.text.strip() for s in parts)
            extra["audio_seconds"] = round(info.duration, 2)
            if parts:
                extra["confidence"] = round(sum(math.exp(s.avg_logprob) for s in parts) / len(parts), 2)
                extra["no_speech"] = round(max(s.no_speech_prob for s in parts), 2)
        else:
            samples = decode_audio(path, sampling_rate=16000)
            extra["audio_seconds"] = round(len(samples) / 16000, 2)
            text = model(samples)["text"].strip()
    except Exception:
        log.exception("[%s] transcription failed", language)
        raise HTTPException(500, "Transcription failed, see the server log")
    finally:
        os.remove(path)
    seconds = round(time.time() - start, 2)
    details = " ".join(f"{k}={v}" for k, v in extra.items())
    log.info("[%s] %s:%s took=%ss %s", language, engine, name, seconds, details)
    if not text:
        log.warning("[%s] empty transcription", language)
    if LOG_TEXT:
        log.info("[%s] text: %r", language, text)
    return {"text": text, "model": name, "seconds": seconds, **extra}