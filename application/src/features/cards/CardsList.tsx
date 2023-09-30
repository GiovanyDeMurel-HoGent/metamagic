import { Card } from "metamagic-types";

interface CardsListProps {
  cards: Card[];
  commanderId: string;
  setSelectedCard: (card: Card) => void;
  onRemoveCard: (cardToRemoveId: string) => void;
  onDecrementAmount: (cardToDecrementId: string, amount?: number) => void;
  onIncrementAmount: (cardToIncrementId: string, amount?: number) => void;
}
export default function CardsList({
  cards,
  commanderId,
  setSelectedCard,
  onRemoveCard,
  onDecrementAmount,
  onIncrementAmount,
}: CardsListProps) {
  return (
    <ul>
      {cards.map((card) => (
        <li key={card.id}>
          <a
            onClick={() => {
              setSelectedCard(card);
            }}
          >
            {card.name} {card.amount}{" "}
            {card.id == commanderId && <span>commander</span>}
          </a>
          <button onClick={() => onDecrementAmount(card.id, card.amount)}>
            +
          </button>
          <button onClick={() => onIncrementAmount(card.id, card.amount)}>
            -
          </button>

          <button onClick={() => onRemoveCard(card.id)}>remove</button>
        </li>
      ))}
    </ul>
  );
}
