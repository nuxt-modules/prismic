/* eslint no-param-reassign: 0 */
import Vue from 'vue';

Vue.component('PrismicImage', {
  functional: true,
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  render(h, { props, data }) {
    const { url, alt, copyright } = props.field;

    // See https://vuejs.org/v2/guide/render-function.html#Functional-Components
    data.attrs = data.attrs || {};
    data.attrs.src = url;
    if (alt) {
      data.attrs.alt = alt;
    }
    if (copyright) {
      data.attrs.copyright = copyright;
    }
    return h(
      'img',
      data,
    );
  },
});
