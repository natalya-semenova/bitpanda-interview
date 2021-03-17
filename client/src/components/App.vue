<template lang="pug">
#app
  .todo-app
    search(v-model='searchTerm')
    todo-list(
      :todos='todos',
      @create-todo='createTodo($event)',
      @done-change='updateTodo($event)',
      @remove-todo='removeTodo($event)'
    )
    .todo-list-footer
      span.error(v-if='error') Operation failed
      pager(:paging='paging', @change='onPaging($event)')
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';

import { createTodo, deleteTodo, fetchTodos, updateTodo } from '@/api/todo-api';
import { Paging } from '@/models/paging';
import { Todo } from '@/models/todo';

import Pager from './Pager.vue';
import Search from './Search.vue';
import TodoList from './TodoList.vue';

export default defineComponent({
  name: 'App',
  setup() {
    const searchTerm = ref('');
    const todos = ref<Todo[]>([]);
    const paging = ref<Paging>({} as Paging);

    const getTodos = async (offset = 0, limit = 10, description?: string) => {
      const response = await fetchTodos({ offset, limit, description });

      todos.value = response.items;
      paging.value = response.meta;
    };

    let debounceId: number;

    watch(searchTerm, (newSearchTerm) => {
      clearTimeout(debounceId);

      debounceId = setTimeout(() => {
        getTodos(0, undefined, newSearchTerm).catch((e) => console.error(e));
      }, 300);
    });

    return {
      searchTerm,
      todos,
      paging,
      getTodos,
    };
  },
  mounted() {
    this.getTodos().catch((e) => this.onError(e));
  },
  data() {
    return {
      limit: 10,
      error: false,
    };
  },
  methods: {
    async createTodo(description: string) {
      try {
        const createdTodo = await createTodo(description);
        const todos = this.todos.slice();

        todos.push(createdTodo);
        this.todos = todos;
      } catch (e) {
        this.onError(e);
      }
    },
    async updateTodo(todo: Todo) {
      try {
        await updateTodo(todo);
      } catch (e) {
        this.onError(e);
      }
    },
    async removeTodo(todo: Todo) {
      try {
        await deleteTodo(todo);
        this.todos = this.todos.filter((t) => t._id !== todo._id);
      } catch (e) {
        this.onError(e);
      }
    },
    onError(e: Error) {
      this.error = true;
      console.error(e);
    },
    onPaging(paging: Paging) {
      this.getTodos(paging.offset, paging.limit).catch((e) => this.onError(e));
    },
  },
  components: { TodoList, Pager, Search },
});
</script>

<style lang="scss">
$todos-width: 589px;

#app {
  min-height: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 100px 25px 50px;
}

.todo-app {
  max-width: $todos-width;
  min-width: calc(min(#{$todos-width}, 100%));
  margin: 0 auto;
  text-align: center;
}

.search {
  margin-bottom: 1rem;
}

.todo-list-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .error {
    margin-left: 1px;
    color: red;
  }
}
</style>
