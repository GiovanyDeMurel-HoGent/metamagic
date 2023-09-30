import axios from "axios";
import { useEffect, useState } from "react";
import { Deck } from "metamagic-types"
import { DeckBox } from "./DeckBox";


export function DecksList() {
    const [decks, setDecks] = useState<Deck[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:3000/api/decks/')
            .then((response) => {
            setDecks(response.data);
            setLoading(false)
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
        }, []);
  return (
    <div>
    {loading ?
      <p>Loading...</p>
    :
      decks.map((deck) => (
        <DeckBox key={deck.id} {...deck}/>
      )) 

    }
    </div>
  )
}
