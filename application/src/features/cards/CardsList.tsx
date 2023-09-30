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
        <li key={card.id} >
          <span> {card.amount} </span>
          <button onClick={() => onDecrementAmount(card.id, card.amount)}>
            +
          </button>
          <button onClick={() => onIncrementAmount(card.id, card.amount)}>
            -
          </button>
          <a
            onClick={() => {
              setSelectedCard(card);
            }}
          >
            <span style={{width:"33ch", display:"inline-block", margin:"auto 20px"}}>{card.name}</span>
            <span style={{width:"20px", display:"inline-block"}}>{card.id == commanderId && <span>[C]</span>}</span>
            <span style={{width:"20ch", display:"inline-block", textAlign:"end"}}>({card.mana_cost})</span>
            <span>({card.cmc})</span>
          </a>

          <button onClick={() => onRemoveCard(card.id)}>remove</button>
        </li>
      ))}
    </ul>
  );
}
