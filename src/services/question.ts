import axios, { ResDataType } from './ajax'

type ListParams = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
}

// 获取单个问卷
export async function getQuestionById(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.get(url)) as ResDataType
  return data
}

// 创建问卷
export async function createQuestion(): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.post(url)) as ResDataType
  return data
}

// 获取（查询）所有问卷
export async function getQuestionList(options: Partial<ListParams>): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.get(url, { params: options })) as ResDataType
  return data
}
