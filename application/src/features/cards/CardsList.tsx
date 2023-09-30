
import { Card } from "metamagic-types";

interface CardsListProps {
  cards: Card[]
  setSelectedCard: (card:Card) => void,
  onRemoveCard: (cardToRemoveId:string) => void,
}
export default function CardsList({ cards, setSelectedCard, onRemoveCard}: CardsListProps) {

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

          <button onClick={() => onRemoveCard(card.id)}>remove</button>
        </li>
      )) 
      }
      </ul>
  )
}
