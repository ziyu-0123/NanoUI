<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import type { ButtonInstance } from './components/Button/types'
import type { TooltipInstance } from './components/Tooltip/types'
import type { MenuOption } from './components/Dropdown/types'
import Dropdown from './components/Dropdown/Dropdown'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const size = ref<any>('3x')
const trigger = ref<any>('click')
  const options: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]
const openedValue = ref(['a'])
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
const inlineConsole = (...args: any) => {
  console.log(...args)
}
onMounted(()=>{
if(buttonRef.value){
  console.log('buttonRef', buttonRef.value.ref)
}
setTimeout(() => {
  openedValue.value = ['a', 'b']
  size.value = '2xl'
  // trigger.value = 'hover'
}, 2000)
})
const testClick=()=>{
  alert(123)
}
</script>
 
<template>
  <header>
    <Dropdown placement="bottom"
      :trigger="trigger"
      :menu-options="options"
      @visible-change="e => inlineConsole('visible change', e)"
      @select="e => inlineConsole('select', e)"
      manual
      ref="tooltipRef"
      >
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125"/>
    </Dropdown>
  </header><br/>

  <Button type="primary" plain ref="buttonRef" disabled>Test Button</Button><br/>

  <a href="#">hello</a><br/>

  <Icon icon="arrow-up" :size="size" type="danger" color="#0e7a0d"></Icon><br/>

  <Button type="primary" @click="testClick">Primary</Button>
  <Button type="success" @click="open">Success</Button>
  <Button type="info" @click="close">Info</Button>
  <Button type="warning">Warning</Button>
  <Button type="danger">Danger</Button><br/><br/>

  <Button type="primary" plain>Primary</Button>
  <Button type="success" plain>Success</Button>
  <Button type="info" plain>Info</Button>
  <Button type="warning" plain>Warning</Button>
  <Button type="danger" plain>Danger</Button><br/><br/>

  <Button size="large">Large</Button>
  <Button size="small">Small</Button><br/><br/>

  <Button size="large" loading>Loading</Button>
  <Button size="large" icon="arrow-up">Icon</Button><br/><br/>    

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
