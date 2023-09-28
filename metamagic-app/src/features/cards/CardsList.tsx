
import { Card } from "metamagic-types";

interface CardsListProps {
  cards: Card[];
}

export default function CardsList({ cards }: CardsListProps) {
  return (
      <ul>
      {
      cards.map((card) => (
        <li key={card.id} >{card.amount}{card.name}</li>
      )) 
      }
      </ul>
  )
}
