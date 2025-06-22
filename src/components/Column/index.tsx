import React from "react"
import { useDroppable } from "@dnd-kit/core"
import { Card } from "@/components/Card"
import {
  ColumnContainer,
  ColumnHeader,
  ColumnTitle,
  ColumnColorIndicator,
  CardCount,
  ColumnActions,
  CardsList,
  AddCardButton,
} from "./styled"
import { ActionButton } from "@/components/Card/styled"
import { Column as ColumnType, Card as CardType } from "@/types"

interface ColumnProps {
  column: ColumnType
  onAddCard: (columnId: string) => void
  onEditCard: (columnId: string, card: CardType) => void
  onDeleteCard: (columnId: string, cardId: string) => void
  onDeleteColumn: (columnId: string) => void
}

export const Column: React.FC<ColumnProps> = ({
  column,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onDeleteColumn,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: "column" },
  })

  return (
    <ColumnContainer
      color={column.color}
      ref={setNodeRef}
      style={{
        backgroundColor: isOver ? "rgba(245, 247, 250, 0.5)" : "var(--white)",
      }}
    >
      <ColumnHeader>
        <ColumnTitle>
          <ColumnColorIndicator color={column.color} />
          {column.title}
        </ColumnTitle>
        <CardCount>{column.cards.length}</CardCount>
        <ColumnActions>
          <ActionButton onClick={() => onAddCard(column.id)} title="Add card">
            +
          </ActionButton>
          <ActionButton onClick={() => onDeleteColumn(column.id)} title="Delete column">
            ×
          </ActionButton>
        </ColumnActions>
      </ColumnHeader>

      <CardsList>
        {column.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            color={column.color}
            onEdit={(updatedCard) => onEditCard(column.id, updatedCard)}
            onDelete={(cardId) => onDeleteCard(column.id, cardId)}
          />
        ))}
      </CardsList>

      <AddCardButton onClick={() => onAddCard(column.id)}>
        <span>+</span> Add card
      </AddCardButton>
    </ColumnContainer>
  )
}
