import Mock from 'mockjs'

Mock.mock('/api/test', 'get', () => {
  return {
    errcode: 0,
    data: `${Date.now()}`,
  }
})
