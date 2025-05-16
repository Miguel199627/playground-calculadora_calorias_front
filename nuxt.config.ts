import Aura from "@primeuix/themes/aura";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@primevue/nuxt-module"],
  css: ["~/assets/css/main.css"],
  srcDir: "src/",
  dir: {
    pages: "app/pages",
  },
  components: [{ path: "~/app/components", pathPrefix: true }],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
