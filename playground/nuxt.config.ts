export default defineNuxtConfig({
	modules: ["../src/module"],

	devtools: { enabled: true },

	runtimeConfig: {
		public: {
			prismic: {
				endpoint: "200629-sms-hoy",
			},
		},
	},

	compatibilityDate: "2025-12-24",

	prismic: {
		// endpoint: '200629-sms-hoy',
		clientConfig: {
			routes: [
				{
					type: "kitchen_sink_2",
					path: "/",
				},
				{
					type: "page",
					path: "/",
				},
			],
		},
	},
})
