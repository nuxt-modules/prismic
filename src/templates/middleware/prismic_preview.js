import { getMatchedComponents } from '../../utils.js'
// this file is located in .nuxt/prismic/middleware/prismic-preview.js
import Middleware from '../../middleware'

Middleware.prismic_preview = async ({ route, $prismic }) => {
  // Ignore on server
  if (process.server) return
  // Ignore if not generated
  if (!process.static) return
  // Ignore if no preview mode
  if (!$prismic.isPreview) return

  const Components = getMatchedComponents(route)
  Components.forEach(Component => Component.options.static = false)
}
