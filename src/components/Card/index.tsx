import React from "react"
import { useDraggable } from "@dnd-kit/core"
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
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id,
    data: { type: "card", card },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <CardContainer ref={setNodeRef} style={style} color={color} $isDragging={isDragging}>
      <CardHeader {...listeners} {...attributes}>
        <CardTitle>{card.title}</CardTitle>
        {card.priority && <PriorityBadge priority={card.priority}>{card.priority}</PriorityBadge>}
      </CardHeader>

      {card.description && <CardDescription>{card.description}</CardDescription>}

      <CardActions>
        <ActionButton
          onClick={() => {
            console.log("Edit button clicked for card:", card.id)
            onEdit(card)
          }}
          title="Edit"
        >
          ✏️
        </ActionButton>
        <ActionButton
          onClick={() => {
            console.log("Delete button clicked for card:", card.id)
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
