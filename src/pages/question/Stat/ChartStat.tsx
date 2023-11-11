import React, { FC, useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getStatComponet } from '../../../services/stat'
import { getComponentConfByType } from '../../../components/QuestionComponents'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const ChartStat: FC<PropsType> = ({ selectedComponentId, selectedComponentType }) => {
  const { id = '' } = useParams()
  const [stat, setStat] = useState([])

  const { run } = useRequest(
    async (questionId, componentId) => await getStatComponet(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        const { stat } = res
        setStat(stat)
      },
    }
  )

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId)
  }, [id, selectedComponentId, run])

  function genStatChart() {
    if (!selectedComponentId) return <div>未选中组件</div>

    const component = getComponentConfByType(selectedComponentType)
    if (component == null) return <div>当前组件无图表统计</div>

    const { StatComponent } = component
    if (!StatComponent) return <div>当前组件无图表统计</div>

    return <StatComponent stat={stat} />
  }

  return (
    <div>
      <Title level={3}>图表统计</Title>
      <div>{genStatChart()}</div>
    </div>
  )
}

export default ChartStat
