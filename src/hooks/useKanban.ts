import { useKanbanDND } from "./useKanbanDND"
import { useKanbanState } from "./useKanbanState"

export const useKanban = () => {
  const { columns, setColumns, ...stateAndCRUD } = useKanbanState()

  const dndHandlers = useKanbanDND({ columns, setColumns })

  return {
    columns,
    ...stateAndCRUD,
    ...dndHandlers,
  }
}
