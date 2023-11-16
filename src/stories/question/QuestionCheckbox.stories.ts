import type { Meta, StoryObj } from '@storybook/react'

import Component from '../../components/QuestionComponents/QuestionCheckbox/Component'

const meta = {
  title: 'Question/QuestionCheckbox',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

// 默认属性
export const Defalut: Story = {
  args: {},
}

// 设置属性
export const SetProps: Story = {
  args: {
    title: '技术栈',
    optionList: [
      { value: 'vue2', label: 'vue2', checked: true },
      { value: 'vue3', label: 'vue3', checked: true },
      { value: 'react', label: 'react', checked: false },
      { value: 'node', label: 'node', checked: false },
    ],
    isVertical: true,
  },
}
