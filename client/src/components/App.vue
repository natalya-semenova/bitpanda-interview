<template lang="pug">
#app
  .todo-app
    todo-list(
      :todos='todos',
      @done-change='updateTodo($event)',
      @remove='removeTodo($event)'
    )
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

import { deleteTodo, fetchTodos, updateTodo } from '@/api/todo-api';
import { Paging } from '@/models/paging';
import { Todo } from '@/models/todo';

import TodoList from './TodoList.vue';

export default defineComponent({
  name: 'App',
  components: { TodoList },
  setup() {
    const todos = ref<Todo[]>([]);
    const paging = ref<Paging>({} as Paging);

    const getTodos = async () => {
      const response = await fetchTodos();

      todos.value = response.items;
      paging.value = response.meta;
    };

    return {
      todos,
      paging,
      getTodos,
    };
  },
  mounted() {
    // TODO handle err
    this.getTodos().catch((e) => console.error(e));
  },
  methods: {
    async updateTodo(todo: Todo) {
      try {
        await updateTodo(todo);
      } catch (e) {
        console.error(e);
      }
    },
    async removeTodo(todo: Todo) {
      try {
        await deleteTodo(todo);
        this.todos = this.todos.filter((t) => t._id !== todo._id);
      } catch (e) {
        console.error(e);
      }
    },
  },
});
</script>

<style lang="scss">
#app {
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo-app {
  max-width: 589px;
  margin: 0 auto;
  text-align: center;
}
</style>
