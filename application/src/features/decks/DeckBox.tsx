import { Deck } from "metamagic-types";
import { Link } from "react-router-dom";

export function DeckBox(deck: Deck) {
  return (
    <div>
      <h2>{deck.name}</h2>
      {deck.description && <p>Description: {deck.description}</p>}
      <p>Commander Name: {deck.commander.name}</p>
      <p>Commander Color Identity: {deck.commander.color_identity}</p>
      <Link to={deck.id} state={deck}>Go to Deck</Link>
    </div>
  );
}
