<template lang="pug">
  #app.todo-app
    todo-list(
      :todos='todos',
    )
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

// Components

import TodoList from './components/TodoList.vue';

export default defineComponent({
  name: 'App',
  setup() {
    // utilise todo-bitpanda-server to get data

    return {
      message: 'Todo list should be here',
    };
  },
  components: { TodoList },
});
</script>

<style lang="scss">
.todo-app {
  text-align: center;
}
</style>
