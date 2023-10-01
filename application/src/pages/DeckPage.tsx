import { Card } from "metamagic-types";
import { useState } from "react";
import CardsList from "../features/cards/CardsList";
import CardImage from "../features/cards/CardImage";
import useCardsUpdate from "../hooks/useCardsUpdate";
import useInitialiseDeckPage from "../hooks/useInitialiseDeckPage";
import { useCardsHistory } from "../hooks/useCardsHistory";

//TODO: set selectedCard to undefined when resetting + undo/reset when appropriate
export default function DeckPage() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);

  const { cards, deck, setCards, initialCards } = 
  useInitialiseDeckPage(loading, setLoading);

  const { undoStack, redoStack, undo, redo, reset, saveCardsToHistory } =
    useCardsHistory(cards, setCards, initialCards);

  const { incrementAmount, decrementAmount, removeCard } = useCardsUpdate(
    cards,
    setCards,
    selectedCard,
    setSelectedCard,
    saveCardsToHistory
  );

  console.log("rendering");



  return (
    <>
      {!loading && (
        <div>
          <h2>{deck.name}</h2>
          {deck.description && <p>Description: {deck.description}</p>}
          <p>Commander Name: {deck.commander.name}</p>
          <p>Commander Color Identity: {deck.commander.color_identity}</p>
          {selectedCard && <CardImage {...selectedCard} />}
          <button onClick={undo} disabled={undoStack.current.length === 0}>
            Undo
          </button>
          <button onClick={redo} disabled={redoStack.current.length === 0}>
            Redo
          </button>
          <button onClick={reset} disabled={false}>
            Reset
          </button>
          <CardsList
            cards={cards}
            commanderId={deck.commander.id}
            setSelectedCard={setSelectedCard}
            onRemoveCard={removeCard}
            onDecrementAmount={incrementAmount}
            onIncrementAmount={decrementAmount}
          />
        </div>
      )}
    </>
  );
}
