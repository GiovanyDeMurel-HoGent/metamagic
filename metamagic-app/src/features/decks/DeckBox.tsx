import { Deck } from "metamagic-types"


export function DeckBox(deck:Deck) {
  return (
    <div>
    <h2>{deck.name}</h2>
    {deck.description && <p>Description: {deck.description}</p>}
    <p>Commander Name: {deck.commander.name}</p>
    <p>Commander Color Identity: {deck.commander.color_identity}</p>
  </div>
  )
}
