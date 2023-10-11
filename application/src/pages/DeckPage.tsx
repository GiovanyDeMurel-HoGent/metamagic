// import { Card } from "metamagic-types";
import { useContext, useState } from "react";
import CardsList from "../features/cards/CardsList";
import CardImage from "../features/cards/CardImage";
import useCardsUpdate from "../hooks/useCardsUpdate";
import useInitialiseDeckPage from "../hooks/useInitialiseDeckPage";
import { useCardsHistory } from "../hooks/useCardsHistory";
import CardSearch from "../features/cards/CardSearch";
import axios from "axios";
import { DeckContext } from "../features/decks/context/DeckContext";
import CardDetails from "../features/cards/CardDetails";
import { Card } from "metamagic-types";
//TODO context ? context aanspreken vanuit custom hooks
export default function DeckPage() {
  // const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  // const [selectedSearchCard, setSelectedSearchCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [displayCardDetails, setDisplayCardDetails] = useState<Card|null>(null)
  const {cards, deck, selectedCard,setCards, setSelectedCard,selectedSearchCard, setSelectedSearchCard} = useContext(DeckContext)!
  

  const { initialCards } = 
    useInitialiseDeckPage(loading, setLoading);

  const { undoStack, redoStack, undo, redo, reset, saveCardsToHistory } = 
    useCardsHistory(initialCards);

  const { incrementAmount, decrementAmount, addCard, removeCard } =
    useCardsUpdate(saveCardsToHistory);

    // TODO: split off into util and typing
    function compareCards(a, b) {
      const nameComparison = a.name.localeCompare(b.name);
      if (nameComparison !== 0) {
        return nameComparison;
      }
    
      if (a.cmc !== b.cmc) {
        return a.cmc - b.cmc;
      }
    
      function compareManaCost(aManaCost, bManaCost) {
        // Remove curly braces and compare the strings directly
        return aManaCost.replace(/\{|\}/g, '').localeCompare(bManaCost.replace(/\{|\}/g, ''));
      }
    
      return compareManaCost(a.mana_cost, b.mana_cost);
    }


    const handleSort = () => {
      if(cards){
      const sortedCards = cards
      sortedCards?.sort(compareCards)
      setCards([...sortedCards])
      }
    }

  const handleUpdate = async () => { 
    try {
      const updatedDeck = {...deck, cards}
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
          {selectedSearchCard && <CardImage card={selectedSearchCard} displayCardDetails={displayCardDetails} setDisplayCardDetails={setDisplayCardDetails} />}
          <h2>{deck?.name}</h2>
          {deck?.description && <p>Description: {deck.description}</p>}
          <p>Commander Name: {deck?.commander.name}</p>
          <p>Commander Color Identity: {deck?.commander.color_identity}</p>
          {selectedCard && <CardImage card={selectedCard} displayCardDetails={displayCardDetails} setDisplayCardDetails={setDisplayCardDetails} />}
          {displayCardDetails!==null && 
          <CardDetails card={displayCardDetails}/>
          }
          <button onClick={undo} disabled={undoStack.current.length === 0}>
            Undo
          </button>
          <button onClick={redo} disabled={redoStack.current.length === 0}>
            Redo
          </button>
          <button
            onClick={reset}
            disabled={
              cards?.length === initialCards.length &&
              !cards.some((card, index) => {
                return (
                  card.id !== initialCards[index].id ||
                  card.amount !== initialCards[index].amount
                );
              })
            }
          >
            Reset
          </button>
          <button onClick={handleSort}>sort</button>
          <CardsList
            cards={cards}
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
