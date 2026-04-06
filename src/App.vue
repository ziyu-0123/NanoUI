<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ButtonInstance } from './components/Button/types'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
const buttonRef = ref<ButtonInstance | null>()
const openedValue = ref(['a'])
  onMounted(()=>{
  if(buttonRef.value){
    console.log('buttonRef', buttonRef.value.ref)
  }
  // setTimeout(() => {
  //   openedValue.value = ['a', 'b']
  // }, 2000)
})
</script>
 
<template>
  <Button type="primary" plain disabled ref="buttonRef">Test Button</Button>
  <a href="#">hello</a>

  <Collapse v-model="openedValue">
      <Item name="a" title="Title A">
        <h>headline title</h>
        <div> this is content a aaa </div>
      </Item>
      <Item name="b" title="Title B">
        <div> this is bbbbb test </div>
      </Item>
      <Item name="c" title="Disabled Title" disabled>
        <div> this is cccc test </div>
      </Item>
    </Collapse>
    {{openedValue}}
</template>

<style scoped></style>
