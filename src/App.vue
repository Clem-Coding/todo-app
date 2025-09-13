<template>
  <header class="header">
    <img src="/images/bg-mobile-dark.jpg" alt="Background" class="header-bg" />
    <h1>TODO</h1>
  </header>

  <main>
    <ToDoInput @add-todo="addTodo" />
    <TodoList
      :todos="filteredTodos"
      :items-left="itemsLeft"
      @toggle-completed="toggleCompleted"
      @clear-completed="removeCompletedTodos"
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
  console.log(notCompleted.length);
  return notCompleted.length;
});
</script>

// A faire Items left
