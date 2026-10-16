<script lang="ts">
	import Icon from './Icon.svelte';
	import { getErrorExercise } from './copy';
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

	const content = $derived(getErrorExercise(language));
	let feedback = $state<'wrong' | 'correct' | null>(null);

	$effect(() => {
		onInstructionChange(`${content.title}. ${content.message} ${content.question}`);
	});

	function choose(correct: boolean) {
		const result = correct ? 'correct' : 'wrong';
		feedback = result;
		speak(content[result]);
	}
</script>

<main class="screen-content guide-screen">
	<section class="intro"><p class="eyebrow">{t.areas[4]}</p><h1>{content.question}</h1></section>
	<article class="system-error-card" role="alert">
		<span class="error-symbol" aria-hidden="true">!</span>
		<div>
			<strong>{content.title}</strong>
			<p>{content.message}</p>
			<span class="error-retry">{content.retry}</span>
		</div>
	</article>
	<div class="problem-choices">
		<button onclick={() => choose(true)} disabled={feedback === 'correct'}>
			<Icon name="refresh" /><span>{content.correctChoice}</span>
		</button>
		<button onclick={() => choose(false)} disabled={feedback === 'correct'}>
			<Icon name="lock" /><span>{content.wrongChoice}</span>
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
