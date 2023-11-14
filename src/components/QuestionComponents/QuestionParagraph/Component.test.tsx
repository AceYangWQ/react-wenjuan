import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

// 默认属性
test('默认属性', () => {
  render(<Component />)
  const span = screen.getByText('一行段落')
  expect(span).toBeInTheDocument()
})

// 传入属性
test('传入属性', () => {
  render(<Component text="hello" isCenter={true} />)
  const span = screen.getByText('hello')
  expect(span).toBeInTheDocument()

  // eslint-disable-next-line testing-library/no-node-access
  const p = span.parentElement // 获取父元素
  expect(p).not.toBeNull()

  const style = p!.style || {}
  expect(style.textAlign).toBe('center')
})

// 多行文字
test('多行文字', () => {
  render(<Component text={'a\nb\nc'} />)
  const span = screen.getByText('a')
  expect(span).toBeInTheDocument()

  expect(span).toHaveTextContent('a')
  expect(span).not.toHaveTextContent('ab') // 被换行了
})
