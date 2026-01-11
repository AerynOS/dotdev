// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import starlightScrollToTop from "starlight-scroll-to-top";
import starlightKbd from "starlight-kbd";

// https://astro.build/config
export default defineConfig({
  site: "https://aerynos.dev",
  integrations: [
    starlight({
      logo: {
        dark: "@/images/logo.svg",
        light: "@/images/logo-light-mode.svg",
        replacesTitle: false,
      },
      title: "AerynOS Docs",
      // Multilingual reference implementation:
      // locales: {
      //   root: { label: "English", lang: "en" },
      //   es: { label: "Spanish", lang: "es" },
      //   fr: { label: "French", lang: "fr" },
      //   de: { label: "German", lang: "de" },
      //   pt: { label: "Portuguese", lang: "pt" },
      //   zh: { label: "Chinese", lang: "zh" },
      //   ja: { label: "Japanese", lang: "ja" },
      //   ko: { label: "Korean", lang: "ko" },
      //   ru: { label: "Russian", lang: "ru" },
      //   ar: { label: "Arabic", lang: "ar", dir: "rtl" },
      //   hi: { label: "Hindi", lang: "hi" },
      // },
      // defaultLocale: "root",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/AerynOS/dotdev",
        },
        {
          icon: "zulip",
          label: "Zulip",
          href: "https://aerynos.zulipchat.com/join/fuqokhsomj5mzqj6akqaiqlr/",
        },
        {
          icon: "mastodon",
          label: "Mastodon",
          href: "https://hachyderm.io/@AerynOS",
        },
      ],
      customCss: ["@/styles/global.css"],
      editLink: {
        baseUrl: "https://github.com/AerynOS/dotdev/edit/main/",
      },
      lastUpdated: true,
      components: {
        LastUpdated: "./src/components/LastUpdated.astro",
      },
      plugins: [
        starlightLinksValidator(),
        starlightScrollToTop({
          position: "right",
          showTooltip: true,
          smoothScroll: true,
          threshold: 10,
          svgPath: "M12 4L6 10H9V16H15V10H18L12 4M9 16L12 20L15 16",
          svgStrokeWidth: 2,
          borderRadius: "20",
          showProgressRing: true,
          showOnHomepage: true,
          tooltipText: "Back to top",
        }),
        starlightKbd({
          globalPicker: false,
          types: [
            { id: "mac", label: "macOS" },
            { id: "windows", label: "Windows" },
            { id: "linux", label: "Linux", default: true },
          ],
        }),
      ],
      sidebar: [
        {
          label: "AerynOS",
          items: [
            { slug: "aerynos" },
            { slug: "aerynos/overview" },
            { slug: "aerynos/philosophy" },
            { slug: "aerynos/faq" },
            { slug: "aerynos/contribute" },
          ],
        },
        {
          label: "Users",
          items: [
            { slug: "users" },
            {
              label: "Getting Started",
              items: [
                { slug: "users/getting-started" },
                { slug: "users/getting-started/requirements" },
                { slug: "users/getting-started/downloading" },
                {
                  slug: "users/getting-started/creating-the-live-enviroment",
                },
                {
                  slug: "users/getting-started/booting-the-live-environment",
                },
              ],
            },
            {
              label: "System Management",
              items: [
                { slug: "users/system-management" },
                { slug: "users/system-management/configuration-locations" },
                { slug: "users/system-management/moss-state-management" },
              ],
            },
            {
              label: "Desktops",
              items: [
                { slug: "users/desktops" },
                { slug: "users/desktops/cosmic" },
                { slug: "users/desktops/gnome" },
                { slug: "users/desktops/plasma" },
                {
                  label: "Window Managers",
                  items: [
                    { slug: "users/desktops/window-managers" },
                    { slug: "users/desktops/window-managers/sway" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Packaging",
          items: [
            { slug: "packaging" },
            {
              label: "Workflow",
              items: [
                { slug: "packaging/workflow" },
                { slug: "packaging/workflow/prerequisites" },
                { slug: "packaging/workflow/basic-workflow" },
                { slug: "packaging/workflow/creating-a-new-recipe" },
                { slug: "packaging/workflow/updating-an-existing-recipe" },
              ],
            },
            {
              label: "Recipes",
              items: [
                { slug: "packaging/recipes" },
                { slug: "packaging/recipes/overview" },
                { slug: "packaging/recipes/upstreams" },
                { slug: "packaging/recipes/metadata" },
                { slug: "packaging/recipes/monitoring" },
                { slug: "packaging/recipes/build-deps" },
                { slug: "packaging/recipes/package-definition" },
                {
                  label: "Triggers",
                  items: [
                    { slug: "packaging/recipes/triggers" },
                    { slug: "packaging/recipes/triggers/overview" },
                    { slug: "packaging/recipes/triggers/tx-triggers" },
                  ],
                },
                {
                  label: "System Accounts",
                  items: [
                    { slug: "packaging/recipes/system-accounts" },
                    { slug: "packaging/recipes/system-accounts/groups" },
                    { slug: "packaging/recipes/system-accounts/overview" },
                    { slug: "packaging/recipes/system-accounts/users" },
                  ],
                },
              ],
            },
            {
              label: "Macros",
              autogenerate: { directory: "Packaging/Macros" },
            },
          ],
        },
        {
          label: "Developers",
          items: [
            { slug: "developers" },
            {
              label: "Stone Format",
              items: [
                { slug: "developers/stone" },
                { slug: "developers/stone/header" },
                {
                  label: "V1",
                  items: [
                    { slug: "developers/stone/v1" },
                    { slug: "developers/stone/v1/header" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
