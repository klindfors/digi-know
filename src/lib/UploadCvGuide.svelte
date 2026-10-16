<script lang="ts">
	import Icon from './Icon.svelte';
	import { getUpload } from './copy';
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

	const content = $derived(getUpload(language));
	let step = $state(0);
	let feedback = $state('');

	$effect(() => {
		onInstructionChange(step < 3 ? content.steps[step] : content.complete);
	});

	function selectFile(isCv: boolean) {
		const message = isCv ? content.selected : content.wrong;
		feedback = message;
		speak(message);
	}
</script>

{#if step === 3}
	<main class="screen-content final-screen">
		<div class="celebration" aria-hidden="true"><Icon name="document" size={42} /></div>
		<h1>{content.complete}</h1>
		<div class="final-actions">
			<button class="primary-button" onclick={onExit}>{content.back}</button>
		</div>
	</main>
{:else}
	<main class="screen-content guide-screen">
		<div class="progress-row" aria-label={`Steg ${step + 1} av 3`}>
			<span>Steg {step + 1} av 3</span>
			<div class="progress-track"><span style="width:{(step + 1) * 33.333}%"></span></div>
		</div>
		<section class="step-heading"><span>{step + 1}</span><h1>{content.steps[step]}</h1></section>
		<div class="upload-mock">
			{#if step === 0}
				<button
					class="secondary-button full"
					onclick={() => {
						step = 1;
						feedback = '';
					}}
				>
					<Icon name="document" />{content.choose}
				</button>
			{:else if step === 1}
				<div class="file-list">
					<button onclick={() => selectFile(false)}><Icon name="document" /><span>{content.photo}</span></button>
					<button onclick={() => selectFile(true)}><Icon name="document" /><span>{content.cv}</span></button>
				</div>
			{:else}
				<div class="selected-file">
					<Icon name="document" /><strong>{content.cv}</strong><Icon name="check" />
				</div>
			{/if}
		</div>
		{#if feedback}
			<div class="status-space" aria-live="polite">
				<div class={feedback === content.selected ? 'confirmation' : 'error-note'}>
					<Icon name={feedback === content.selected ? 'check' : 'info'} /><span>{feedback}</span>
				</div>
			</div>
		{/if}
		{#if step === 1 && feedback === content.selected}
			<button
				class="primary-button full"
				onclick={() => {
					step = 2;
					feedback = '';
				}}
			>
				{t.next}
			</button>
		{/if}
		{#if step === 2}
			<button
				class="primary-button full upload-action"
				onclick={() => {
					onComplete();
					step = 3;
				}}
			>
				<Icon name="document" />{content.upload}
			</button>
		{/if}
	</main>
{/if}
