let asr: any;

const names = { sv: 'swedish', en: 'english', ar: 'arabic', so: 'somali' } as const;

async function load() {
	if (!asr) {
		const { pipeline } = await import('@huggingface/transformers');
		asr = await pipeline('automatic-speech-recognition', 'Xenova/whisper-base', { dtype: 'q8' });
	}
	return asr;
}

export async function listen(language: keyof typeof names, ms = 5000): Promise<string> {
	const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
	const rec = new MediaRecorder(stream);
	const chunks: Blob[] = [];
	rec.ondataavailable = (e) => chunks.push(e.data);
	const stopped = new Promise<void>((r) => (rec.onstop = () => r()));
	rec.start();
	await new Promise((r) => setTimeout(r, ms));
	rec.stop();
	await stopped;
	stream.getTracks().forEach((t) => t.stop());

	const buf = await new Blob(chunks).arrayBuffer();
	const ctx = new AudioContext({ sampleRate: 16000 });
	const audio = (await ctx.decodeAudioData(buf)).getChannelData(0);
	const model = await load();
	const out = await model(audio, { language: names[language], task: 'transcribe' });
	return out.text.trim();
}