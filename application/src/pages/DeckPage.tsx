import { Card } from "metamagic-types";
import { useState } from "react";
import CardsList from "../features/cards/CardsList";
import CardImage from "../features/cards/CardImage";
import useCardsUpdate from "../hooks/useCardsUpdate";
import useInitialiseDeckPage from "../hooks/useInitialiseDeckPage";
import { useCardsHistory } from "../hooks/useCardsHistory";
import CardSearch from "../features/cards/CardSearch";
import axios from "axios";

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

  const { incrementAmount, decrementAmount, addCard, removeCard } =
    useCardsUpdate(
      cards,
      setCards,
      selectedCard,
      setSelectedCard,
      saveCardsToHistory
    );

    const handleUpdate = async () => {
      
      
      try {
        const updatedDeck = {...deck, cards}
        console.log("Request Payload:", { ...deck, cards });
        const result = await axios.put(
          `http://localhost:3000/api/decks/${deck.id}`,
          updatedDeck
        );
        console.log("Response Status:", result.status);
        console.log("Response Data:", result.data);
      } catch (error) {
        console.error("Request Error:", error);
      }
    };

  return (
    <>
      {!loading && (
        <div>
          <CardSearch
            cards={cards}
            selectedSearchCard={selectedSearchCard}
            setSelectedSearchCard={setSelectedSearchCard}
            addCard={addCard}
          />
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
          <button
            onClick={reset}
            disabled={
              cards.length === initialCards.length &&
              !cards.some((card, index) => {
                return (
                  card.id !== initialCards[index].id ||
                  card.amount !== initialCards[index].amount
                );
              })
            }
          >
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
      <button onClick={handleUpdate}>UPDATE</button>
    </>
  );
}
