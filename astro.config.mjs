// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

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
            label: 'AerynOS',
            items: [
                { slug: 'aerynos' },
                { slug: 'aerynos/overview' },
                { slug: 'aerynos/philosophy' },
                { slug: 'aerynos/roadmap' },
                { slug: 'aerynos/faq' },
                { slug: 'aerynos/contribute' }
            ]
        },
        {
          label: 'Users',
          items: [
            { slug: 'users' },
            {
              label: 'Getting Started',
              items: [
                { slug: 'users/getting-started' },
                { slug: 'users/getting-started/requirements' },
                { slug: 'users/getting-started/downloading' },
                {
                  slug: 'users/getting-started/creating-the-live-enviroment'
                },
                {
                  slug: 'users/getting-started/booting-the-live-environment'
                }
              ]
            },
            {
              label: 'Desktops',
              items: [
                { slug: 'users/desktops' },
                { slug: 'users/desktops/cosmic' },
                { slug: 'users/desktops/gnome' }
              ]
            }
          ]
        },
        {
          label: 'Packaging',
          items: [
            { slug: 'packaging' },
            {
              label: 'Workflow',
              items: [
                { slug: 'packaging/workflow' },
                { slug: 'packaging/workflow/prerequisites' },
                { slug: 'packaging/workflow/basic-workflow' },
                { slug: 'packaging/workflow/creating-a-new-recipe' },
                { slug: 'packaging/workflow/updating-an-existing-recipe' }
              ]
            },
            {
              label: 'Recipes',
              items: [
                { slug: 'packaging/recipes' },
                { slug: 'packaging/recipes/overview' },
                { slug: 'packaging/recipes/upstreams' },
                { slug: 'packaging/recipes/metadata' },
                { slug: 'packaging/recipes/build-deps' },
                { slug: 'packaging/recipes/package-definition' },
                {
                  label: 'Triggers',
                  items: [
                    { slug: 'packaging/recipes/triggers' },
                    { slug: 'packaging/recipes/triggers/overview' },
                    { slug: 'packaging/recipes/triggers/tx-triggers' }
                  ]
                },
                {
                  label: 'System Accounts',
                  items: [
                    { slug: 'packaging/recipes/system-accounts' },
                    { slug: 'packaging/recipes/system-accounts/groups' },
                    { slug: 'packaging/recipes/system-accounts/overview' },
                    { slug: 'packaging/recipes/system-accounts/users' }
                  ]
                }
              ]
            },
            {
              label: 'Macros',
              autogenerate: { directory: 'Packaging/Macros' }
            },
          ]
        },
          {
              label: 'Developers',
              items: [
                  { slug: 'developers' },
                  {
                    label: 'Stone Format',
                    items: [
                        { slug: 'developers/stone' },
                        { slug: 'developers/stone/header' },
                        {
                            label: 'V1',
                            items: [
                                { slug: 'developers/stone/v1' },
                                { slug: 'developers/stone/v1/header' }
                            ]
                        }
                    ]
                  }
              ]
          }
      ],
    }),
  ],
})
