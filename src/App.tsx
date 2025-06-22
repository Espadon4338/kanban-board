import React, { useState, useEffect } from "react"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { Column } from "@/components/Column"
import { CardModal } from "@/components/CardModal"
import { Column as ColumnType, Card as CardType, initialColumns } from "@/types"
import { generateId, getColumnColor } from "@/utils"
import {
  AppContainer,
  Header,
  Title,
  AddColumnForm,
  ColumnInput,
  AddColumnButton,
  BoardContainer,
} from "@/App.styled"

const getInitialState = (): ColumnType[] => {
  try {
    const savedData = localStorage.getItem("kanban-board")
    console.log("Attempting to get initial state from localStorage...")
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      console.log("Parsed initial data:", parsedData)
      if (parsedData && parsedData.length > 0) {
        return parsedData
      }
    }
  } catch (e) {
    console.error("Error parsing saved data from localStorage:", e)
    localStorage.removeItem("kanban-board")
  }
  console.log("Using initialColumns as fallback.")
  return initialColumns
}

const App: React.FC = () => {
  console.log("App component rendered. Initializing columns with:", initialColumns)
  const [columns, setColumns] = useState<ColumnType[]>(getInitialState)
  const [editingCard, setEditingCard] = useState<{ columnId: string; card: CardType } | null>(null)
  const [newColumnTitle, setNewColumnTitle] = useState("")

  useEffect(() => {
    console.log("Columns state updated, saving to localStorage:", columns)
    localStorage.setItem("kanban-board", JSON.stringify(columns))
  }, [columns])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id.toString()
    const overId = over.id.toString()

    const updatedColumns = JSON.parse(JSON.stringify(columns))

    const sourceColumnIndex = updatedColumns.findIndex((col: ColumnType) =>
      col.cards.some((card) => card.id === activeId)
    )

    if (sourceColumnIndex === -1) return

    const targetColumnIndex = updatedColumns.findIndex((col: ColumnType) => col.id === overId)

    if (targetColumnIndex === -1 || sourceColumnIndex === targetColumnIndex) return

    const cardIndex = updatedColumns[sourceColumnIndex].cards.findIndex(
      (card: CardType) => card.id === activeId
    )

    if (cardIndex === -1) return

    const [movedCard] = updatedColumns[sourceColumnIndex].cards.splice(cardIndex, 1)
    updatedColumns[targetColumnIndex].cards.push(movedCard)

    setColumns(updatedColumns)
  }

  const addColumn = () => {
    if (!newColumnTitle.trim()) return

    const newColumn: ColumnType = {
      id: `column-${generateId()}`,
      title: newColumnTitle,
      color: getColumnColor(newColumnTitle),
      cards: [],
    }

    console.log("Adding column:", newColumnTitle)
    setColumns((prev) => [...prev, newColumn])
    setNewColumnTitle("")
  }

  const deleteColumn = (columnId: string) => {
    setColumns((prev) => prev.filter((column) => column.id !== columnId))
  }

  const addCard = (columnId: string) => {
    const newCard: CardType = {
      id: `card-${generateId()}`,
      title: "New Task",
      description: "Task description",
    }

    console.log("Adding card:", newCard.title)
    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId ? { ...column, cards: [...column.cards, newCard] } : column
      )
    )
  }

  const editCard = (columnId: string, card: CardType) => {
    console.log("Attempting to edit card:", card.id, "in column:", columnId)
    setEditingCard({ columnId, card })
  }

  const saveCard = (updatedCard: CardType) => {
    if (!editingCard) {
      console.log("No card being edited.")
      return
    }

    console.log("Saving card:", updatedCard.id, "in column:", editingCard.columnId)
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

    setEditingCard(null)
  }

  const deleteCard = (columnId: string, cardId: string) => {
    console.log("Attempting to delete card:", cardId, "from column:", columnId)
    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId
          ? { ...column, cards: column.cards.filter((card) => card.id !== cardId) }
          : column
      )
    )
  }

  return (
    <AppContainer>
      <DndContext onDragEnd={handleDragEnd}>
        <Header>
          <Title>Kanban Board</Title>
          <AddColumnForm>
            <ColumnInput
              type="text"
              placeholder="Column title"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addColumn()}
            />
            <AddColumnButton onClick={addColumn}>
              <span>+</span> Add Column
            </AddColumnButton>
          </AddColumnForm>
        </Header>

        <BoardContainer>
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              onAddCard={addCard}
              onEditCard={editCard}
              onDeleteCard={deleteCard}
              onDeleteColumn={deleteColumn}
            />
          ))}
        </BoardContainer>
      </DndContext>

      {editingCard && (
        <CardModal
          card={editingCard.card}
          isOpen={true}
          onClose={() => setEditingCard(null)}
          onSave={saveCard}
        />
      )}
    </AppContainer>
  )
}

export default App
