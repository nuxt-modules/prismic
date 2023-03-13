<template>
	<SliceSimulator #default="{ slices }">
		<SliceZone :slices="slices" :components="components" />
	</SliceSimulator>
</template>

<script>
import { SliceSimulator } from "@prismicio/slice-simulator-vue";

import components from "../all-slices.js";

export default {
	components: {
		SliceSimulator
  },
	data() {
		return { components };
	}
};
</script>
