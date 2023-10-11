import { useCardsSort } from "../../hooks/useCardsSort"

export default function CardsSort() {
    const {sortCards} = useCardsSort()
  return (
    <button onClick={sortCards}>sort</button>
  )
}
