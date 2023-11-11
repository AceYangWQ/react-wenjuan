import axios, { ResDataType } from './ajax'

// 获取统计列表
export async function getStatList(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}`
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}

// 获取单个组件汇总数据
export async function getStatComponet(questionId: string, componentId: string) {
  const url = `/api/stat/${questionId}/${componentId}`
  const data = (await axios.get(url)) as ResDataType
  return data
}
