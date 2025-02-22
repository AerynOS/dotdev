// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
      logo: {
        src: '@/images/logo.svg',
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
