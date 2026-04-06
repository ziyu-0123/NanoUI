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
const testClick=()=>{
  alert(123)
}
</script>
 
<template>
  <Button type="primary" plain ref="buttonRef" disabled>Test Button</Button><br/>
  <a href="#">hello</a><br/>
  
  <Button type="primary" @click="testClick">Primary</Button>
  <Button type="success">Success</Button>
  <Button type="info">Info</Button>
  <Button type="warning">Warning</Button>
  <Button type="danger">Danger</Button><br/><br/>
  <Button type="primary" plain>Primary</Button>
  <Button type="success" plain>Success</Button>
  <Button type="info" plain>Info</Button>
  <Button type="warning" plain>Warning</Button>
  <Button type="danger" plain>Danger</Button><br/><br/>
  <Button size="large">Large</Button>
  <Button size="small">Small</Button><br/>

  <Collapse v-model="openedValue">
      <Item name="a" title="Title A">
        <h1>headline title</h1>
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
