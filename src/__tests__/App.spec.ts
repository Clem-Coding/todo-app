import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import App from "../App.vue";
import ToDoInput from "../components/ToDoInput.vue";
import TodoList from "../components/TodoList.vue";

async function addTasksForTesting(wrapper: any, tasks: string[]) {
  const inputComponent = wrapper.findComponent(ToDoInput);

  tasks.forEach((title, index) => {
    inputComponent.vm.$emit("add-todo", title);
    wrapper.vm.todos[index].id = index + 1;
  });

  await wrapper.vm.$nextTick();
}

describe("Add task", () => {
  it("adds a new task and displays it", async () => {
    const wrapper = mount(App);

    const inputComponent = wrapper.findComponent(ToDoInput);
    inputComponent.vm.$emit("add-todo", "Finish the book Clean Code by Robert C Martin");
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("Finish the book Clean Code by Robert C Martin");
  });
});

describe("Delete a task", () => {
  it("removes a task from the list", async () => {
    const wrapper = mount(App);

    const inputComponent = wrapper.findComponent(ToDoInput);
    inputComponent.vm.$emit("add-todo", "Task to delete");
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Task to delete");

    const todoListComponent = wrapper.findComponent(TodoList);

    const firstTodo = todoListComponent.props("todos")[0];
    todoListComponent.vm.$emit("delete-todo", firstTodo.id);
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).not.toContain("Task to delete");
  });
});

describe("Items left counter", () => {
  it("displays the correct text based on the number of items", async () => {
    const cases = [
      { itemsLeft: 0, expected: "No items left" },
      { itemsLeft: 1, expected: "1 item left" },
      { itemsLeft: 2, expected: "2 items left" },
    ];

    for (const c of cases) {
      const wrapper = mount(TodoList, {
        props: { itemsLeft: c.itemsLeft, todos: [] },
      });
      expect(wrapper.text()).toContain(c.expected);
    }
  });
});

describe("Filtering todos", () => {
  it("correctly filters todos according to the filter", async () => {
    const wrapper = mount(App);

    await addTasksForTesting(wrapper, ["Task 1", "Task 2", "Task 3"]);

    // Mark task 2 as completed
    const todoList = wrapper.findComponent(TodoList);
    const todos = wrapper.vm.todos;
    const secondTodoId = todos[1].id; // Task 2
    todoList.vm.$emit("toggle-completed", secondTodoId);
    await wrapper.vm.$nextTick();

    // filter 'all'
    wrapper.vm.setFilter("all");
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("Task 1");
    expect(wrapper.text()).toContain("Task 2");
    expect(wrapper.text()).toContain("Task 3");

    // filter 'active'
    wrapper.vm.setFilter("active");
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("Task 1");
    expect(wrapper.text()).not.toContain("Task 2");
    expect(wrapper.text()).toContain("Task 3");

    // filter 'completed'
    wrapper.vm.setFilter("completed");
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).not.toContain("Task 1");
    expect(wrapper.text()).toContain("Task 2");
    expect(wrapper.text()).not.toContain("Task 3");
  });
});

describe("Clear completed tasks", () => {
  it("removes all completed tasks from the list", async () => {
    const wrapper = mount(App);
    await addTasksForTesting(wrapper, ["Task 1", "Task 2", "Task 3"]);

    const todoList = wrapper.findComponent(TodoList);
    [1, 2, 3].forEach((id) => todoList.vm.$emit("toggle-completed", id));
    await wrapper.vm.$nextTick();

    todoList.vm.$emit("clear-completed");
    await wrapper.vm.$nextTick();

    ["Task 1", "Task 2", "Task 3"].forEach((task) => {
      expect(wrapper.text()).not.toContain(task);
    });
  });
});
