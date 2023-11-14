import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

// 默认属性
test('默认属性', () => {
  render(<Component />)
  const h = screen.getByText('一行标题')
  expect(h).toBeInTheDocument()
})

// 传入属性
test('传入属性', () => {
  render(<Component text="hello" level={3} isCenter={true} />)
  const h = screen.getByText('hello')
  expect(h).toBeInTheDocument()

  expect(h.matches('h3')).toBeTruthy()

  const style = h.style
  expect(style.textAlign).toBe('center')
})
