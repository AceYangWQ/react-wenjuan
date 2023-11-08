import React, { FC } from 'react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type PropsType = {
  items: Array<{ fe_id: string; [key: string]: any }>
  children: JSX.Element | JSX.Element[]
  onDragEnd: (oldIndex: number, newIndex: number) => void
}
const SortableContainer: FC<PropsType> = ({ items, children, onDragEnd }) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    const oldIndex = items.findIndex(c => c.fe_id === active.id)
    const newIndex = items.findIndex(c => c.fe_id === over.id)
    onDragEnd(oldIndex, newIndex)
  }

  const itemsWithId = items.map(c => {
    return { ...c, id: c.fe_id }
  })
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={itemsWithId} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

export default SortableContainer
