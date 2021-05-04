<template>
  <pre>
    {{ document }}
  </pre>
</template>

<script>
export default {
  async asyncData ({ $prismic, error }) {
    const document = await $prismic.api.getByUID('page', 'home')

    if (document) {
      return { document }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  mounted () {
    console.log(this.$prismic.api)
  }
}
</script>
