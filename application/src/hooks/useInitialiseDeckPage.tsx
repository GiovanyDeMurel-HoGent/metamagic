import axios from 'axios';
import { useCallback, useContext, useEffect} from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { DeckContext } from '../features/decks/context/DeckContext';

export default function useInitialiseCards() {
    const { id } = useParams();
    const location = useLocation();
    const {loading, setLoading, cards, initialCards, setInitialCards, setCards, deck, setDeck} = useContext(DeckContext)!



    //set deck with uselocation.state if navigating via react-router Link
    //fetch deck first if navigating via entering urlin browser
    const getDeckData = useCallback(async () => {
      try {
        if (location.state) {
          setDeck(location.state);
        } else {
          const deckResponse = await axios.get(
            `http://localhost:3000/api/decks/${id}`
          );
          setDeck(deckResponse.data);
        }
        const cardsResponse = await axios.get(
          `http://localhost:3000/api/decks/${id}/cards`
        );
        setCards(cardsResponse.data);
        if (initialCards?.length === 0) setInitialCards(cardsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, [id, initialCards?.length, location.state, setCards, setDeck, setInitialCards, setLoading]);
  
    useEffect(() => {
      if (loading) getDeckData();
    }, [getDeckData, loading]);
  
  return {
    deck, cards, setCards, setDeck, initialCards
  }
}
