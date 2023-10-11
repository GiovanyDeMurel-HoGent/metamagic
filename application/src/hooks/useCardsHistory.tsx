import { Card } from "metamagic-types";
import { useContext, } from "react";
import { DeckContext } from "../features/decks/context/DeckContext";

export function useCardsHistory() {
  // const { cards, setCards, initialCards } = useContext(DeckContext)!;
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
  //   const [undoStack, setUndoStack] = useState<Array<Array<Card>>|null>([]);
  // const [redoStack, setRedoStack] = useState<Array<Array<Card>>|null>([]);

  // const saveCardsToHistory = (cards: Array<Card>) => {
  //   console.log("pushing to undostack..")
  //   undoStack.push([...cards]);
  //   // setCards([...newCards]);
  //   setRedoStack(null);
  // };

  // const undo = () => {
  //   if (undoStack.current.length > 0) {
  //     const prevCardsHistory = undoStack.current.pop();
  //     if (cards) redoStack.current.push([...cards]);
  //     setCards([...(prevCardsHistory ?? [])]);
  //   }
  // };

  // const redo = () => {
  //   if (redoStack.current.length > 0) {
  //     const nextCardsHistory = redoStack.current.pop();
  //     if (cards) undoStack.current.push([...cards]);
  //     setCards([...(nextCardsHistory ?? [])]);
  //   }
  // };

  // const reset = () => {
  //   setCards([...initialCards ?? []]);
  //   undoStack.current = [];
  //   redoStack.current = [];
  // };
  // const saveCardsToHistory = (cards: Array<Card>) => {
  //   console.log("pushing to undostack..")
  //   undoStack.current.push([...cards ?? []]);
  //   console.log(undoStack.current)
  //   // setCards([...newCards]);
  //   redoStack.current = [];
  // };

  // const undo = () => {
  //   if (undoStack.current.length > 0) {
  //     const prevCardsHistory = undoStack.current.pop();
  //     if (cards) redoStack.current.push([...cards]);
  //     setCards([...(prevCardsHistory ?? [])]);
  //   }
  // };

  // const redo = () => {
  //   if (redoStack.current.length > 0) {
  //     const nextCardsHistory = redoStack.current.pop();
  //     if (cards) undoStack.current.push([...cards]);
  //     setCards([...(nextCardsHistory ?? [])]);
  //   }
  // };

  // const reset = () => {
  //   setCards([...initialCards ?? []]);
  //   undoStack.current = [];
  //   redoStack.current = [];
  // };

  return {
    undoStack,
    redoStack,
    undo,
    redo,
    reset,
    saveCardsToHistory,
  };
}
