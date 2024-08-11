import process from "node:process";

const sw = process.env.SW === "true";
const baseUrl = process.env.BASE_URL ?? "/inter-knot/";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  devServer: {
    port: 5173,
  },
  runtimeConfig: {
    baseUrl,
  },
  nitro: {
    compressPublicAssets: true,
  },
  postcss: {
    plugins: {
      "postcss-preset-env": {},
    },
  },
  vite: {
    esbuild: {
      drop: ["debugger", "console"],
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "~/assets/css/common.less";',
        },
      },
    },
  },
  app: {
    baseURL: baseUrl,
    head: {
      title: "绳网",
      meta: [
        {
          name: "description",
          content: "欢迎来到绳网",
        },
        {
          name: "keywords",
          content: "绳网,Inter-Knot,zzz,绝区零,Zenless Zone Zero",
        },
      ],
      script: [
        {
          src: `${baseUrl}plugins/js-sdk-pro.min.js`,
          id: "LA_COLLECT",
          defer: true,
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: `${baseUrl}icon.svg`,
        },
      ],
    },
  },
  css: ["~/assets/css/main.less"],
  modules: [
    "@vite-pwa/nuxt",
    "@vueuse/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
      },
    ],
  ],
  pwa: {
    strategies: sw ? "injectManifest" : "generateSW",
    srcDir: sw ? "service-worker" : undefined,
    filename: sw ? "sw.ts" : undefined,
    registerType: "autoUpdate",
    manifest: {
      name: "绳网",
      short_name: "绳网",
      theme_color: "#121212",
      icons: [
        {
          src: "pwa-999.png",
          sizes: "999x999",
          type: "image/png",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico,jpg,jpeg,webp,avif,json}"],
    },
    injectManifest: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico,jpg,jpeg,webp,avif,json}"],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: "/",
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
});
