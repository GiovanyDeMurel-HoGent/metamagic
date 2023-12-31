import { Card } from "metamagic-types";
import { useContext } from "react";
import { DeckContext } from "../features/decks/context/DeckContext";
import { useCardsHistory } from "./useCardsHistory";

export default function useCardsUpdate(
) {
  const {saveCardsToHistory} = useCardsHistory()
  const {cards, setCards, selectedCard, setSelectedCard,} = useContext(DeckContext)!
  const addCard = (cardToAdd: Card | null) => {
    try {
      if (cardToAdd && !cards?.find((card) => card.id === cardToAdd.id)) {
        
        const updatedCards = cards && [...cards, { ...cardToAdd, amount: 1 }];
        if (updatedCards){
        saveCardsToHistory([...cards]);
        setCards([...updatedCards]);
        
        }
      } else {
        throw new Error(
          `Card ${cardToAdd ? cardToAdd.name : ""} already exists in deck`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeCard = (cardToRemoveId: string) => {
    const updatedCards = cards?.filter((card) => card.id !== cardToRemoveId);
    if (updatedCards){
    setCards(updatedCards);
    saveCardsToHistory(updatedCards);
    }
    if (selectedCard !== null && cardToRemoveId === selectedCard.id) {
      setSelectedCard(null);
    }
  };

  const incrementAmount = (cardToDecrementId: string) => {
    if (cards){
    const updatedCards = cards?.map((card) => {
      if (card.id === cardToDecrementId && card.amount) {
        const updatedAmount = card.amount + 1;
        console.log(card)
        return { ...card, amount: updatedAmount };
      }
      return card;
    });
    
    console.log("incrementing...")
    saveCardsToHistory([...cards ?? []]);
    setCards([...updatedCards]);
    
    }
  };

  const decrementAmount = (cardToDecrementId: string) => {
    if (cards){
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
    saveCardsToHistory([...cards]);
    setCards(updatedCards);
    }
  };
  return {
    incrementAmount,
    decrementAmount,
    addCard,
    removeCard,
  };
}
