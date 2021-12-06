<template>
	<div>
		Hello World!
	</div>
</template>

<script setup>
import { usePrismic } from "~~/..";

const prismic = usePrismic();

console.log(prismic);
</script>
