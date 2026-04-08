import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'
vi.mock('@popperjs/core')
const onVisibleChange = vi.fn()
describe('Tooltip.vue', () => {
  beforeEach(() => {
    // 每个测试用例执行前初始化「假定时器」，方便模拟异步/延迟逻辑
    vi.useFakeTimers()
  })
  test('basic tooltip', async () => {
    const wrapper = mount(() =>
      <div>
        <div id="outside"></div>
        <Tooltip content="hello tooltip" trigger='click' onVisible-change={onVisibleChange}>
          <button id="trigger">Trigger</button>
        </Tooltip>
      </div>
    , {
      attachTo: document.body
      })
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()
    expect(wrapper.find('.nano-tooltip__popper').exists()).toBeFalsy()
    console.log('before', wrapper.html())
    triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.nano-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.get('.nano-tooltip__popper').text()).toBe('hello tooltip')
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    console.log('after', wrapper.html())

    wrapper.get('#outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.nano-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })
})