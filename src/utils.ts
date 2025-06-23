export const generateId = () => {
  const id = Math.random().toString(36).substr(2, 9)
  console.log(id)
  return id
}

export const getColumnColor = (title: string) => {
  const RANDOM_COLORS = [
    "#A78BFA",
    "#FBBF24",
    "#60A5FA",
    "#34D399",
    "#F472B6",
    "#E879F9",
    "#EC4899",
    "#A3A3A3",
    "#FCA5A5",
    "#93C5FD",
  ]

  const colorMap: Record<string, string> = {
    "To Do": "var(--todo)",
    "In Progress": "var(--inprogress)",
    Done: "var(--done)",
  }

  if (colorMap[title]) {
    return colorMap[title]
  }

  const randomIndex = Math.floor(Math.random() * RANDOM_COLORS.length)
  return RANDOM_COLORS[randomIndex]
}
