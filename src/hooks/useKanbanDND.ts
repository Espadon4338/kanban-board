import { useState } from "react"
import { DragStartEvent, DragOverEvent, UniqueIdentifier } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { Column } from "@/types"

interface UseKanbanDNDProps {
  columns: Column[]
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>
}

export const useKanbanDND = ({ setColumns }: UseKanbanDNDProps) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const activeIdStr = String(active.id)
    const overIdStr = String(over.id)

    const isActiveACard = active.data.current?.type === "card"
    const isOverACard = over.data.current?.type === "card"
    const isOverAColumn = over.data.current?.type === "column"

    if (!isActiveACard) return

    if (isActiveACard && isOverACard) {
      setColumns((prevColumns) => {
        const activeColumn = prevColumns.find((col) =>
          col.cards.some((card) => card.id === activeIdStr)
        )
        const overColumn = prevColumns.find((col) =>
          col.cards.some((card) => card.id === overIdStr)
        )

        if (!activeColumn || !overColumn || activeColumn.id !== overColumn.id) {
          return prevColumns
        }

        const activeCardIndex = activeColumn.cards.findIndex((card) => card.id === activeIdStr)
        const overCardIndex = overColumn.cards.findIndex((card) => card.id === overIdStr)

        const newCards = arrayMove(activeColumn.cards, activeCardIndex, overCardIndex)

        return prevColumns.map((col) =>
          col.id === activeColumn.id ? { ...col, cards: newCards } : col
        )
      })
    }

    if (isActiveACard && isOverAColumn) {
      setColumns((prevColumns) => {
        const activeColumn = prevColumns.find((col) =>
          col.cards.some((card) => card.id === activeIdStr)
        )
        const overColumn = prevColumns.find((col) => col.id === overIdStr)

        if (!activeColumn || !overColumn || activeColumn.id === overColumn.id) {
          return prevColumns
        }

        const activeColumnCards = activeColumn.cards.filter((card) => card.id !== activeIdStr)
        const overColumnCards = [...overColumn.cards, active.data.current?.card]

        return prevColumns.map((col) => {
          if (col.id === activeColumn.id) {
            return { ...col, cards: activeColumnCards }
          } else if (col.id === overColumn.id) {
            return { ...col, cards: overColumnCards }
          } else {
            return col
          }
        })
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
  }
}
