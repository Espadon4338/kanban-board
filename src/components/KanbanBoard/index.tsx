import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import React from "react"

import { Column as ColumnComponent } from "@/components/Column"
import { Card as CardType, Column as ColumnType } from "@/types"

import { BoardContainer } from "./styled"

interface KanbanBoardProps {
  columns: ColumnType[]
  onAddCard: (columnId: string) => void
  onEditCard: (columnId: string, card: CardType) => void
  onDeleteCard: (columnId: string, cardId: string) => void
  onDeleteColumn: (columnId: string) => void
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onDeleteColumn,
}) => {
  return (
    <BoardContainer>
      {columns.map((column) => (
        <SortableContext
          key={column.id}
          items={column.cards.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <ColumnComponent
            column={column}
            onAddCard={onAddCard}
            onEditCard={onEditCard}
            onDeleteCard={onDeleteCard}
            onDeleteColumn={onDeleteColumn}
          />
        </SortableContext>
      ))}
    </BoardContainer>
  )
}
