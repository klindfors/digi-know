<script lang="ts">
	import Icon from './Icon.svelte';
	import { getTimetable } from './copy';
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

	const content = $derived(getTimetable(language));
	let step = $state(0);
	let confirmation = $state('');
	let notice = $state('');

	$effect(() => {
		onInstructionChange(step < 2 ? content.steps[step] : `${content.title} ${content.text}`);
	});

	function completeStep() {
		if (confirmation) return;
		confirmation = content.notes[step];
		notice = '';
		speak(content.notes[step]);
	}

	function advance() {
		if (step === 1) {
			onComplete();
			step = 2;
		} else {
			step = 1;
			confirmation = '';
		}
	}

	function pickSchedules() {
		if (step === 0) completeStep();
		else {
			notice = content.wrongSchedules;
			speak(content.wrongSchedules);
		}
	}

	function pickCourse() {
		if (step === 1) completeStep();
		else {
			notice = content.wrongCourse;
			speak(content.wrongCourse);
		}
	}
</script>

{#if step === 2}
	<main class="screen-content final-screen">
		<div class="celebration" aria-hidden="true"><Icon name="calendar" size={42} /></div>
		<p class="success-label"><Icon name="check" size={20} /> {t.finish}</p>
		<h1>{content.title}</h1>
		<p>{content.text}</p>
		<div class="final-actions">
			<button class="primary-button" onclick={onExit}><Icon name="check" />{t.finish}</button>
		</div>
	</main>
{:else}
	<main class="screen-content guide-screen">
		<div class="progress-row" aria-label={`Steg ${step + 1} av 2`}>
			<span>Steg {step + 1} av 2</span>
			<div class="progress-track"><span style="width:{(step + 1) * 50}%"></span></div>
		</div>
		<section class="step-heading"><span>{step + 1}</span><h1>{content.steps[step]}</h1></section>
		<div class="message-app timetable-mock" role="group" aria-label={content.app}>
			<div class="mock-top"><span>{content.app}</span><span class="mock-avatar">S</span></div>
			<div class="schedule-options">
				<button class={step === 0 ? 'is-current' : ''} onclick={pickSchedules}>
					<Icon name="calendar" /><strong>{content.schedules}</strong>
				</button>
				<button class={step === 1 ? 'is-current' : ''} onclick={pickCourse}>
					<Icon name="document" /><strong>{content.course}</strong>
				</button>
			</div>
		</div>
		<div class="status-space" aria-live="polite">
			{#if confirmation}
				<div class="confirmation"><Icon name="check" /><span>{confirmation}</span></div>
			{:else if notice}
				<div class="error-note"><Icon name="info" /><span>{notice}</span></div>
			{/if}
		</div>
		{#if confirmation}
			<button class="primary-button full" onclick={advance}>{t.next}</button>
		{/if}
	</main>
{/if}
