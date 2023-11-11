import React, { FC, useState } from 'react'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { Typography, Spin, Table, Pagination } from 'antd'
import { getStatList } from '../../../services/stat'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { LIST_STAT_SIZE_COUNT } from '../../../constants'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (id: string) => void
}

const PageStat: FC<PropsType> = ({
  selectedComponentId,
  setSelectedComponentId,
  setSelectedComponentType,
}) => {
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_STAT_SIZE_COUNT)
  const { id = '' } = useParams()
  const { componentList = [] } = useGetComponentInfo()

  const { loading } = useRequest(
    async () => {
      const data = await getStatList(id, { page, pageSize })
      return data
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { list = [], total } = res
        setTotal(total)
        setList(list)
      },
    }
  )

  const columns = componentList.map(c => {
    const { title, fe_id, props = {}, type } = c

    const colTitle = props.title || title
    return {
      // title: colTitle,
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
        >
          <span style={{ color: fe_id === selectedComponentId ? '#1677ff' : 'inherit' }}>
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    }
  })

  const TableElem = (
    <>
      <Table
        dataSource={list}
        columns={columns}
        pagination={false}
        rowKey={(c: any) => c._id}
      ></Table>
      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <Pagination
          total={total}
          current={page}
          pageSize={pageSize}
          onChange={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }}
        />
      </div>
    </>
  )

  return (
    <div>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin></Spin>
        </div>
      ) : (
        TableElem
      )}
    </div>
  )
}

export default PageStat
