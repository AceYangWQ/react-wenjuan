import type { Meta, StoryObj } from '@storybook/react'

import Component from '../../components/QuestionComponents/QuestionRadio/Component'

const meta = {
  title: 'Question/QuestionRadio',
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
    title: '工作年限',
    options: [
      { value: 'v1', label: '应届生' },
      { value: 'v2', label: '1-3年' },
      { value: 'v3', label: '3-5年' },
      { value: 'v4', label: '大于5年' },
    ],
    value: 'v2',
    isVertical: true,
  },
}
