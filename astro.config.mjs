// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    site: 'https://aerynos.dev',
	integrations: [
		starlight({
      logo: {
        dark: '@/images/logo.svg',
        light: '@/images/logo-light-mode.svg',
        replacesTitle: false,
      },
			title: 'AerynOS Docs',
			social: {
				github: 'https://github.com/AerynOS/dotdev',
			},
      customCss: [
        '@/styles/global.css',
      ],
			sidebar: [
				{
					label: 'Users',
          autogenerate: { directory: 'Users' },
				},
				{
					label: 'Packaging',
          autogenerate: { directory: 'Packaging' },
				},
			],
		}),
	],
});
