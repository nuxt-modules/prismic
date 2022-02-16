import { withDocus } from 'docus'

export default withDocus({
	head: {
		script: [
			{ src: 'https://cdn.jsdelivr.net/npm/js-confetti@0.8.0/dist/js-confetti.browser.js', body: true },
			{
				innerHTML: `
if (typeof JSConfetti !== "undefined") {
	console
	new JSConfetti().addConfetti({
		emojis: ["🌲", "📚", "📐", "🚀"],
		emojiSize: 60,
	});
}
`
			}
		]
	},
	generate: {
		fallback: true
	},
	buildModules: ['vue-plausible'],
	plausible: {
		domain: 'prismic.nuxtjs.org'
	}
})
