<script lang="ts">
	import Icon from '../lib/Icon.svelte';
	import Guide from '../lib/Guide.svelte';
	import { getCopy, taskIcons, areaClasses, type Language } from '../lib/copy';

	type Screen = 'tasks' | 'guide' | 'profile' | 'teacher';

	let screen = $state<Screen>('tasks');
	let language = $state<Language>('sv');
	const t = $derived(getCopy(language));

	$effect(() => {
		document.documentElement.lang = language;
		document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
	});

	const voices: Record<Language, string> = { sv: 'sv-SE', ar: 'ar', so: 'so', en: 'en-GB' };

	function speak(text: string) {
		if (!('speechSynthesis' in window)) return;
		window.speechSynthesis.cancel();
		const u = new SpeechSynthesisUtterance(text);
		u.lang = voices[language];
		window.speechSynthesis.speak(u);
	}

	function start(index: number) {
		if (index === 1) screen = 'guide';
		else speak(t.tasks[index][1]);
	}
</script>

<div class="page-shell">
	<div class="desktop-brand"><div class="brand-mark">S</div><span>StegVis</span></div>
	<div class="phone-frame">
		<div class="phone-app">
			<header class="app-header">
				{#if screen !== 'tasks'}
					<button class="icon-button" onclick={() => (screen = 'tasks')} aria-label="Gå tillbaka"><Icon name="back" /></button>
				{:else}
					<div class="mark" aria-hidden="true"><span>S</span></div>
				{/if}
				<div class="header-actions">
					<button
						class="tool-button"
						onclick={() => speak(screen === 'tasks' ? `${t.choose}. ${t.chooseHint}` : t.profileTitle)}
					>
						<Icon name="voice" size={20} /><span>{t.voice}</span>
					</button>
					<label class="language-control">
						<span aria-hidden="true" style="font-size:1.25rem">{({ sv: '🇸🇪', en: '🇬🇧', so: '🇸🇴', ar: 'ع' })[language]}</span>
						<span class="language-label">{t.language}</span>
						<select class="language-select-overlay" bind:value={language} aria-label={t.language}>
							<option value="sv">Svenska</option>
							<option value="en">English</option>
							<option value="ar">العربية</option>
							<option value="so">Soomaali</option>
						</select>
					</label>
				</div>
			</header>

			{#if screen === 'tasks'}
				<main class="screen-content task-screen">
					<section class="intro">
						<p class="eyebrow">STEGVIS</p>
						<h1>{t.choose}</h1>
						<p>{t.chooseHint}</p>
					</section>
					<div class="task-list">
						{#each t.tasks as task, index (task[0])}
							<button class="task-card {areaClasses[index]}" onclick={() => start(index)}>
								<span class="task-icon"><Icon name={taskIcons[index]} size={28} /></span>
								<span class="task-copy"><strong>{task[0]}</strong><span>{task[1]}</span><small>{t.areas[index]}</small></span>
								<Icon name="chevron" />
							</button>
						{/each}
					</div>
					<button class="profile-banner" onclick={() => (screen = 'profile')}>
						<span><Icon name="profile" /></span>
						<strong>{t.profile}</strong>
						<Icon name="chevron" />
					</button>
				</main>
			{:else if screen === 'guide'}
				{#key language}
						<Guide {t} {language} onExit={() => (screen = 'profile')} {speak} />
				{/key}
			{:else if screen === 'profile'}
				<main class="screen-content profile-screen">
					<section class="intro">
						<p class="eyebrow">DIGICOMP</p>
						<h1>{t.profileTitle}</h1>
						<p>{t.profileHint}</p>
					</section>
					<div class="ability-new">
						<Icon name="spark" /><span><small>{t.newAbility}</small><strong>{t.abilities[1]}</strong></span>
					</div>
					<div class="ability-list">
						{#each t.abilities as ability, index (ability)}
							<article class="ability-card {areaClasses[index]}">
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
						<p class="eyebrow">STEGVIS FÖR LÄRARE</p>
						<h1>{t.teacher}</h1>
						<p>{t.teacherHint}</p>
					</section>
					<div class="group-pill"><Icon name="briefcase" /><strong>{t.group}</strong></div>
					<h2>Gemensamma övningsbehov</h2>
					<div class="need-list">
						{#each t.needs as need, index (need[0])}
							{@const area = [2, 3, 0][index]}
							<article class="need-card {areaClasses[area]}">
								<span class="task-icon"><Icon name={taskIcons[area]} /></span>
								<p><strong>{need[0]}</strong><span>{need[1]}</span></p>
							</article>
						{/each}
					</div>
					<div class="privacy-note"><Icon name="shield" /><p>{t.privacy}</p></div>
				</main>
			{/if}

			<nav class="bottom-nav" aria-label="Huvudmeny">
				<button class={screen === 'tasks' || screen === 'guide' ? 'active' : ''} onclick={() => (screen = 'tasks')}>
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