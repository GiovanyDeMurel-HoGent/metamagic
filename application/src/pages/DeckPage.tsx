import { Card, Deck } from "metamagic-types";
import { useParams, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
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

  //set deck with uselocation.state if navvigating via react-router Link
  //fetch deck first if entering url
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
      console.log(cardsResponse.data);
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
    setCards(updatedCards);
    setSelectedCard(undefined)
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
      setCards(updatedCards);
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
        setCards(updatedCards);
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
