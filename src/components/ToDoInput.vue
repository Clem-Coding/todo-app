<template>
  <form @submit.prevent="handleSubmit" class="todo-input-form">
    <label for="new-task-input" class="sr-only">Nouvelle tâche</label>
    <input
      id="new-task-input"
      type="text"
      placeholder="Create a new todo..."
      v-model="newTask"
      class="todo-input"
    />
    <label for="submit" class="submit-label"></label>
  </form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const newTask = ref("");
const emit = defineEmits<{
  (e: "add-todo", title: string): void;
}>();

const handleSubmit = () => {
  const trimmed = newTask.value.trim();
  if (trimmed) {
    emit("add-todo", trimmed);
    newTask.value = "";
  }
};
</script>
