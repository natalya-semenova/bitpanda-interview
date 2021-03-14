<template lang="pug">
  #app.todo-app
    todo-list(v-bind:todos="todos")
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

import { fetchTodos } from '@/api/todo-api';

import TodoList from './TodoList.vue';

export default defineComponent({
  name: 'App',
  setup() {
    const todos = ref({});
    const paging = ref({});

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
  components: { TodoList },
});
</script>

<style lang="scss">
.todo-app {
  text-align: center;
}
</style>
