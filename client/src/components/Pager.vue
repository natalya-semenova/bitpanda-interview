<template lang="pug">
.pager
  button.pager_nav-prev.pager_nav(
    :disabled='!paging.hasPrevPage',
    @click='navigate(-1)'
  )
    chevron(direction='left')
  button.pager_nav-next.pager_nav(
    :disabled='!paging.hasNextPage',
    @click='navigate(1)'
  )
    chevron(direction='right')
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';

import { Paging } from '@/models/paging';

import Chevron from './Chevron.vue';

export default defineComponent({
  name: 'pager',
  props: { paging: { type: Object as PropType<Paging>, required: true } },
  methods: {
    navigate(dir: -1 | 1) {
      const paging = { ...this.paging };

      paging.offset += paging.limit * dir;
      this.$emit('change', paging);
    },
  },
  components: { Chevron },
});
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.pager {
  width: 69px;
  height: 34px;
  margin: 16px 0 0 auto;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.17);
  box-sizing: border-box;
  border-radius: $component-border-radius;
  display: flex;
  align-items: center;
  overflow: hidden;

  &_nav {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 0 auto;

    &:disabled {
      cursor: default;
    }

    &-prev {
      border-right: 1px solid #a8a8a8;
    }
  }
}
</style>

