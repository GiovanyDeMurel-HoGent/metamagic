import { useContext } from "react";
import { DeckContext } from "../decks/context/DeckContext";
import useCardsUpdate from "../../hooks/useCardsUpdate";

export default function CardsList() {
  const { cards, selectedCard, setSelectedCard} =
    useContext(DeckContext)!;
  const { decrementAmount, incrementAmount, removeCard } = useCardsUpdate();


  return (
<ul className="list-none min-w-[280px]">
  {cards?.map((card) => (
    <li
      className={` hover:bg-slate-100 ${
        card.id === selectedCard?.id ? "bg-slate-100" : ""
      }`}
      key={card.id}
    >
      <div className="flex pr-1 pb-1 pt-1">
        <div className=" w-16 h-full flex flex-col items-center justify-between text-center">
          <div className="flex items-center justify-center">
            <div className="w-8">
              <span>{card.amount}</span>
            </div>
            <div className="w-8">
              <button
                className="w-8 h-8 bg-blue-100 hover:bg-blue-200 active:bg-blue-300"
                onClick={() => incrementAmount(card.id)}
              >
                +
              </button>
              <button
                className="w-8 h-8 bg-blue-100 hover:bg-blue-200 active:bg-blue-300"
                onClick={() => decrementAmount(card.id)}
              >
                -
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 pl-6 flex flex-col justify-center gap-1"
          onClick={() => setSelectedCard(card)}
        >
          <div className="">{card.name}</div>
          <div className="whitespace-nowrap">{card.mana_cost}</div>
        </div>
        <div className="w-8 flex items-center justify-center">
          <button
            className="w-8 h-full bg-blue-100 hover:bg-red-200 active:bg-red-300"
            onClick={() => removeCard(card.id)}
          >
            x
          </button>
        </div>
      </div>
    </li>
  ))}
</ul>
  );
}
