<template>
  <header :class="['header', isDarkMode ? 'dark' : 'light']">
    <div class="header-content container">
      <h1>TODO</h1>
      <DarkModeToggle :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />
    </div>
  </header>

  <main class="container">
    <ToDoInput @add-todo="addTodo" />
    <TodoList
      :todos="filteredTodos"
      :items-left="itemsLeft"
      @toggle-completed="toggleCompleted"
      @clear-completed="removeCompletedTodos"
      @delete-todo="deleteTodo"
    />
    <OptionsPanel :filter="filter" @set-filter="setFilter" />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { computed } from "vue";
import ToDoInput from "./components/ToDoInput.vue";
import TodoList from "./components/TodoList.vue";
import OptionsPanel from "./components/OptionsPanel.vue";
import DarkModeToggle from "./components/DarkModeToggle.vue";

// Track dark mode state
const isDarkMode = ref(true);

interface Todo {
  title: string;
  completed: boolean;
  id: number;
}

const todos = ref<Todo[]>([]);
const addTodo = (title: string) => {
  todos.value.push({
    id: Date.now(),
    title,
    completed: false,
  });
};

const filter = ref("all");
const setFilter = (newFilter: string) => {
  filter.value = newFilter;
};

const filteredTodos = computed(() => {
  if (filter.value === "active") {
    return todos.value.filter((todo) => !todo.completed);
  }
  if (filter.value === "completed") {
    return todos.value.filter((todo) => todo.completed);
  }
  return todos.value;
});

const toggleCompleted = (id: number) => {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

const removeCompletedTodos = () => {
  todos.value = todos.value.filter((todo) => !todo.completed);
};

const itemsLeft = computed(() => {
  const notCompleted = todos.value.filter((todo) => !todo.completed);
  return notCompleted.length;
});

const deleteTodo = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle("light-theme", !isDarkMode.value);
};

// expose ref for testing
defineExpose({ todos, filter, filteredTodos, setFilter });
</script>
