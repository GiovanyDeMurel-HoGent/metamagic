
import { Card } from "metamagic-types";

interface CardsListProps {
  cards: Card[]
  setSelectedCard: (card:Card) => void
}

export default function CardsList({ cards, setSelectedCard }: CardsListProps) {
  return (
      <ul>
      {
      cards.map((card) => (
        <li key={card.id}  >
          <a onClick={() => {
          setSelectedCard(card);
        }}>
           {card.name} {card.amount}
          </a>
          
        </li>
      )) 
      }
      </ul>
  )
}
