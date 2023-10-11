import { Card } from "metamagic-types";
import { useContext, } from "react";
import { DeckContext } from "../features/decks/context/DeckContext";

export function useCardsHistory() {
  // const undoStack = useRef<Array<Array<Card>>>([]);
  // const redoStack = useRef<Array<Array<Card>>>([]);

  const { cards, setCards, initialCards, undoStack, redoStack, setUndoStack, setRedoStack } = useContext(DeckContext)!;


  const saveCardsToHistory = (cards: Array<Card>) => {
    console.log("pushing to undoStack..");
    setUndoStack([...undoStack, cards]);
    setRedoStack([]);
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const prevCardsHistory = undoStack.pop();
      console.log("UNDO: setting cards to:");
      
      console.log(prevCardsHistory)
      if (cards) {
        setRedoStack([...redoStack, cards]);
        setCards([...(prevCardsHistory ?? [])]);
      }
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextCardsHistory = redoStack.pop();
      if (cards) {
        setUndoStack([...undoStack, cards]);
        setCards([...(nextCardsHistory ?? [])]);
      }
    }
  };

  const reset = () => {
    setCards([...initialCards ?? []]);
    setUndoStack([]);
    setRedoStack([]);
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
