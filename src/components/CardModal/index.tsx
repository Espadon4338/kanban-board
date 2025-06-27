import React, { useState } from "react"

import { Card as CardType, Priority } from "@/types"

import {
  ButtonGroup,
  CancelButton,
  CloseButton,
  Form,
  FormGroup,
  Input,
  Label,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SaveButton,
  Select,
  TextArea,
} from "./styled"

interface CardModalProps {
  card: CardType
  isOpen: boolean
  onClose: () => void
  onSave: (card: CardType) => void
}

export const CardModal: React.FC<CardModalProps> = ({ card, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description || "")
  const [priority, setPriority] = useState<Priority>(card.priority || "")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...card, title, description, priority })
    onClose()
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          Edit Card
          <CloseButton onClick={onClose} title="Close">
            ×
          </CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter task title"
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Enter task description"
            />
          </FormGroup>

          <FormGroup>
            <Label>Priority</Label>
            <Select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
              <option value="">No priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Select>
          </FormGroup>

          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SaveButton type="submit">Save</SaveButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  )
}
