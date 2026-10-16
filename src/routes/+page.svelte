<script lang="ts">
	import Icon from '../lib/Icon.svelte';
	import Guide from '../lib/Guide.svelte';
	import TimetableGuide from '../lib/TimetableGuide.svelte';
	import UploadCvGuide from '../lib/UploadCvGuide.svelte';
	import SafetyGuide from '../lib/SafetyGuide.svelte';
	import ErrorMessageGuide from '../lib/ErrorMessageGuide.svelte';
	import cityLogo from '../lib/assets/sthlmlogo.png';
	import { getCopy, getTaskHeading, taskIcons, areaClasses, type Language } from '../lib/copy';

	type Screen = 'tasks' | 'timetable' | 'guide' | 'practice' | 'profile' | 'teacher';

	const lockInOrder = true;
	const taskOrder = [0, 1, 2, 3, 4];
	const cardTone = ['task-card-yellow', 'task-card-blue', 'task-card-orange', 'task-card-green', ''];
	const abilityTone = ['ability-yellow', 'ability-blue', 'ability-orange', 'ability-green', ''];
	const needTone = ['need-icon-orange', 'need-icon-green', 'need-icon-yellow'];

	let screen = $state<Screen>('tasks');
	let language = $state<Language>('sv');
	let completedTasks = $state<number[]>([]);
	let practiceTask = $state(2);
	let exerciseInstruction = $state('');
	const t = $derived(getCopy(language));

	const readAloudText = $derived(
		screen === 'tasks'
			? `${getTaskHeading(language)}. ${t.chooseHint}`
			: screen === 'profile'
				? `${t.profileTitle}. ${t.profileHint}`
				: screen === 'teacher'
					? `${t.teacher}. ${t.teacherHint}`
					: exerciseInstruction
	);

	function setInstruction(text: string) {
		exerciseInstruction = text;
	}

	function completeTask(index: number) {
		if (!completedTasks.includes(index)) completedTasks = [...completedTasks, index];
	}

	$effect(() => {
		document.documentElement.lang = language;
		document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
	});

	const voices: Record<Language, string> = { sv: 'sv-SE', ar: 'ar', so: 'so', en: 'en-GB', ti:'ti' };

function speak(text: string) {
	if (!('speechSynthesis' in window)) return;
	window.speechSynthesis.cancel();
	const u = new SpeechSynthesisUtterance(text);
	const prefix = voices[language];
	const voice = window.speechSynthesis
		.getVoices()
		.find((v) => v.lang.toLowerCase().startsWith(prefix));
	if (voice) {
		u.voice = voice;
		u.lang = voice.lang;
	} else {
		u.lang = prefix;
	}
	window.speechSynthesis.speak(u);
}

	function start(index: number) {
		if (index === 0) screen = 'timetable';
		else if (index === 1) screen = 'guide';
		else {
			practiceTask = index;
			screen = 'practice';
		}
	}
</script>

<div class="page-shell">
	<div class="desktop-brand"><div class="brand-mark">D</div><span>DigiSteg</span></div>
	<div class="phone-frame">
		<div class="phone-app">
			<header class="app-header">
				{#if screen !== 'tasks'}
					<button class="icon-button" onclick={() => (screen = 'tasks')} aria-label="Gå tillbaka"><Icon name="back" /></button>
				{:else}
					<div class="city-logo"><img src={cityLogo} alt="Stockholms stad" /></div>
				{/if}
				<div class="header-actions">
					<button class="tool-button" onclick={() => speak(readAloudText)}>
						<svg class="icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
							<path d="M6 9a6 6 0 0 1 12 0c0 5-3 5.5-3 8a3 3 0 0 1-6 0" />
							<path d="M10 9a2 2 0 1 1 4 0c0 2.5-2 2.7-2 5" />
						</svg>
						<span>{t.voice}</span>
					</button>
					<label class="language-control">
						   <span class="language-flag" aria-hidden="true">{({ sv: '🇸🇪', en: '🇬🇧', so: '🇸🇴', ar: 'ع', ti: '🇪🇷' })[language]}</span>
						<span class="language-label">{t.language}</span>
						<select class="language-select-overlay" bind:value={language} aria-label={t.language}>
							<option value="sv">Svenska</option>
							<option value="en">English</option>
							<option value="ar">العربية</option>
							<option value="so">Soomaali</option>
							<option value="ti">ትግርኛ</option>
						</select>
					</label>
				</div>
			</header>

			{#if screen === 'tasks'}
				<main class="screen-content task-screen">
					<section class="intro">
						<p class="eyebrow">DIGISTEG</p>
						<h1>{getTaskHeading(language)}</h1>
						<p>{t.chooseHint}</p>
					</section>
					<div class="task-list" role="group" aria-label={t.choose}>
						{#each taskOrder as index, orderIndex (index)}
							{@const task = t.tasks[index]}
							{@const isComplete = completedTasks.includes(index)}
							{@const isCurrent =
								!isComplete &&
								(!lockInOrder || orderIndex === 0 || completedTasks.includes(taskOrder[orderIndex - 1]))}
							{@const isLocked = !isComplete && !isCurrent}
							<div
								class="task-step-item"
								class:current={isCurrent}
								class:completed={isComplete}
								class:locked={isLocked}
								class:last={orderIndex === taskOrder.length - 1}
							>
								<span class="step-marker" aria-hidden="true">
									{#if isComplete}<Icon name="check" size={20} />{:else}{orderIndex + 1}{/if}
								</span>
								<button
									class="task-card {areaClasses[index]} {cardTone[index]}"
									disabled={isLocked}
									onclick={() => start(index)}
								>
									<span class="task-icon"><Icon name={taskIcons[index]} size={28} /></span>
									<span class="task-copy"><small>{t.areas[index]}</small><strong>{task[0]}</strong><span>{task[1]}</span></span>
									<Icon name="chevron" />
								</button>
								{#if isLocked}
									<span class="task-lock-overlay" aria-hidden="true"><Icon name="lock" size={30} /></span>
								{/if}
							</div>
						{/each}
					</div>
					<button class="profile-banner" onclick={() => (screen = 'profile')}>
						<span><Icon name="profile" /></span>
						<strong>{t.profile}</strong>
						<Icon name="chevron" />
					</button>
				</main>
			{:else if screen === 'timetable'}
				{#key language}
					<TimetableGuide
						{t}
						{language}
						onExit={() => (screen = 'tasks')}
						onComplete={() => completeTask(0)}
						onInstructionChange={setInstruction}
						{speak}
					/>
				{/key}
			{:else if screen === 'guide'}
				{#key language}
						<Guide
							{t}
							{language}
							onExit={() => (screen = 'profile')}
							onComplete={() => completeTask(1)}
							onInstructionChange={setInstruction}
							{speak}
						/>
				{/key}
			{:else if screen === 'practice'}
				{#key language}
					{#if practiceTask === 2}
						<UploadCvGuide
							{t}
							{language}
							onExit={() => (screen = 'tasks')}
							onComplete={() => completeTask(2)}
							onInstructionChange={setInstruction}
							{speak}
						/>
					{:else if practiceTask === 3}
						<SafetyGuide
							{t}
							{language}
							onExit={() => (screen = 'tasks')}
							onComplete={() => completeTask(3)}
							onInstructionChange={setInstruction}
							{speak}
						/>
					{:else}
						<ErrorMessageGuide
							{t}
							{language}
							onExit={() => (screen = 'tasks')}
							onComplete={() => completeTask(4)}
							onInstructionChange={setInstruction}
							{speak}
						/>
					{/if}
				{/key}
			{:else if screen === 'profile'}
				<main class="screen-content profile-screen">
					<section class="intro">
						<p class="eyebrow">DIGCOMP</p>
						<h1>{t.profileTitle}</h1>
						<p>{t.profileHint}</p>
					</section>
					<div class="ability-new">
						<Icon name="spark" /><span><small>{t.newAbility}</small><strong>{t.abilities[1]}</strong></span>
					</div>
					<div class="ability-list">
						{#each t.abilities as ability, index (ability)}
							<article class="ability-card {areaClasses[index]} {abilityTone[index]}">
								<div class="ability-top">
									<span class="task-icon"><Icon name={taskIcons[index]} /></span>
									<strong>{t.areas[index]}</strong>
									{#if index < 2}<Icon name="check" />{/if}
								</div>
								<p>{ability}</p>
								<div class="growth-track" aria-label={index < 2 ? 'Förmåga tillagd' : 'Nästa steg'}>
									<span style="width:{index === 0 ? '60%' : index === 1 ? '45%' : '10%'}"></span>
								</div>
							</article>
						{/each}
					</div>
				</main>
			{:else}
				<main class="screen-content teacher-screen">
					<section class="intro">
						<p class="eyebrow">DIGISTEG FÖR LÄRARE</p>
						<h1>{t.teacher}</h1>
						<p>{t.teacherHint}</p>
					</section>
					<div class="group-pill"><Icon name="briefcase" /><strong>{t.group}</strong></div>
					<h2>Gemensamma övningsbehov</h2>
					<div class="need-list">
						{#each t.needs as need, index (need[0])}
							{@const area = [2, 3, 0][index]}
							<article class="need-card {areaClasses[area]} {needTone[index]}">
								<span class="task-icon"><Icon name={taskIcons[area]} /></span>
								<p><strong>{need[0]}</strong><span>{need[1]}</span></p>
							</article>
						{/each}
					</div>
					<div class="privacy-note"><Icon name="shield" /><p>{t.privacy}</p></div>
				</main>
			{/if}

			<nav class="bottom-nav" aria-label="Huvudmeny">
				<button
					class={screen === 'tasks' || screen === 'timetable' || screen === 'guide' || screen === 'practice'
						? 'active'
						: ''}
					onclick={() => (screen = 'tasks')}
				>
					<Icon name="calendar" /><span>{t.home}</span>
				</button>
				<button class={screen === 'profile' ? 'active' : ''} onclick={() => (screen = 'profile')}>
					<Icon name="profile" /><span>{t.profile}</span>
				</button>
				<button class={screen === 'teacher' ? 'active' : ''} onclick={() => (screen = 'teacher')}>
					<Icon name="briefcase" /><span>{t.teacher}</span>
				</button>
			</nav>
		</div>
	</div>
	<aside class="annotations" aria-label="Design annotations">
		<strong>Behavioural notes</strong>
		<span>Keyboard-ready controls · 56 px primary targets</span>
		<span>Voice, visual and text guidance work together</span>
		<span>No time limits · errors are calm and non-judgemental</span>
		<span>Responsive at 320 px and text can reflow at 200%</span>
	</aside>
</div>