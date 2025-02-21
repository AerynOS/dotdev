// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'SerpendOS Docs',
			social: {
				github: 'https://github.com/serpent-os/',
			},
			sidebar: [
				{
					label: 'Users',
          autogenerate: { directory: 'users' },
				},
				{
					label: 'Packaging',
          autogenerate: { directory: 'packaging' },
				},
			],
		}),
	],
});
