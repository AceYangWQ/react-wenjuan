import type { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'

export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

export type componentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

const componentConfList: componentConfType[] = [QuestionInputConf, QuestionTitleConf]

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}
