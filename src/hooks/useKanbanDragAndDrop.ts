import { useState } from "react"
import { DragStartEvent, DragOverEvent, UniqueIdentifier } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { Column, Card } from "@/types"

interface UseKanbanDragAndDropProps {
  initialColumns: Column[]
  onColumnsChange: (newColumns: Column[]) => void
}

export const useKanbanDragAndDrop = ({
  initialColumns,
  onColumnsChange,
}: UseKanbanDragAndDropProps) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [columns, setInternalColumns] = useState<Column[]>(initialColumns)

  type SetColumnsAction = Column[] | ((prev: Column[]) => Column[])

  const updateColumnsState = (action: SetColumnsAction) => {
    setInternalColumns((prev) => {
      const newColumns = typeof action === "function" ? action(prev) : action
      onColumnsChange(newColumns)
      return newColumns
    })
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!active || !over) return

    const activeIdString = String(active.id)
    const overIdString = String(over.id)

    const activeType = active.data.current?.type
    const overType = over.data.current?.type
    const activeCard = active.data.current?.card as Card

    if (activeType !== "card") return

    if (activeType === "card" && overType === "column") {
      updateColumnsState((prevColumns) => {
        // Теперь это колбэк, который принимает prevColumns
        const activeColumn = prevColumns.find((col) =>
          col.cards.some((card) => card.id === activeIdString)
        )
        if (!activeColumn) return prevColumns

        if (activeColumn.id === overIdString) {
          return prevColumns
        }

        const newColumns = prevColumns.map((column) => {
          if (column.id === activeColumn.id) {
            return { ...column, cards: column.cards.filter((card) => card.id !== activeIdString) }
          } else if (column.id === overIdString) {
            return { ...column, cards: [...column.cards, activeCard] }
          }
          return column
        })
        return newColumns
      })
      return
    }

    if (activeType === "card" && overType === "card") {
      updateColumnsState((prevColumns) => {
        const updatedColumns: Column[] = [...prevColumns]

        const activeColumnIndex = updatedColumns.findIndex((col) =>
          col.cards.some((card) => card.id === activeIdString)
        )
        const activeColumn = updatedColumns[activeColumnIndex]

        const overColumnIndex = updatedColumns.findIndex((col) =>
          col.cards.some((card) => card.id === overIdString)
        )
        const overColumn = updatedColumns[overColumnIndex]

        if (!activeColumn || !overColumn || activeColumn.id !== overColumn.id) {
          return prevColumns
        }

        const activeCardIndex = activeColumn.cards.findIndex((card) => card.id === activeIdString)
        const overCardIndex = activeColumn.cards.findIndex((card) => card.id === overIdString)

        const newCards = arrayMove(activeColumn.cards, activeCardIndex, overCardIndex)

        updatedColumns[activeColumnIndex] = {
          ...activeColumn,
          cards: newCards,
        }
        return updatedColumns
      })
    }
  }

  const handleDragEnd = () => {
    setActiveId(null)
  }

  return {
    activeId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    columns,
    setColumns: updateColumnsState,
  }
}
