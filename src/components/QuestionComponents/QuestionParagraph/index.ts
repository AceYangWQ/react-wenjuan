import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionParagraphDefaultProps } from './interface'

export * from './interface'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: '段落',
  type: 'questionParagraph',
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
}
