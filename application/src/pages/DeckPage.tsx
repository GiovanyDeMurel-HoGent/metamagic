import { Card, Deck } from "metamagic-types";
import { useParams, useLocation } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import CardsList from "../features/cards/CardsList";
import CardImage from "../features/cards/CardImage";

export default function DeckPage() {
  const { id } = useParams();
  const location = useLocation();
  const [deck, setDeck] = useState<Deck>({} as Deck);
  const [cards, setCards] = useState<Array<Card>>([]);
  const [selectedCard, setSelectedCard] = useState<Card>();
  const [loading, setLoading] = useState(true);

  const undoStack = useRef<Array<Array<Card>>>([]);
  const redoStack = useRef<Array<Array<Card>>>([]);

  const saveStateToHistory = (newState: Array<Card>) => {
    undoStack.current.push([...cards]);
    setCards(newState);
    redoStack.current = [];
  };

  const undo = () => {
    if (undoStack.current.length > 0) {
      const prevState = undoStack.current.pop();
      if (prevState) {
        redoStack.current.push([...cards]);
        setCards(prevState);
      }
    }
  };

  const redo = () => {
    if (redoStack.current.length > 0) {
      const nextState = redoStack.current.pop();
      if (nextState) {
        undoStack.current.push([...cards]);
        setCards(nextState);
      }
    }
  };
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

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [id, location.state]);

  useEffect(() => {
    if (loading) getDeckData();
  }, [getDeckData, loading]);

  const handleRemoveCard = (cardToRemoveId: string) => {
    const updatedCards = cards.filter((card) => card.id !== cardToRemoveId);
    saveStateToHistory(updatedCards);
    setSelectedCard(undefined);
  };

  function handleIncrementAmount(
    cardToDecrementId: string,
    amount?: number
  ): void {
    if (amount) {
      const updatedAmount = amount + 1;
      const updatedCards = cards.map((card) => {
        if (card.id === cardToDecrementId) {
          return { ...card, amount: updatedAmount };
        }
        return card;
      });
      saveStateToHistory(updatedCards);
    }
  }
  function handleDecrementAmount(
    cardToDecrementId: string,
    amount?: number
  ): void {
    if (amount) {
      const updatedAmount = amount - 1;
      if (updatedAmount == 0) {
        handleRemoveCard(cardToDecrementId);
      } else {
        const updatedCards = cards.map((card) => {
          if (card.id === cardToDecrementId) {
            return { ...card, amount: updatedAmount };
          }
          return card;
        });
        saveStateToHistory(updatedCards);
      }
    }
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
