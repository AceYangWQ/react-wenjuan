import React, { FC } from 'react'
import { Typography, Checkbox, Space } from 'antd'
import { QuestionCheckboxPropsType, QuestionCheckboxDefaultProps, OptionType } from './interface'

const { Paragraph } = Typography
const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const {
    title = '',
    optionList = [],
    isVertical = false,
  } = { ...QuestionCheckboxDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {optionList.map((option: OptionType) => {
          const { value, label, checked } = option
          return (
            <Checkbox key={value} checked={checked} value={value}>
              {label}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default Component
