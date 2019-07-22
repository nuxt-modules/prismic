/* eslint no-param-reassign: 0 */
import Vue from 'vue';

Vue.component('PrismicLink', {
  functional: true,
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  render(h, {
    props, data, children, parent,
  }) {
    const { field } = props;
    const url = parent.$prismic.asLink(props.field);

    // Internal link
    if (field.link_type === 'Document') {
      data.props = data.props || {};
      data.props.to = url;

      return h(
        'nuxt-link',
        data,
        children,
      );
    }

    // See https://vuejs.org/v2/guide/render-function.html#Functional-Components
    data.attrs = data.attrs || {};
    data.attrs.href = url;

    if (field.target) {
      data.attrs.target = field.target;
      data.attrs.rel = 'noopener';
    }

    return h(
      'a',
      data,
      children,
    );
  },
});
