import { useContext } from "react"
import { DeckContext } from "./context/DeckContext"

export default function DeckDetails() {
    const {deck} = useContext(DeckContext)!
  return (
    <>
    <h2>{deck?.name}</h2>
    {deck?.description && <p>Description: {deck.description}</p>}
    <p>Commander Name: {deck?.commander.name}</p>
    <p>Commander Color Identity: {deck?.commander.color_identity}</p>
    </>
  )
}
