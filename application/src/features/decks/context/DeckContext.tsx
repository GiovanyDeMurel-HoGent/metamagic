import { Card, Deck } from "metamagic-types";
import { createContext, useState } from "react";

type DeckContextType = {
    deck: Deck | null
    setDeck: (deck:Deck | null)=>void
    cards: Array<Card> | null
    setCards: (cards:Array<Card> | null)=>void
    selectedCard: Card | null
    setSelectedCard: (card:Card | null)=>void
    selectedSearchCard: Card | null
    setSelectedSearchCard: (card:Card | null)=>void
}

export const DeckContext = createContext<DeckContextType | null>(null)

export const DeckProvider = ({children}:{ children: React.ReactNode }) => {
    const [deck, setDeck] = useState<Deck | null>(null)
    const [cards, setCards] = useState<Array<Card> | null>([])
    const [selectedCard, setSelectedCard] = useState<Card|null>(null)
    const [selectedSearchCard, setSelectedSearchCard] = useState<Card|null>(null)
    return(
        <DeckContext.Provider value={{
            deck,setDeck,cards,setCards,selectedCard,setSelectedCard,selectedSearchCard,setSelectedSearchCard
        }}>
        {children}
        </DeckContext.Provider>
    )

}
