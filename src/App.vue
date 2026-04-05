<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ButtonInstance } from './components/Button/types'
import Button from './components/Button/Button.vue'
const buttonRef = ref<ButtonInstance | null>()
onMounted(()=>{
  if(buttonRef.value){
    console.log('buttonRef', buttonRef.value.ref)
  }
})
</script>
 
<template>
  <Button type="primary" plain disabled ref="buttonRef">Test Button</Button>
</template>

<style scoped></style>
