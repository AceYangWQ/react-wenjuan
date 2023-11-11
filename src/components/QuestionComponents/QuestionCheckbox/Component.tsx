import React, { FC } from 'react'
import { Typography, Checkbox, Space, Row, Col } from 'antd'
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
        <Row>
          {optionList.map((option: OptionType) => {
            const { value, label, checked } = option
            return (
              <Col key={value} span={8}>
                <Checkbox checked={checked}>{label}</Checkbox>
              </Col>
            )
          })}
        </Row>
      </Space>
    </div>
  )
}

export default Component
