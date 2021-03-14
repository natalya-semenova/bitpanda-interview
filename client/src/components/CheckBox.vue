<template lang="pug">
.checkbox(@click='$emit("change", !checked)')
  span.checkbox_checkmark(v-if='checked')
    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.4815 0.740738L6.59258 14.3704L2.14814 9.92592L0.962952 11.1111L6.88888 17.037L16.963 1.62963L15.4815 0.740738Z" fill="#5DC2AF"/>
    </svg>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'checkbox',
  props: ['checked'],
});
</script>

<style lang="scss" scoped>
.checkbox {
  flex: 0 0 auto;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 6px 5px 10px;
  border: 0.888889px solid #e5e5e5;
  border-radius: 50%;
  cursor: pointer;

  &_checkmark {
    position: relative;
    top: 2px;
  }
}
</style>

