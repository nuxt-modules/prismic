<template>
	<SliceSimulator #default="{ slices }">
		<SliceZone :slices="slices" :components="components" />
	</SliceSimulator>
</template>

<script>
import { SliceSimulator } from "@slicemachine/adapter-nuxt/simulator";

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
