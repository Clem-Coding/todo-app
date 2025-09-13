<template>
  <ul>
    <li v-for="todo in props.todos" :key="todo.id" :class="{ active: todo.completed }">
      <input type="checkbox" :checked="todo.completed" @change="emitToggle(todo.id)" />
      {{ todo.title }}
    </li>
  </ul>
  <div>
    <p>items left</p>
    <button @click="emitClearCompleted">Clear Completed</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface Todo {
  title: string;
  completed: boolean;
  id: number;
}

const props = defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits<{
  (e: "toggle-completed", id: number): void;
  (e: "clear-completed"): void;
}>();

const emitToggle = (id: number) => {
  emit("toggle-completed", id);
};

const emitClearCompleted = () => {
  emit("clear-completed");
};
</script>
