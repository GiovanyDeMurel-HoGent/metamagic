import { Card, Deck } from "metamagic-types";
import { useEffect, useState } from "react";
import axios from "axios";
import CardsList from "../cards/CardsList";
import CardImage from "../cards/CardImage";

export function DeckBox(deck: Deck ) {
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [cards, setCards] = useState<Array<Card>>([]);
  const [selectedCard, setSelectedCard] = useState<Card>();

  useEffect(() => {
    if(loading && clicked)
    getCards();
  }, [loading, clicked]);

  function handleClick() {
    setClicked(!clicked);
  }

  async function getCards() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/decks/${deck.id}/cards`
      );
      setCards(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div>
      <h2>{deck.name}</h2>
      {deck.description && <p>Description: {deck.description}</p>}
      <p>Commander Name: {deck.commander.name}</p>
      <p>Commander Color Identity: {deck.commander.color_identity}</p>
      {selectedCard?.image_uris && (
        <CardImage {...selectedCard} />
      )}
      <button onClick={handleClick}>
        {clicked ? "Hide Cards" : "Show Cards"}
      </button>
      {clicked && loading && <p>Loading...</p>}
      {clicked && !loading && <CardsList cards={cards} setSelectedCard={setSelectedCard} />}
    </div>
  );
}
