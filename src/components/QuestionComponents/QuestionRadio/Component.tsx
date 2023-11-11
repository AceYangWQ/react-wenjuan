import React, { FC } from 'react'
import { Typography, Radio, Space, Row, Col } from 'antd'
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
          <Row>
            {options.map((option: OptionType) => {
              const { value, label } = option
              return (
                <Col key={value} span={10}>
                  <Radio value={value}>{label}</Radio>
                </Col>
              )
            })}
          </Row>
        </Space>
      </Radio.Group>
    </div>
  )
}

export default Component
