import { useState } from "react"
import { useLocalStorage } from "./useLocalStorage"
import { Column, Card, initialColumns } from "@/types"
import { generateId, getColumnColor } from "@/utils"

export const useKanbanState = () => {
  const [columns, setColumns] = useLocalStorage<Column[]>("kanban-board", initialColumns)
  const [editingCard, setEditingCard] = useState<{ columnId: string; card: Card } | null>(null)

  const addColumn = (title: string) => {
    if (!title.trim()) return
    const newColumn: Column = {
      id: `column-${generateId()}`,
      title,
      color: getColumnColor(title),
      cards: [],
    }
    setColumns((prev) => [...prev, newColumn])
  }

  const deleteColumn = (columnId: string) => {
    setColumns((prev) => prev.filter((column) => column.id !== columnId))
  }

  const addCard = (columnId: string) => {
    const newCard: Card = {
      id: `card-${generateId()}`,
      title: "New Task",
      description: "Task description",
      priority: "",
    }
    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId ? { ...column, cards: [...column.cards, newCard] } : column
      )
    )
  }

  const deleteCard = (columnId: string, cardId: string) => {
    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId
          ? { ...column, cards: column.cards.filter((card) => card.id !== cardId) }
          : column
      )
    )
  }

  const openEditModal = (columnId: string, card: Card) => {
    setEditingCard({ columnId, card })
  }

  const closeEditModal = () => {
    setEditingCard(null)
  }

  const saveCard = (updatedCard: Card) => {
    if (!editingCard) return

    setColumns((prev) =>
      prev.map((column) =>
        column.id === editingCard.columnId
          ? {
              ...column,
              cards: column.cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)),
            }
          : column
      )
    )
    closeEditModal()
  }

  return {
    columns,
    setColumns,
    editingCard,
    addColumn,
    deleteColumn,
    addCard,
    deleteCard,
    openEditModal,
    closeEditModal,
    saveCard,
  }
}
