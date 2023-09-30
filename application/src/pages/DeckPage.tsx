import { Card, Deck } from "metamagic-types";
import { useParams, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import CardsList from "../features/cards/CardsList";
import CardImage from "../features/cards/CardImage";
import { useCardsHistory } from "../hooks/useCardsHistory";

export default function DeckPage() {
  const { id } = useParams();
  const location = useLocation();
  const [deck, setDeck] = useState<Deck>({} as Deck);
  const [cards, setCards] = useState<Array<Card>>([]);
  const [initialCards, setInitialCards] = useState<Array<Card>>([]);
  const [selectedCard, setSelectedCard] = useState<Card>();
  const [loading, setLoading] = useState(true);

  const { undoStack, redoStack, undo, redo, reset, saveCardsToHistory } =
    useCardsHistory(cards, setCards, initialCards);
    
  console.log("rendering");

  //set deck with uselocation.state if navigating via react-router Link
  //fetch deck first if navigating via entering urlin browser
  const getDeckData = useCallback(async () => {
    try {
      if (location.state) {
        setDeck(location.state);
      } else {
        const deckResponse = await axios.get(
          `http://localhost:3000/api/decks/${id}`
        );
        setDeck(deckResponse.data);
      }
      const cardsResponse = await axios.get(
        `http://localhost:3000/api/decks/${id}/cards`
      );
      setCards(cardsResponse.data);
      if (initialCards.length === 0) setInitialCards(cardsResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [id, initialCards.length, location.state]);

  useEffect(() => {
    if (loading) getDeckData();
  }, [getDeckData, loading]);

  const handleRemoveCard = (cardToRemoveId: string) => {
    const updatedCards = cards.filter((card) => card.id !== cardToRemoveId);
    setCards(updatedCards);
    saveCardsToHistory(updatedCards);
    setSelectedCard(undefined);
  };

  function handleIncrementAmount(cardToDecrementId: string): void {
    const updatedCards = cards.map((card) => {
      if (card.id === cardToDecrementId && card.amount) {
        const updatedAmount = card.amount + 1;
        return { ...card, amount: updatedAmount };
      }
      return card;
    });
    setCards(updatedCards);
    saveCardsToHistory(updatedCards);
  }
  function handleDecrementAmount(cardToDecrementId: string): void {
    const updatedCards = cards
      .map((card) => {
        if (card.id === cardToDecrementId && card.amount) {
          const updatedAmount = card.amount - 1;
          return { ...card, amount: updatedAmount };
        }
        return card;
      })
      .filter((card) => card.amount !== 0);
    setCards(updatedCards);
    saveCardsToHistory(updatedCards);
  }

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
            onRemoveCard={handleRemoveCard}
            onDecrementAmount={handleIncrementAmount}
            onIncrementAmount={handleDecrementAmount}
          />
        </div>
      )}
    </>
  );
}
