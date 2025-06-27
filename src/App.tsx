import { KanbanBoard } from "@components/KanbanBoard"
import { KanbanHeader } from "@components/KanbanHeader"
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensors } from "@dnd-kit/core"
import React from "react"

import { AppContainer } from "@/App.styled"
import { CardModal } from "@/components/CardModal"
import { useKanban } from "@/hooks/useKanban"

const App: React.FC = () => {
  const {
    columns,
    addColumn,
    addCard,
    openEditModal,
    closeEditModal,
    saveCard,
    deleteCard,
    deleteColumn,
    editingCard,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useKanban()

  const sensors = useSensors(
    { sensor: MouseSensor, options: { activationConstraint: { distance: 2 } } },
    { sensor: TouchSensor, options: { activationConstraint: { delay: 250, tolerance: 5 } } }
  )

  return (
    <AppContainer>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <KanbanHeader onAddColumn={addColumn} />

        <KanbanBoard
          columns={columns}
          onAddCard={addCard}
          onEditCard={openEditModal}
          onDeleteCard={deleteCard}
          onDeleteColumn={deleteColumn}
        />
      </DndContext>

      {editingCard && (
        <CardModal
          card={editingCard.card}
          isOpen={!!editingCard}
          onClose={closeEditModal}
          onSave={saveCard}
        />
      )}
    </AppContainer>
  )
}

export default App
