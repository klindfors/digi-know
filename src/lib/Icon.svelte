<script lang="ts">
	import type { IconName } from './copy';

	let { name, size = 24 }: { name: IconName; size?: number } = $props();

	const paths: Record<IconName, string> = {
		arrow: `<path d="M5 12h13" /><path d="m14 7 5 5-5 5" />`,
		back: `<path d="m15 18-6-6 6-6" /><path d="M9 12h10" />`,
		briefcase: `<rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5h8v2M3 12h18" />`,
		calendar: `<rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18M8 14h3M8 17h6" />`,
		check: `<path d="m5 12 4 4L19 6" />`,
		chevron: `<path d="m9 18 6-6-6-6" />`,
		document: `<path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 13h6M9 17h6" />`,
		globe: `<circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />`,
		info: `<circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" />`,
		message: `<path d="M4 4h16v12H9l-5 4z" /><path d="M8 9h8M8 12h5" />`,
		profile: `<circle cx="12" cy="8" r="4" /><path d="M4 21c1-5 4-7 8-7s7 2 8 7" />`,
		refresh: `<path d="M20 7v5h-5M4 17v-5h5" /><path d="M6.1 9a7 7 0 0 1 11.7-2L20 12M4 12l2.2 5a7 7 0 0 0 11.7-2" />`,
		send: `<path d="m3 11 18-8-8 18-2-8z" /><path d="m11 13 5-5" />`,
		shield: `<path d="M12 3 4 6v5c0 5 3 8 8 10 5-2 8-5 8-10V6z" /><path d="m9 12 2 2 4-5" />`,
		spark: `<path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6z" />`,
		tools: `<path d="m14 6 4-3 3 3-3 4-4-4Z" /><path d="M15 8 5 19l-2-2L13 6M14 14l5 5M17 12l4 4" />`,
		translate: `<path d="M4 5h9M8.5 3v2M6 8c1 3 3 5 6 6M12 8c-1 3-3 5-7 7" /><path d="m14 20 3-7 3 7M15 18h4" />`,
		voice: `<path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 10v4" />`,
	};
</script>

<svg class="icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{@html paths[name]}</svg>
