import { Card } from "metamagic-types";

export default function useCardsUpdate(
  cards: Array<Card>,
  setCards: (cards: Array<Card>) => void,
  selectedCard: Card | null,
  setSelectedCard: (card: Card | null) => void,
  saveCardsToHistory: (cards: Array<Card>) => void
) {
  const removeCard = (cardToRemoveId: string) => {
    const updatedCards = cards.filter((card) => card.id !== cardToRemoveId);
    setCards(updatedCards);
    saveCardsToHistory(updatedCards);
    if (selectedCard !== null && cardToRemoveId === selectedCard.id) {
      setSelectedCard(null);
    }
  };

  const incrementAmount = (cardToDecrementId: string) => {
    const updatedCards = cards.map((card) => {
      if (card.id === cardToDecrementId && card.amount) {
        const updatedAmount = card.amount + 1;
        return { ...card, amount: updatedAmount };
      }
      return card;
    });
    setCards(updatedCards);
    saveCardsToHistory(updatedCards);
  };

  const decrementAmount = (cardToDecrementId: string) => {
    const updatedCards = cards
      .map((card) => {
        if (card.id === cardToDecrementId && card.amount) {
          const updatedAmount = card.amount - 1;
          if (
            updatedAmount < 1 &&
            selectedCard !== null &&
            cardToDecrementId === selectedCard.id
          ) {
            setSelectedCard(null);
          }
          return { ...card, amount: updatedAmount };
        }
        return card;
      })
      .filter((card) => card.amount !== 0);
    setCards(updatedCards);
    saveCardsToHistory(updatedCards);
  };
  return {
    incrementAmount,
    decrementAmount,
    removeCard,
  };
}
