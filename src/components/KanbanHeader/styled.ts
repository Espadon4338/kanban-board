import styled from "styled-components"

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

export const Title = styled.h1`
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary);

  @media (max-width: 390px) {
    font-size: 1.5rem;
  }
`

export const AddColumnForm = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    width: 100%;
  }
`

export const ColumnInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.95rem;
  min-width: 250px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }

  @media (max-width: 640px) {
    flex-grow: 1;
    min-width: auto;
  }

  @media (max-width: 390px) {
    padding: 0.65rem 0.9rem;
    font-size: 0.9rem;
  }
`

export const AddColumnButton = styled.button`
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #4f46e5;
  }

  @media (max-width: 390px) {
    padding: 0.65rem 1.25rem;
    font-size: 0.9rem;
    width: 100%;
    justify-content: center;
  }
`
