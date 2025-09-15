<template>
  <ul class="todo-list">
    <li v-for="todo in props.todos" :key="todo.id" :class="{ active: todo.completed }">
      <div class="todo-left">
        <button
          class="circle-checkbox"
          :class="{ checked: todo.completed }"
          @click="emitToggle(todo.id)"
          aria-label="Marquer comme complétée"
        >
          <img v-if="todo.completed" src="/images/icon-check.svg" alt="Done" />
        </button>
        <span class="todo-text" :class="{ completed: todo.completed }">{{ todo.title }}</span>
      </div>
      <button @click="emitDelete(todo.id)" class="delete-button" aria-label="Delete todo">
        <img src="/images/icon-cross.svg" alt="Delete todo" />
      </button>
    </li>
  </ul>
  <div class="todo-list-footer">
    <p class="left">
      {{ props.itemsLeft !== 0 ? props.itemsLeft : "" }}
      {{
        props.itemsLeft === 0 ? "No items left" : props.itemsLeft === 1 ? "item left" : "items left"
      }}
    </p>
    <button @click="emitClearCompleted" class="clear">Clear Completed</button>
    <OptionsPanel
      :filter="props.filter"
      @set-filter="(value) => emit('set-filter', value)"
      class="options-panel"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import OptionsPanel from "./OptionsPanel.vue";

interface Todo {
  title: string;
  completed: boolean;
  id: number;
}

const props = defineProps<{
  todos: Todo[];
  itemsLeft: number;
  filter: string;
}>();

const emit = defineEmits<{
  (e: "toggle-completed", id: number): void;
  (e: "clear-completed"): void;
  (e: "delete-todo", id: number): void;
  (e: "set-filter", value: string): void;
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
