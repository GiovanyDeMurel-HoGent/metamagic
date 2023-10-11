import { useContext } from "react";
import { DeckContext } from "../decks/context/DeckContext";
import useCardsUpdate from "../../hooks/useCardsUpdate";

export default function CardsList() {
  const { cards, deck, setSelectedCard, expandedCardId, setExpandedCardId } =
    useContext(DeckContext)!;
  const { decrementAmount, incrementAmount, removeCard } = useCardsUpdate();

  const handleExpandCard = (id: string) => {
    if (id === expandedCardId) setExpandedCardId(null);
    else setExpandedCardId(id);
  };
  return (
    <ul style={{ listStyle: "none", padding: "0" }}>
      {cards?.map((card) => (
        <li key={card.id}>
          <div style={{ display: "flex" }}>
            <button onClick={() => handleExpandCard(card.id)}>{expandedCardId === card.id ? <span>V</span> : <span>^</span>}</button>
            {card.id === expandedCardId ? (
              <div>
                <div>
                  <span>{card.amount}</span>
                  <button onClick={() => incrementAmount(card.id)}>+</button>
                  <button onClick={() => decrementAmount(card.id)}>-</button>
                  <button onClick={() => removeCard(card.id)}>x</button>
                </div>
                <div></div>
                <a
                  onClick={() => {
                    setSelectedCard(card);
                  }}
                >
                  <span>
                    {card.id == deck?.commander.id && <span>[C]</span>}
                  </span>
                  <span>{card.name}</span>
                  <span>{card.mana_cost}</span>
                </a>
              </div>
            ) : (
              <a
                onClick={() => {
                  setSelectedCard(card);
                }}
              > 
                <span>{card.amount}</span>
                <span>{card.name}</span>
                <span>{card.mana_cost}</span>

              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
