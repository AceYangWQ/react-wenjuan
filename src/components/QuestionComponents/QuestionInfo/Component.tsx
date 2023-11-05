import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface'

const { Paragraph, Title } = Typography
const Component: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title = '', desc = '' } = { ...QuestionInfoDefaultProps, ...props }
  const descList = desc.split('\n')

  return (
    <div style={{ textAlign: 'center' }}>
      <Title level={3}>{title}</Title>
      <Paragraph style={{ marginBottom: 0 }}>
        {descList.map((d, index) => {
          return (
            <span key={index}>
              {index > 0 && <br />}
              {d}
            </span>
          )
        })}
      </Paragraph>
    </div>
  )
}

export default Component
