import axios from "axios";
import { Card } from "metamagic-types";
import { useCallback, useEffect, useState } from "react";

interface CardSearchProps {
  cards: Array<Card>,
  selectedSearchCard: Card | null;
  setSelectedSearchCard: (card: Card | null) => void;
  addCard: (card: Card | null) => void;
}
//TODO: hook up to own database to fetch suggestions instead of scryfall
export default function CardSearch({
  cards,
  selectedSearchCard,
  setSelectedSearchCard,
  addCard,
}: CardSearchProps) {
  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const BASE_URL = "https://api.scryfall.com/cards/";
  const AUTO_COMPLETE_URL = `${BASE_URL}autocomplete?q=`;
  const EXACT_NAME_URL = `${BASE_URL}named?exact=`;
  const DEBOUNCE_DELAY = 100;

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClick = async (searchCardName: string) => {
    const response = await axios.get(`${EXACT_NAME_URL}${searchCardName}`);
    const searchCard: Card = response.data;
    setSelectedSearchCard(searchCard);
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          alt="Card search"
          placeholder="Search card by name"
          autoComplete="off"
          onChange={handleInputChange}
          value={searchValue}
        />

        <ul>
          {searchValue.trim().length > 1 &&
            suggestions.map((suggestion) => (
              <li key={`${suggestion}`} onClick={() => handleClick(suggestion)}>
                {suggestion}
              </li>
            ))}
        </ul>
      </form>
      { selectedSearchCard &&
      <button onClick={() => addCard(selectedSearchCard)}
      disabled={cards.find((card)=>selectedSearchCard.id === card.id)? true : false}
      >add</button>
    }
    </>
  );
}
