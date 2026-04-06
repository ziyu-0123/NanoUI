<template>
  <button
    ref="_ref"
    class="nano-button"
    :class="{
      [`nano-button--${type}`]:type,
      [`nano-button--${size}`]:size,
      'is-plain':plain,
      'is-round':round,
      'is-circle':circle,
      'is-disabled':disabled
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
    >
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
export default{
  name: 'NanoButton'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import type { ButtonProps } from './types'

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref
})
</script>

<style>
.nano-button {
  background-color: var(--main-bg-color);
}
</style>
