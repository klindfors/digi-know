<script lang="ts">
	import Icon from './Icon.svelte';
	import { getSafety } from './copy';
	import type { Copy, Language } from './copy';

	let {
		t,
		language,
		onExit,
		onComplete = () => {},
		onInstructionChange = () => {},
		speak
	}: {
		t: Copy;
		language: Language;
		onExit: () => void;
		onComplete?: () => void;
		onInstructionChange?: (text: string) => void;
		speak: (text: string) => void;
	} = $props();

	const content = $derived(getSafety(language));
	let feedback = $state<'wrong' | 'correct' | null>(null);

	$effect(() => {
		onInstructionChange(`${content.question} ${content.sender}. ${content.message}`);
	});

	function choose(isSafe: boolean) {
		const result = isSafe ? 'wrong' : 'correct';
		feedback = result;
		speak(content[result]);
	}
</script>

<main class="screen-content guide-screen">
	<section class="intro">
		<p class="eyebrow">{t.areas[3]}</p>
		<h1>{content.question}</h1>
	</section>
	<article class="sms-card" aria-label={`${content.sender}: ${content.message}`}>
		<div class="sms-sender"><span aria-hidden="true">?</span><strong>{content.sender}</strong></div>
		<p>{content.message}</p>
	</article>
	<div class="safety-choices" role="group" aria-label={content.question}>
		<button class="secondary-button" onclick={() => choose(true)} disabled={feedback === 'correct'}>
			<Icon name="shield" />{content.safe}
		</button>
		<button class="primary-button" onclick={() => choose(false)} disabled={feedback === 'correct'}>
			<svg class="icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
				<path d="M6 6l12 12M18 6 6 18" />
			</svg>
			{content.unsafe}
		</button>
	</div>
	<div class="safety-feedback" aria-live="polite">
		{#if feedback === 'wrong'}
			<div class="error-note"><Icon name="info" /><span>{content.wrong}</span></div>
		{:else if feedback === 'correct'}
			<div class="confirmation"><Icon name="check" /><span>{content.correct}</span></div>
		{/if}
	</div>
	{#if feedback === 'correct'}
		<button
			class="primary-button full"
			onclick={() => {
				onComplete();
				onExit();
			}}
		>
			{content.finish}
		</button>
	{/if}
</main>
