<template>
  <button class="dark-mode-toggle" @click="emitToggleDarkMode">
    <img
      :src="isDarkMode ? '/images/icon-sun.svg' : '/images/icon-moon.svg'"
      alt="Toggle Dark Mode"
    />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ isDarkMode: boolean }>();
const emit = defineEmits(["toggle-dark-mode"]);

const emitToggleDarkMode = () => {
  emit("toggle-dark-mode");
};
</script>
