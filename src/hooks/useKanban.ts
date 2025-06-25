import { useKanbanState } from "./useKanbanState"
import { useKanbanDND } from "./useKanbanDND"

export const useKanban = () => {
  const { columns, setColumns, ...stateAndCRUD } = useKanbanState()

  const dndHandlers = useKanbanDND({ columns, setColumns })

  return {
    columns,
    ...stateAndCRUD,
    ...dndHandlers,
  }
}
