import { useContext, useEffect } from "react";
import CardsList from "../features/cards/CardsList";
import CardImage from "../features/cards/CardImage";
import useCardsUpdate from "../hooks/useCardsUpdate";
import CardSearch from "../features/cards/CardSearch";
import axios from "axios";
import { DeckContext } from "../features/decks/context/DeckContext";
import CardDetails from "../features/cards/CardDetails";

import { useCardsSort } from "../hooks/useCardsSort";
import useInitialiseCards from "../hooks/useInitialiseDeckPage";
import CardsHistory from "../features/cards/CardsHistory";

export default function DeckPage() {
  const {
    loading,
    cards,
    deck,
    selectedCard,
    selectedSearchCard,
    displayCardDetails,
    setSelectedCard,
    setSelectedSearchCard,
    setDisplayCardDetails,
  } = useContext(DeckContext)!;


  const { sortCards } = useCardsSort();


  const { incrementAmount, decrementAmount, addCard, removeCard } =
    useCardsUpdate();
  
  const {initialiseDeckPage} = useInitialiseCards()

  useEffect(() => {
    initialiseDeckPage()
  }, [initialiseDeckPage])

  console.log(cards)

  const handleSort = () => {
    sortCards();
  };

  const handleUpdate = async () => {
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
          <CardSearch
            cards={cards}
            selectedSearchCard={selectedSearchCard}
            setSelectedSearchCard={setSelectedSearchCard}
            addCard={addCard}
          />
          {selectedSearchCard && (
            <CardImage
              card={selectedSearchCard}
              displayCardDetails={displayCardDetails}
              setDisplayCardDetails={setDisplayCardDetails}
            />
          )}
          <h2>{deck?.name}</h2>
          {deck?.description && <p>Description: {deck.description}</p>}
          <p>Commander Name: {deck?.commander.name}</p>
          <p>Commander Color Identity: {deck?.commander.color_identity}</p>
          {selectedCard && (
            <CardImage
              card={selectedCard}
              displayCardDetails={displayCardDetails}
              setDisplayCardDetails={setDisplayCardDetails}
            />
          )}
          {displayCardDetails !== null && (
            <CardDetails card={displayCardDetails} />
          )}
          <CardsHistory/>
          <button onClick={handleSort}>sort</button>
          <CardsList
            // cards={cards}
            commanderId={deck?.commander.id}
            setSelectedCard={setSelectedCard}
            onRemoveCard={removeCard}
            onDecrementAmount={incrementAmount}
            onIncrementAmount={decrementAmount}
          />
        </div>
      )}
      <button onClick={handleUpdate}>UPDATE</button>
    </>
  );
}
