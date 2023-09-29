
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
          console.log('Clicked card:', card.image_uris.json.normal);
          setSelectedCard(card);
        }}>
          {card.amount}{card.name}
          </a>
          
        </li>
      )) 
      }
      </ul>
  )
}
