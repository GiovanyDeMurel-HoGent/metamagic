import { useContext } from "react";
import { DeckContext } from "../decks/context/DeckContext";
import useCardsUpdate from "../../hooks/useCardsUpdate";

export default function CardsList() {
  const {cards,deck,setSelectedCard} = useContext(DeckContext)!
  const {decrementAmount, incrementAmount, removeCard} = useCardsUpdate()
  return (
    <ul style={{ listStyle: "none", padding: "0" }}>
      {cards?.map((card) => (
        <li key={card.id}>
          <span> {card.amount} </span>
          <button onClick={() => decrementAmount(card.id)}>+</button>
          <button onClick={() => incrementAmount(card.id)}>-</button>
          <a
            onClick={() => {
              setSelectedCard(card);
            }}
          >
          <span>{card.name}</span>
          </a>
          <span>{card.id == deck?.commander.id && <span>[C]</span>}</span>
          <span>{card.mana_cost}</span>
          <button onClick={() => removeCard(card.id)}>x</button>
        </li>
      ))}
    </ul>
  );
}
