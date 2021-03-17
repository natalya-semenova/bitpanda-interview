<template lang="pug">
li.todo-item(:class='todoItemCssClass') 
  checkbox.todo-item_checkbox(
    :checked='todo.done',
    @change='onDoneChange(todo)'
  )
  span.todo-item_description {{ todo.description }}
  span.todo-item_created-time - {{ timeElapsedFromCreation }} minutes
  span.todo-item_remove(@click='$emit("remove", todo)')
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0.715217" y1="1.01405" x2="11.2707" y2="11.5695" stroke="#A3A3A3"/>
      <line x1="0.646447" y1="11.5695" x2="11.2019" y2="1.01405" stroke="#A3A3A3"/>
    </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';

import { Todo } from '@/models/todo';

import Checkbox from './CheckBox.vue';

export default defineComponent({
  name: 'todo-item',
  props: { todo: { type: Object as PropType<Todo>, required: true } },
  computed: {
    timeElapsedFromCreation(): number {
      const now = Date.now();
      const created = new Date(this.todo.createdAt).valueOf();

      return Math.round((now - created) / 1000 / 100);
    },
    todoItemCssClass(): Record<string, boolean> {
      return {
        'todo-item--done': this.todo.done,
      };
    },
  },
  methods: {
    onDoneChange(todo: Todo) {
      todo.done = !todo.done;
      this.$emit('done-change', todo);
    },
  },
  components: {
    Checkbox,
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
    padding: 5px 0;
    word-break: break-all;
    font-weight: normal;
  }

  &--done &_description {
    text-decoration-line: line-through;
    color: #aeaeae;
    font-weight: 200;
  }

  &_created-time {
    margin: auto 0 17px 6px;
    // fw200 was not legible
    font-weight: 300;
    font-size: 0.625rem;
    line-height: 0.75rem;
    // using lighter color to meet the design look & feel
    color: #a7a7a7;
    white-space: nowrap;
  }

  &_remove {
    @include action-button;
    // keep it accessible for keyboard
    z-index: -1;
  }

  &:hover &_remove {
    z-index: 0;
  }
}
</style>
