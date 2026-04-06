<template>
  <div
    class="nano-collapse-item"
    :class="{
      'is-disabled': disabled
    }"
    >
    <div class="nano-collapse-item__header" :id="`item-header-${name}`" @click="handleClick">
      <slot name="title">{{title}}</slot>
    </div>
    <div class="nano-collapse-item__content" :id="`item-content-${name}`" v-show="isActive">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default{
  name: 'NanoCollapseItem'
}
</script>


<script setup lang="ts">
import { inject, computed } from 'vue'
import type { CollapseItemProps } from './types'
import { collapseContextKey } from './types'
const props = defineProps<CollapseItemProps>()
const collapseContext = inject(collapseContextKey)
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name))
const handleClick = () => {
  if (props.disabled) return
  collapseContext?.handleItemClick(props.name)
}

</script>

<style scoped>
.nano-collapse-item__header {
  font-size: 30px;
}
</style>
