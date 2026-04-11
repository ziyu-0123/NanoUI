<template>
  <i class="nano-icon" :class="{[`nano-icon--${type}`] : type }" :style="customStyles" v-bind="$attrs">
    <FontAwesomeIcon v-bind="filteredProps"></FontAwesomeIcon>
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IconProps } from './types'
import { omit } from 'lodash-es'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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