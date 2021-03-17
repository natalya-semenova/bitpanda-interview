<template lang="pug">
.todo-list
  ul
    create-todo-item(
      :class='{ sole: listEmpty }',
      @create='$emit("create-todo", $event)'
    )
    todo-item(
      v-for='todo in todos',
      :key='todo._id',
      :todo='todo',
      @done-change='$emit("done-change", $event)',
      @remove='$emit("remove-todo", $event)'
    ) {{ todo.description }}
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';

import { Todo } from '@/models/todo';

import CreateTodoItem from './CreateTodoItem.vue';
import TodoItem from './TodoItem.vue';

export default defineComponent({
  name: 'todo-list',
  props: { todos: { type: Array as PropType<Todo[]>, required: true } },
  data() {
    return {};
  },
  computed: {
    listEmpty(): boolean {
      return !this.todos?.length;
    },
  },
  methods: {},
  components: {
    CreateTodoItem,
    TodoItem,
  },
});
</script>

<style scoped lang="scss">
@import '../variables.scss';

.todo-list {
  border-radius: $component-border-radius;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.17);
  box-sizing: border-box;
  width: 100%;
}

.create-todo {
  &.sole {
    border-radius: $component-border-radius;
  }
}
</style>
