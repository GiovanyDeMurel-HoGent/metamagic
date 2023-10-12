import { useContext } from "react";

import { DeckContext } from "../decks/context/DeckContext";
import { useCardsHistory } from "../../hooks/useCardsHistory";

export default function CardsHistory() {
  const { initialCards, cards } = useContext(DeckContext)!;
  const { undoStack, redoStack, undo, redo, reset } = useCardsHistory()!;
  console.log(undoStack)
  return (
    <>
      <button className="pl-2 pr-2  w-16 h-8 bg-orange-300" onClick={undo} disabled={undoStack.length === 0}>
        Undo
      </button>
      <button className="pl-2 pr-2 w-16 h-8 bg-orange-300" onClick={redo} disabled={redoStack.length === 0}>
        Redo
      </button>
      <button className="pl-2 pr-2  w-16 h-8 bg-orange-300"
        onClick={reset}
        disabled={
          cards?.length === initialCards?.length &&
          !cards?.some((card, index) => {
            if (initialCards)
              return (
                card.id !== initialCards[index].id ||
                card.amount !== initialCards[index].amount
              );
          })
        }
      >
        Reset
      </button>
    </>
  );
}
