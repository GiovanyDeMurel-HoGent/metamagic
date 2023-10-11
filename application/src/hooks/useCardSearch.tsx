import axios from "axios";
import { Card } from "metamagic-types";
import { useCallback, useContext, useEffect, useState } from "react";
import { DeckContext } from "../features/decks/context/DeckContext";

//TODO: hook up to own database to fetch suggestions instead of scryfall
export default function useCardSearch() {
  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const {setSelectedSearchCard} = useContext(DeckContext)!
  const BASE_URL = "https://api.scryfall.com/cards/";
  const AUTO_COMPLETE_URL = `${BASE_URL}autocomplete?q=`;
  const EXACT_NAME_URL = `${BASE_URL}named?exact=`;
  const DEBOUNCE_DELAY = 200;

  const getSuggestions = useCallback(
    async (value: string) => {
      try {
        const response = await axios.get(`${AUTO_COMPLETE_URL}${value}`);
        setSuggestions(response.data.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    },
    [AUTO_COMPLETE_URL]
  );

  useEffect(() => {
    const regex = /[^a-zA-Z0-9' -]/;
    const timer = setTimeout(() => {
      if (searchValue.trim().length > 1 && !regex.test(searchValue)) {
        getSuggestions(searchValue);
      }
    }, DEBOUNCE_DELAY);
    return () => {
      clearTimeout(timer);
    };
  }, [getSuggestions, searchValue]);

  const addSearchCard = async (searchCardName: string) => {
    const response = await axios.get(`${EXACT_NAME_URL}${searchCardName}`);
    const searchCard: Card = response.data;
    setSelectedSearchCard(searchCard);
  };

  return {
    suggestions,
    searchValue,
    setSearchValue,
    addSearchCard,
  };
}
