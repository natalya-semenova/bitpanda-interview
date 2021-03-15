<template lang="pug">
li.todo-item 
  checkbox.todo-item_checkbox(
    :checked='todo.done',
    @change='onDoneChange(todo)'
  )
  span.todo-item_description {{ todo.description }}
  span.todo-item_remove(@click='$emit("remove", todo)')
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0.715217" y1="1.01405" x2="11.2707" y2="11.5695" stroke="#A3A3A3"/>
      <line x1="0.646447" y1="11.5695" x2="11.2019" y2="1.01405" stroke="#A3A3A3"/>
    </svg>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { Todo } from '@/models/todo';

import Checkbox from './CheckBox.vue';

export default defineComponent({
  name: 'todo-item',
  props: ['todo'],
  components: {
    Checkbox,
  },
  methods: {
    onDoneChange(todo: Todo) {
      todo.done = !todo.done;
      this.$emit('done-change', todo);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '../mixins.scss';

.todo-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 3rem;
  border-top: 1px solid #c6c6c6;

  &_checkbox {
    margin: 5px 0.5rem 5px 10px;
  }

  &_description {
    text-align: left;
  }

  &_remove {
    @include action-button;
    visibility: hidden;
  }

  &:hover &_remove {
    visibility: visible;
  }
}
</style>
