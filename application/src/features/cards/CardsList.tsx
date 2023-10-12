import { useContext } from "react";
import { DeckContext } from "../decks/context/DeckContext";
import useCardsUpdate from "../../hooks/useCardsUpdate";

export default function CardsList() {
  const { cards, deck, selectedCard, setSelectedCard, expandedCardId, setExpandedCardId } =
    useContext(DeckContext)!;
  const { decrementAmount, incrementAmount, removeCard } = useCardsUpdate();

  const handleExpandCard = (id: string) => {
    if (id === expandedCardId) setExpandedCardId(null);
    else setExpandedCardId(id);
  };
  return (
    <ul className="list-none">
      {cards?.map((card) => (
        <li className={`hover:bg-slate-100 ${card.id === selectedCard?.id ? "bg-slate-100" : "" }
        
        `} key={card.id}>
          <div className="flex">
            <div className="flex">
            <button
              className="w-8 h-full bg-blue-300"
              onClick={() => handleExpandCard(card.id)}
            >
              
              {expandedCardId === card.id ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              )}

            </button>
            <div className="w-8 h-8 justify-center align-middle text-center">
              <span>{card.amount}</span>
                  
              </div>
            </div>

            {card.id === expandedCardId ? (
              <div>
                
                <div className="flex justify-between">

                  <div className="">
                  <div className="">
                  <button className="w-8 h-8 mr-1 bg-blue-100" onClick={() => incrementAmount(card.id)}>+</button>
                  <button className="w-8 h-8 mr-1 bg-blue-100" onClick={() => decrementAmount(card.id)}>-</button>
                  </div>
                  </div>
                  <button className="w-8 h-8 bg-blue-100" onClick={() => removeCard(card.id)}>x</button>
                </div>
                <div className="">
                <a className="p-1"
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
              </div>
            ) : (
              <a className="p-1"
                onClick={() => {
                  setSelectedCard(card);
                }}
              >
                <div className="flex">
                {/* <div>
                  {card.amount}
                </div> */}
                <div>
                  <span>{card.name}</span>
                <span>{card.mana_cost}</span>
                </div>
                </div>
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
