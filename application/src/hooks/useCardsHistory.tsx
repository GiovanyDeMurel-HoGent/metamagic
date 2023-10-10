import { Card } from "metamagic-types";
import { useContext, useRef } from "react";
import { DeckContext } from "../features/decks/context/DeckContext";

export function useCardsHistory(
  // cards: Array<Card>,
  // setCards: (cards: Array<Card>) => void,
  initialCards: Array<Card>
) {
  const {cards, setCards} = useContext(DeckContext)!
  const undoStack = useRef<Array<Array<Card>>>([]);
  const redoStack = useRef<Array<Array<Card>>>([]);

  const saveCardsToHistory = (newCards: Array<Card>) => {
    if(cards)
    undoStack.current.push([...cards]);
    setCards(newCards);
    redoStack.current = [];
  };

  const undo = () => {
    if (undoStack.current.length > 0) {
      const prevCardsHistory = undoStack.current.pop();
      if (cards)
      redoStack.current.push([...cards]);
      setCards([...(prevCardsHistory ?? [])]);
    }
  };

  const redo = () => {
    if (redoStack.current.length > 0) {
      const nextCardsHistory = redoStack.current.pop();
      if(cards)
      undoStack.current.push([...cards]);
      setCards([...(nextCardsHistory ?? [])]);
    }
  };

  const reset = () => {
    setCards([...initialCards]);
    undoStack.current = [];
    redoStack.current = [];
  };

  return {
    undoStack,
    redoStack,
    undo,
    redo,
    reset,
    saveCardsToHistory,
  };
}
