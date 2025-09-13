<template>
  <div class="filters">
    <button :class="{ active: props.filter === 'all' }" @click="emitSetFilter('all')">All</button>
    <button :class="{ active: props.filter === 'active' }" @click="emitSetFilter('active')">
      Active
    </button>
    <button :class="{ active: props.filter === 'completed' }" @click="emitSetFilter('completed')">
      Completed
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ filter: string }>();
const emit = defineEmits<{ (e: "set-filter", value: string): void }>();

const emitSetFilter = (value: string) => {
  emit("set-filter", value);
};
</script>
