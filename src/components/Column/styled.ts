import styled from "styled-components"

export const ColumnContainer = styled.div<{ color: string }>`
  background-color: var(--white);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  border-top: 4px solid ${(props) => props.color};

  @media (max-width: 768px) {
    max-width: 280px;
  }

  @media (max-width: 640px) {
    max-width: 100%;
  }
`

export const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border);
`

export const ColumnTitle = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const ColumnColorIndicator = styled.span<{ color: string }>`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`

export const CardCount = styled.span`
  background-color: var(--background);
  color: var(--secondary);
  border-radius: 20px;
  padding: 0.15rem 0.6rem;
  font-size: 0.8rem;
  font-weight: 500;
`

export const ColumnActions = styled.div`
  display: flex;
  gap: 0.25rem;
`

export const CardsList = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-grow: 1;
  min-height: 100px;
`

export const AddCardButton = styled.button`
  background: none;
  border: none;
  color: var(--secondary);
  padding: 0.75rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s;
  border-radius: 0 0 12px 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: var(--background);
    color: var(--primary);
  }

  @media (max-width: 390px) {
    padding: 0.6rem;
    font-size: 0.85rem;
  }
`
