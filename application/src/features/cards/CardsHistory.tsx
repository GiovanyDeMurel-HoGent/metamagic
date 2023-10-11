import { useContext } from "react";

import { DeckContext } from "../decks/context/DeckContext";
import { useCardsHistory } from "../../hooks/useCardsHistory";

export default function CardsHistory() {
  const { initialCards, cards } = useContext(DeckContext)!;
  const { undoStack, redoStack, undo, redo, reset } = useCardsHistory()!;
  console.log(undoStack)
  return (
    <>
      <button onClick={undo} disabled={undoStack.length === 0}>
        Undo
      </button>
      <button onClick={redo} disabled={redoStack.length === 0}>
        Redo
      </button>
      <button
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
