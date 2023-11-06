import React, { FC, useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import useComponentInfo from '../../../hooks/useComponentInfo'

// 枚举
enum TAB_KEY {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEY.PROP_KEY)
  const { selectedId } = useComponentInfo()

  useEffect(() => {
    if (selectedId) {
      setActiveKey(TAB_KEY.PROP_KEY)
    } else {
      setActiveKey(TAB_KEY.SETTING_KEY)
    }
  }, [selectedId])

  const tabItems = [
    {
      key: TAB_KEY.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEY.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          设置
        </span>
      ),
      children: <PageSetting />,
    },
  ]
  return <Tabs activeKey={activeKey} items={tabItems}></Tabs>
}

export default RightPanel
