<script lang="ts">
	import Icon from './Icon.svelte';
	import { listen } from './listen';
	import type { Copy, IconName, Language } from './copy';

	let { t, language, onExit, speak }: {
		t: Copy;
		language: Language;
		onExit: () => void;
		speak: (text: string) => void;
	} = $props();

	let step = $state(0);
	let confirmation = $state('');
	let notice = $state('');
	let showing = $state(false);
	let quiet = $state(false);
	let reply = $state('');
	let listening = $state(false);

	const icons: IconName[] = ['spark', 'voice', 'translate', 'check'];
	const inputTarget = $derived(step === 1 || step === 2 ? step : -1);

	function cls(n: number) {
		return `guide-target ${step === n ? 'is-target' : ''} ${showing && step === n ? 'demonstrating' : ''}`;
	}

	function complete() {
		if (step >= 4) return;
		const note = t.doneNotes[step];
		confirmation = note;
		notice = '';
		if (!quiet) speak(note);
	}

	function advance() {
		step++;
		confirmation = '';
		showing = false;
	}

	function wrong() {
		notice = t.wrong;
		if (!quiet) speak(t.wrong);
	}

	function show() {
		showing = true;
		notice = t.showDesc;
		if (!quiet) speak(step === 3 ? `${t.showDesc} ${t.steps[3]}` : t.showDesc);
		window.setTimeout(() => (showing = false), 1800);
	}

	function toggleQuiet() {
		quiet = !quiet;
		notice = quiet ? t.quietOn : '';
	}

	function restart() {
		step = 0;
		confirmation = '';
		notice = '';
		quiet = false;
		reply = '';
	}

	function act(index: number) {
		if (index === 0) show();
		else if (index === 3) toggleQuiet();
		else speak(t.steps[step]);
	}

	function typed(e: Event & { currentTarget: HTMLInputElement }) {
		const v = e.currentTarget.value;
		const first = reply.length === 0 && v.length > 0;
		reply = v;
		if (step === 2 && first) complete();
	}

	async function mic() {
		if (step !== 2 || listening) return;
		window.speechSynthesis?.cancel();
		listening = true;
		notice = '🎤 …';
		try {
			const text = await listen(language);
			notice = '';
			if (text) {
				const first = reply.length === 0;
				reply = text;
				if (first) complete();
			}
		} catch {
			notice = t.wrong;
		}
		listening = false;
	}

	function mockClick(e: MouseEvent) {
		if ((e.target as HTMLElement).dataset.wrong) wrong();
	}
</script>

{#if step === 4}
	<main class="screen-content final-screen">
		<div class="celebration" aria-hidden="true"><Icon name="spark" size={42} /></div>
		<p class="success-label"><Icon name="check" size={20} /> {t.sent}</p>
		<h1>{t.finalTitle}</h1>
		<p>{t.finalQuestion}</p>
		<div class="final-actions">
			<button class="primary-button" onclick={restart}><Icon name="refresh" />{t.again}</button>
			<button class="secondary-button" onclick={onExit}><Icon name="check" />{t.finish}</button>
		</div>
	</main>
{:else}
	<main class="screen-content guide-screen">
		<div class="progress-row" aria-label={`Steg ${step + 1} av 5`}>
			<span>Steg {step + 1} av 5</span>
			<div class="progress-track"><span style="width:{(step + 1) * 20}%"></span></div>
		</div>
		<section class="step-heading">
			<span>{step + 1}</span>
			<h1>{t.steps[step]}</h1>
		</section>
		{#if quiet}
			<div class="quiet-note"><Icon name="check" size={20} />{t.quietOn}</div>
		{/if}

		<div class="message-app" role="presentation" onclick={mockClick}>
			<div class="mock-top" data-wrong="true">
				<span data-wrong="true">Meddelanden</span><span class="mock-avatar">S</span>
			</div>
			{#if step === 0}
				<div class={cls(0)}>
					<span class="pointer" aria-label="Pilen pekar på rätt val"
						><Icon name="arrow" size={34} /></span
					>
					<button class="message-row" onclick={complete}>
						<span class="school-avatar">S</span>
						<span><strong>{t.school}</strong><small>{t.message}</small></span>
						<small>10:24</small>
					</button>
				</div>
			{:else}
				<div class="conversation">
					<span class="school-avatar">S</span>
					<div class="bubble">{t.message}</div>
				</div>
				<div class="composer-wrap">
					<div class={cls(inputTarget)}>
						{#if step === inputTarget}
							<span class="pointer" aria-label="Pilen pekar på rätt val"
								><Icon name="arrow" size={34} /></span
							>
						{/if}
						<input
							class="composer"
							aria-label={t.placeholder}
							placeholder={t.placeholder}
							value={step >= 2 ? reply : ''}
							readonly={step !== 2}
							onfocus={() => step === 1 && complete()}
							oninput={typed}
						/>
					</div>
					<button
						class="send-button"
						class:recording={listening}
						aria-label="Mikrofon"
						disabled={step !== 2 || listening}
						onclick={mic}
					>
						<svg class="icon" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
							<rect x="9" y="3" width="6" height="11" rx="3" />
							<path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
						</svg>
					</button>
					<div class={cls(3)}>
						{#if step === 3}
							<span class="pointer" aria-label="Pilen pekar på rätt val"
								><Icon name="arrow" size={34} /></span
							>
						{/if}
						<button
							class="send-button"
							aria-label={t.steps[3]}
							onclick={() => (step === 3 ? complete() : wrong())}
						>
							<Icon name="send" size={22} />
						</button>
					</div>
				</div>
			{/if}
		</div>

		<div class="status-space" aria-live="polite">
			{#if confirmation}
				<div class="confirmation"><Icon name="check" /><span>{confirmation}</span></div>
			{:else if notice}
				<div class={showing ? 'tip' : 'error-note'}>
					<Icon name={showing ? 'info' : 'arrow'} /><span>{notice}</span>
				</div>
			{/if}
		</div>

		{#if confirmation}
			<button class="primary-button full" onclick={advance}>{t.next}<Icon name="arrow" /></button>
		{:else}
			<div class="support-grid" aria-label="Stöd">
				{#each t.supports as label, index (label)}
					<button
						class={quiet && index === 3 ? 'active' : ''}
						onclick={() => act(index)}
						aria-pressed={index === 3 ? quiet : undefined}
					>
						<Icon name={icons[index]} size={22} /><span>{label}</span>
					</button>
				{/each}
			</div>
		{/if}
	</main>
{/if}
