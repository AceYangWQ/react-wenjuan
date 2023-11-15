import React, { FC } from 'react'
import { Typography, Radio, Space } from 'antd'
import { QuestionRadioPropsType, QuestionRadioDefaultProps, OptionType } from './interface'

const { Paragraph } = Typography
const Component: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const {
    title = '',
    options = [],
    value = '',
    isVertical = false,
  } = { ...QuestionRadioDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map((option: OptionType) => {
            const { value, label } = option
            return (
              <Radio key={value} value={value}>
                {label}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default Component
