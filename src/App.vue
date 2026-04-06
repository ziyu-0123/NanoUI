<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ButtonInstance } from './components/Button/types'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
const buttonRef = ref<ButtonInstance | null>()
onMounted(()=>{
  if(buttonRef.value){
    console.log('buttonRef', buttonRef.value.ref)
  }
})
</script>
 
<template>
  <Button type="primary" plain disabled ref="buttonRef">Test Button</Button>
  <a href="#">hello</a>

  <Collapse>
      <Item name="a">
        <template #title>
          <h1>nice title</h1>
        </template>
        <h1>headline title</h1>
        <div> this is content a aaa </div>
      </Item>
      <Item name="b" title="nice title b item b">
        <div> this is bbbbb test </div>
      </Item>
      <Item name="c" title="nice ccc" disabled>
        <div> this is cccc test </div>
      </Item>
    </Collapse>
</template>

<style scoped></style>
