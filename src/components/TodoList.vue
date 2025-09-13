<template>
  <ul>
    <li v-for="todo in props.todos" :key="todo.id" :class="{ active: todo.completed }">
      <input type="checkbox" :checked="todo.completed" @change="emitToggle(todo.id)" />
      {{ todo.title }}
      <button @click="emitDelete(todo.id)">
        <img src="/images/icon-cross.svg" alt="Supprimer la tâche" />
      </button>
    </li>
  </ul>
  <div>
    <p>
      {{ props.itemsLeft !== 0 ? props.itemsLeft : "" }}
      {{
        props.itemsLeft === 0 ? "No items left" : props.itemsLeft === 1 ? "item left" : "items left"
      }}
    </p>
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
  itemsLeft: number;
}>();

const emit = defineEmits<{
  (e: "toggle-completed", id: number): void;
  (e: "clear-completed"): void;
  (e: "delete-todo", id: number): void;
}>();

const emitToggle = (id: number) => {
  emit("toggle-completed", id);
};

const emitClearCompleted = () => {
  emit("clear-completed");
};

const emitDelete = (id: number) => {
  emit("delete-todo", id);
};
</script>
