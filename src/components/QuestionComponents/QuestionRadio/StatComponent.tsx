import React, { FC, useMemo } from 'react'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { QuestionRadioStatPropsType } from './interface'
import { STAT_COLORS } from '../../../constants'

const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat }) => {
  const sum = useMemo(() => {
    return stat.reduce((prev, next) => {
      return prev + next.count
    }, 0)
  }, [stat])

  function format(count: number) {
    return (count * 100).toFixed(2)
  }

  return (
    <div style={{ width: '350px', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            data={stat}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, count }) => `${name} ${format(count / sum)}%`}
          >
            {stat.map((i, index) => {
              return <Cell key={`cell-${index}`} fill={STAT_COLORS[index]}></Cell>
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent
