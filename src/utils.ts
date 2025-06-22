export const generateId = () => {
  const id = Math.random().toString(36).substr(2, 9)
  console.log(id)
  return id
}
export const getColumnColor = (title: string) => {
  const colorMap: Record<string, string> = {
    "To Do": "var(--todo)",
    "In Progress": "var(--inprogress)",
    Done: "var(--done)",
    Backlog: "#A78BFA",
    Review: "#FBBF24",
    Testing: "#60A5FA",
  }

  return colorMap[title] || "#8B5CF6"
}
