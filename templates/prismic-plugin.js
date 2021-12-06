import Vue from "vue";
import { createPrismic } from "@prismicio/vue";

Vue.use(createPrismic(<%= serialize(options) %>));
