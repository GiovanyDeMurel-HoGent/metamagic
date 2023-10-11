import { Deck } from "metamagic-types";
import { Link } from "react-router-dom";

export function DeckPreview(deck: Deck) {
  return (
    <div>
      <img src={deck.commander.image_uris.art_crop}  width="100%"/>
      <h2>{deck.name}</h2>
      {deck.description && <p>Description: {deck.description}</p>}
      <p>Commander Name: {deck.commander.name}</p>
      <p>Commander Color Identity: {deck.commander.color_identity}</p>
      <Link to={deck.id} state={deck}><button>Go to Deck</button></Link>
    </div>
  );
}
