import { Card, Deck } from "metamagic-types"
import { useState } from "react"
import axios from "axios"
import CardsList from "../cards/CardsList"


export function DeckBox(deck:Deck) {
  const [loading, setLoading] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [cards, setCards] = useState<Array<Card>>([]);

  async function handleClick() {
    setClicked(!clicked);
    if (!loading && clicked) {
      setCards([]);
    } else if (!loading) {
      setLoading(true);
      await getCards();
    }
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
      setLoading(false);
    }
  }

  return (
    <div>
    <h2>{deck.name}</h2>
    {deck.description && <p>Description: {deck.description}</p>}
    <p>Commander Name: {deck.commander.name}</p>
    <p>Commander Color Identity: {deck.commander.color_identity}</p>
    <button onClick={handleClick}>
      {clicked ? "Hide Cards" : "Show Cards"}
    </button>
    {clicked && loading && <p>Loading...</p>}
    {clicked && !loading && <CardsList cards={cards} />}
  </div>
  )
}
