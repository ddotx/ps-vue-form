<template>
    <div v-if="msg" class="bg-red-500 text-white p-2 w-full my-2">{{ msg }}</div>
</template>

<script setup>
import { ref } from "vue";

// const error = ref("")
defineProps({
    msg: String
})
</script>
