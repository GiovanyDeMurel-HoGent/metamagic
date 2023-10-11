import { Card, Deck } from "metamagic-types";
import { createContext, useState } from "react";

type DeckContextType = {
  loading: boolean;
  setLoading: (arg: boolean) => void;
  deck: Deck | null;
  setDeck: (deck: Deck | null) => void;
  initialCards: Array<Card> | null;
  setInitialCards: (initialCards: Array<Card> | null) => void;
  cards: Array<Card> | null;
  setCards: (cards: Array<Card> | null) => void;
  selectedCard: Card | null;
  setSelectedCard: (card: Card | null) => void;
  selectedSearchCard: Card | null;
  setSelectedSearchCard: (card: Card | null) => void;
  displayCardDetails: Card | null;
  setDisplayCardDetails: (card: Card | null) => void;
};

export const DeckContext = createContext<DeckContextType | null>(null);

export const DeckProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Array<Card> | null>([]);
  const [initialCards, setInitialCards] = useState<Array<Card> | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedSearchCard, setSelectedSearchCard] = useState<Card | null>(
    null
  );
  const [displayCardDetails, setDisplayCardDetails] = useState<Card | null>(
    null
  );

  return (
    <DeckContext.Provider
      value={{
        loading,
        setLoading,
        deck,
        setDeck,
        cards,
        setCards,
        initialCards,
        setInitialCards,
        selectedCard,
        setSelectedCard,
        selectedSearchCard,
        setSelectedSearchCard,
        displayCardDetails,
        setDisplayCardDetails,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};
