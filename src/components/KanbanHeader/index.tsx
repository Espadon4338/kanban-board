import React, { useState } from "react"

import { AddColumnButton, AddColumnForm, ColumnInput, Header, Title } from "./styled"

interface KanbanHeaderProps {
  onAddColumn: (title: string) => void
}

export const KanbanHeader: React.FC<KanbanHeaderProps> = ({ onAddColumn }) => {
  const [newColumnTitle, setNewColumnTitle] = useState("")

  const handleAddColumn = () => {
    onAddColumn(newColumnTitle)
    setNewColumnTitle("")
  }

  return (
    <Header>
      <Title>Kanban Board</Title>
      <AddColumnForm>
        <ColumnInput
          type="text"
          placeholder="Column title"
          value={newColumnTitle}
          onChange={(e) => setNewColumnTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddColumn()}
        />
        <AddColumnButton onClick={handleAddColumn}>
          <span>+</span> Add Column
        </AddColumnButton>
      </AddColumnForm>
    </Header>
  )
}
