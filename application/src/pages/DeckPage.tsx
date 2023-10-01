import { Card } from "metamagic-types";
import { useState } from "react";
import CardsList from "../features/cards/CardsList";
import CardImage from "../features/cards/CardImage";
import useCardsUpdate from "../hooks/useCardsUpdate";
import useInitialiseDeckPage from "../hooks/useInitialiseDeckPage";
import { useCardsHistory } from "../hooks/useCardsHistory";
import CardSearch from "../features/cards/CardSearch";

export default function DeckPage() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedSearchCard, setSelectedSearchCard] = useState<Card | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const { cards, deck, setCards, initialCards } = useInitialiseDeckPage(
    loading,
    setLoading
  );

  const { undoStack, redoStack, undo, redo, reset, saveCardsToHistory } =
    useCardsHistory(cards, setCards, initialCards);

  const { incrementAmount, decrementAmount, addCard, removeCard } = useCardsUpdate(
    cards,
    setCards,
    selectedCard,
    setSelectedCard,
    saveCardsToHistory
  );

  return (
    <>
      {!loading && (
        <div>
          <CardSearch cards={cards} selectedSearchCard={selectedSearchCard} setSelectedSearchCard={setSelectedSearchCard} addCard={addCard} />
          {selectedSearchCard && <CardImage {...selectedSearchCard} />}
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
