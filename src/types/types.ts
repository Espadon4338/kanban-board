export type Priority = "Low" | "Medium" | "High" | ""

export interface Card {
  id: string
  title: string
  description?: string
  priority?: Priority
}

export interface Column {
  id: string
  title: string
  cards: Card[]
  color: string
}

export const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "#FF6B6B",
    cards: [
      {
        id: "task1",
        title: "Hello World",
        description: "Провести анализ конкурентов",
        priority: "High",
      },
      { id: "task2", title: "Планирование проекта", priority: "Medium" },
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    color: "#4ECDC4",
    cards: [
      {
        id: "task3",
        title: "Разработка прототипа",
        description: "Создать UI прототип",
        priority: "High",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "#45B7D1",
    cards: [
      {
        id: "task4",
        title: "Создание документации",
        description: "Написать техническую документацию",
        priority: "Low",
      },
    ],
  },
]
