import { Card } from "metamagic-types";
import { useContext } from "react";
import { DeckContext } from "../decks/context/DeckContext";

interface CardsListProps {
  // cards: Card[] | null;
  commanderId: string;
  setSelectedCard: (card: Card) => void;
  onRemoveCard: (cardToRemoveId: string) => void;
  onDecrementAmount: (cardToDecrementId: string, amount?: number) => void;
  onIncrementAmount: (cardToIncrementId: string, amount?: number) => void;
}

export default function CardsList({
  // cards,
  commanderId,
  // setSelectedCard,
  onRemoveCard,
  onDecrementAmount,
  onIncrementAmount,
}: CardsListProps) {
  const {cards,setSelectedCard} = useContext(DeckContext)!
  return (
    <ul style={{ listStyle: "none", padding: "0" }}>
      {cards?.map((card) => (
        <li key={card.id}>
          <span> {card.amount} </span>
          <button onClick={() => onDecrementAmount(card.id)}>+</button>
          <button onClick={() => onIncrementAmount(card.id)}>-</button>
          <a
            onClick={() => {
              setSelectedCard(card);
            }}
          >
            <span>{card.name}</span>
          </a>
          <span>{card.id == commanderId && <span>[C]</span>}</span>
          <span>{card.mana_cost}</span>
          {/* <span>({card.cmc})</span> */}
          {/* <span style={{width:"33ch", display:"inline-block", margin:"auto 20px"}}>{card.name}</span>
            </a>
            <span style={{width:"20px", display:"inline-block"}}>{card.id == commanderId && <span>[C]</span>}</span>
            <span style={{width:"20ch", display:"inline-block", textAlign:"end"}}>({card.mana_cost})</span>
            <span>({card.cmc})</span> */}

          <button onClick={() => onRemoveCard(card.id)}>x</button>
        </li>
      ))}
    </ul>
  );
}
