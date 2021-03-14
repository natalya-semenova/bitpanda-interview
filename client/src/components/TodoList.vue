<template lang="pug">
  section.todo-list
    ul
      li(v-for="todo in todos") {{ todo.description }}
</template>

<script lang="ts">
export default {
  name: 'todo-list',
  props: ['todos'],
  data() {
    return {

    };
  },
  methods: {

  },
  computed: {

  },
};

</script>

<style scoped lang="scss">
.todo-list {

}
</style>
