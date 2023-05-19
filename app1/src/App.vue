<template>
    <HelloWorld />
    {{ utilsSum }}
</template>

<script setup>
import { defineAsyncComponent, ref } from "vue";
const HelloWorld = defineAsyncComponent(() => import("app2/HelloWorld"));
const utilsSum = ref(0);
import("app2/utils").then((utils) => {
    utilsSum.value = utils.sum(1, 4);
});
</script>

<style></style>
