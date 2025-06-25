import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  CardContainer,
  CardHeader,
  CardTitle,
  PriorityBadge,
  CardDescription,
  CardActions,
  ActionButton,
} from "./styled"
import { Card as CardType } from "@/types"

interface CardProps {
  card: CardType
  onEdit: (card: CardType) => void
  onDelete: (cardId: string) => void
  color: string
}

export const Card: React.FC<CardProps> = ({ card, onEdit, onDelete, color }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: { type: "card", card },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <CardContainer
      ref={setNodeRef}
      style={style}
      color={color}
      $isDragging={isDragging}
      {...attributes}
      {...listeners}
    >
      <CardHeader>
        <CardTitle>{card.title}</CardTitle>
        {card.priority && <PriorityBadge priority={card.priority}>{card.priority}</PriorityBadge>}
      </CardHeader>

      {card.description && <CardDescription>{card.description}</CardDescription>}

      <CardActions>
        <ActionButton
          onClick={(e) => {
            e.stopPropagation()
            onEdit(card)
          }}
          title="Edit"
        >
          ✏️
        </ActionButton>
        <ActionButton
          onClick={(e) => {
            e.stopPropagation()
            onDelete(card.id)
          }}
          title="Delete"
        >
          🗑️
        </ActionButton>
      </CardActions>
    </CardContainer>
  )
}
