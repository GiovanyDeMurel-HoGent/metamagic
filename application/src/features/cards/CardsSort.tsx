import { useCardsSort } from "../../hooks/useCardsSort"

export default function CardsSort() {
    const {sortCards} = useCardsSort()
  return (
    <button className="pr-2 pl-2 w-16 h-8   bg-orange-300" onClick={sortCards}>sort</button>
  )
}
