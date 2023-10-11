import { useContext, useEffect } from "react";
import CardsList from "../features/cards/CardsList";
import CardImage from "../features/cards/CardImage";
import CardSearch from "../features/cards/CardSearch";
import axios from "axios";
import { DeckContext } from "../features/decks/context/DeckContext";
import CardDetails from "../features/cards/CardDetails";
import useInitialiseCards from "../hooks/useInitialiseDeckPage";
import CardsHistory from "../features/cards/CardsHistory";
import CardsSort from "../features/cards/CardsSort";

export default function DeckPage() {
  const {
    loading,
    cards,
    deck,
    selectedCard,
    selectedSearchCard,
  } = useContext(DeckContext)!;

  const { initialiseDeckPage } = useInitialiseCards();

  useEffect(() => {
    initialiseDeckPage();
  }, [initialiseDeckPage]);

  const handleSaveDeck = async () => {
    try {
      const updatedDeck = { ...deck, cards };
      console.log("Request Payload:", { ...deck, cards });
      const result = await axios.put(
        `http://localhost:3000/api/decks/${deck?.id}`,
        updatedDeck
      );
      console.log("Response Status:", result.status);
      console.log("Response Data:", result.data);
    } catch (error) {
      console.error("Request Error:", error);
    }
  };

  return (
    <>
      {!loading && (
        <div>
          <CardSearch />
          {selectedSearchCard && <CardImage card={selectedSearchCard} />}
          {selectedCard && <CardImage card={selectedCard} />}
          <CardDetails />
          <CardsHistory />
          <CardsSort />
          <CardsList />
          <button onClick={handleSaveDeck}>UPDATE</button>
        </div>
      )}
    </>
  );
}
