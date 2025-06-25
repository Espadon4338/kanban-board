import React from "react"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Column as ColumnComponent } from "@/components/Column"
import { BoardContainer } from "./styled"
import { Column as ColumnType, Card as CardType } from "@/types"

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
