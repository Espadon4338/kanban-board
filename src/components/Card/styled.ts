import styled from "styled-components"

export const CardContainer = styled.div<{ $isDragging?: boolean }>`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  padding: 1rem;
  border-left: 3px solid ${(props) => props.color || "var(--border)"};
  cursor: grab;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.$isDragging ? 0.5 : 1)};

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
    border-left-color: ${(props) => props.color || "var(--border)"};
  }
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--primary);
  flex-grow: 1;
`

export const PriorityBadge = styled.span<{ priority: "Low" | "Medium" | "High" | "" }>`
  font-size: 0.7rem;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 0.5rem;

  background-color: ${(props) =>
    props.priority === "High"
      ? "var(--high)"
      : props.priority === "Medium"
        ? "var(--medium)"
        : "var(--low)"};

  color: var(--white);
`

export const CardDescription = styled.p`
  margin: 0 0 0.75rem 0;
  color: var(--secondary);
  font-size: 0.85rem;
  line-height: 1.5;
`

export const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`

export const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: var(--secondary);
  transition: color 0.2s;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--background);
    color: var(--primary);
  }

  @media (max-width: 390px) {
    width: 24px;
    height: 24px;
  }
`
