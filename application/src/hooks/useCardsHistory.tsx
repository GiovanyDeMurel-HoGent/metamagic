import { Card } from "metamagic-types";
import { useRef } from "react";

export function useCardsHistory(
  cards: Array<Card>,
  setCards: (cards: Array<Card>) => void,
  initialCards: Array<Card>
) {
  const undoStack = useRef<Array<Array<Card>>>([]);
  const redoStack = useRef<Array<Array<Card>>>([]);

  const saveCardsToHistory = (newCards: Array<Card>) => {
    undoStack.current.push([...cards]);
    setCards(newCards);
    redoStack.current = [];
  };

  const undo = () => {
    if (undoStack.current.length > 0) {
      const prevCardsHistory = undoStack.current.pop();
      redoStack.current.push([...cards]);
      setCards([...(prevCardsHistory ?? [])]);
    }
  };

  const redo = () => {
    if (redoStack.current.length > 0) {
      const nextCardsHistory = redoStack.current.pop();
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
