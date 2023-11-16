import type { Meta, StoryObj } from '@storybook/react'

import Component from '../../components/QuestionComponents/QuestionParagraph/Component'

const meta = {
  title: 'Question/QuestionParagraph',
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
    text: '段落',
    isCenter: true,
  },
}

// 换行
// 设置属性
export const SetBreakLineProps: Story = {
  args: {
    text: '段落1\n段落2\n段落3',
  },
}
