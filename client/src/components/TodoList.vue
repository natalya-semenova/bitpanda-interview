<template lang="pug">
.todo-list
  ul
    todo-item(
      v-for='todo in todos',
      :key='todo._id',
      :todo='todo',
      @done-change='$emit("done-change", $event)',
      @remove='$emit("remove", $event)'
    ) {{ todo.description }}
</template>

<script lang="ts">
import TodoItem from './TodoItem.vue';

export default {
  name: 'todo-list',
  props: ['todos'],
  data() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    TodoItem,
  },
};
</script>

<style scoped lang="scss">
.todo-list {
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.17);
  box-sizing: border-box;
  width: 100%;
}
</style>
