<template lang="pug">
#app
  .todo-app
    todo-list(
      :todos='todos',
      @create-todo='createTodo($event)',
      @done-change='updateTodo($event)',
      @remove-todo='removeTodo($event)'
    )
    pager(:paging='paging', @paging='onPaging($event)')
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

import { createTodo, deleteTodo, fetchTodos, updateTodo } from '@/api/todo-api';
import { Paging } from '@/models/paging';
import { Todo } from '@/models/todo';

import Pager from './Pager.vue';
import TodoList from './TodoList.vue';

export default defineComponent({
  name: 'App',
  components: { TodoList, Pager },
  setup() {
    const todos = ref<Todo[]>([]);
    const paging = ref<Paging>({} as Paging);

    const getTodos = async (offset = 0, limit = 10) => {
      const response = await fetchTodos(offset, limit);

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
    async createTodo(description: string) {
      try {
        const createdTodo = await createTodo(description);
        // TODO only slice if paging limit reached
        const todos = this.todos.slice(0, -1);

        todos.unshift(createdTodo);
        this.todos = todos;
      } catch (e) {
        console.error(e);
      }
    },
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
    onPaging(paging: Paging) {
      // TODO handle err
      this.getTodos(paging.offset, paging.limit).catch((e) => console.error(e));
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
  box-sizing: border-box;
  padding: 50px 25px;
}

.todo-app {
  max-width: 589px;
  margin: 0 auto;
  text-align: center;
}
</style>
