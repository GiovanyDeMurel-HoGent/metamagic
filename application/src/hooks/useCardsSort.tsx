import { useContext } from "react";
import { DeckContext } from "../features/decks/context/DeckContext";
import { Card } from "metamagic-types";

export function useCardsSort(){
const {cards, setCards} = useContext(DeckContext)!
  const sortCards = () => {
    
  function compareCards(a: Card, b: Card) {
    if (a && b && a.name !== null && b.name !== null) {
      const nameComparison = a.name.localeCompare(b.name);
      if (nameComparison !== 0) {
        return nameComparison;
      }

      if (a.cmc !== null && b.cmc !== null && a.cmc !== b.cmc) {
        return a.cmc - b.cmc;
      }

      if (a.mana_cost && b.mana_cost) {
        return compareManaCost(a.mana_cost, b.mana_cost);
      }
      return 0;
    }
    function compareManaCost(aManaCost: string, bManaCost: string) {
      return aManaCost
        .replace(/\{|\}/g, "")
        .localeCompare(bManaCost.replace(/\{|\}/g, ""));
    }
    return 0;
  }
  if (cards) {
    const sortedCards = cards;
    sortedCards.sort(compareCards);
    setCards([...sortedCards]);
  }
  }
  return {
    sortCards
  }
}
