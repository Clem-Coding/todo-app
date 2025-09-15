import { mount } from "@vue/test-utils";
import TodoList from "../TodoList.vue";

const todos = [
  { id: 1, title: "Finish reading Clean Code by Robert C. Martin", completed: false },
  { id: 2, title: "Get tickets for DevFest Nantes", completed: true },
];

import { describe, it, expect } from "vitest";

describe("TodoList", () => {
  it("displays all tasks passed as props", () => {
    const wrapper = mount(TodoList, {
      props: { todos, itemsLeft: 1, filter: "all" },
    });
    expect(wrapper.text()).toContain("Finish reading Clean Code by Robert C. Martin");
    expect(wrapper.text()).toContain("Get tickets for DevFest Nantes");
  });
});
