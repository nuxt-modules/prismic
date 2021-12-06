import { defineNuxtPlugin } from "#app";
import { createPrismic } from "@prismicio/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(createPrismic(<% options %>));
});
