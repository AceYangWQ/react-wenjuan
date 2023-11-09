import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routerConfig from './router'
import 'antd/dist/reset.css'
import './App.css'

// import axios from 'axios'

// import './_mock/index'

function App() {
  // useEffect(() => {
  // // mockjs 只能拦截XMLHttpRequest 不能拦截 fetch 请求
  // fetch('/api/test')
  //   .then(res => res.json())
  //   .then(data => console.log('fetch data', data))

  // axios.get('/api/test').then(res => console.log('aixos data', res.data))
  // }, [])

  // useEffect(() => {
  // fetch('/api/test')
  //   .then(res => res.json())
  //   .then(data => console.log('fetch data', data))
  // axios.get('/api/test').then(res => console.log('aixos data', res.data))
  // }, [])
  return <RouterProvider router={routerConfig}></RouterProvider>
}

export default App
