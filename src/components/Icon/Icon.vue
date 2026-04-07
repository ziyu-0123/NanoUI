<template>
  <i class="nano-icon" :class="{[`nano-icon--${type}`] : type }" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filteredProps"></font-awesome-icon>
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IconProps } from './types'
import { omit } from 'lodash-es'
defineOptions({
  name: 'NanoIcon',
  inheritAttrs: false
})
const props = defineProps<IconProps>()
const filteredProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>