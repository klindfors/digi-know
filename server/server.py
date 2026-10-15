# Python server for demo purposes, using faster-whisper and huggingface transformers for ASR. Not intended for production use, only for prototypes and

import tempfile
from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from faster_whisper import WhisperModel
from faster_whisper.audio import decode_audio

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
        if engine == "faster":
            loaded[key] = WhisperModel(name, device="cpu", compute_type="int8")
        elif engine == "hf":
            from transformers import pipeline

            loaded[key] = pipeline("automatic-speech-recognition", model=name)
        else:
            raise HTTPException(500, f"Unknown engine {engine}")
    return loaded[key]


@app.get("/languages")
def languages():
    return {code: {"engine": e, "model": m} for code, (e, m) in MODELS.items()}


@app.post("/transcribe")
def transcribe(audio: UploadFile, language: str = Form(...)):
    if language not in MODELS:
        raise HTTPException(400, f"No model for language {language}")
    engine, name = MODELS[language]
    model = get_model(engine, name)
    with tempfile.NamedTemporaryFile(suffix=".webm") as f:
        f.write(audio.file.read())
        f.flush()
        if engine == "faster":
            segments, _ = model.transcribe(f.name, language=language, task="transcribe")
            return {"text": " ".join(s.text.strip() for s in segments)}
        samples = decode_audio(f.name, sampling_rate=16000)
        return {"text": model(samples)["text"].strip()}