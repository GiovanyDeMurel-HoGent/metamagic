import axios from "axios";
import { Card } from "metamagic-types";
import { useEffect, useState } from "react";

//TODO: hook up to own database to fetch suggestions instead of scryfall
export default function CardSearch({
  setSelectedSearchCard,
}: {
  setSelectedSearchCard: (card: Card | null) => void;
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const API_URL = "https://api.scryfall.com/cards/autocomplete?q=";
  const DEBOUNCE_DELAY = 100;

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
  }, [searchValue]);

  const getSuggestions = async (value: string) => {
    try {
      const response = await axios.get(`${API_URL}${value}`);
      setSuggestions(response.data.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClick = async (searchCardName: string) => {
    const response = await axios.get(
      `https://api.scryfall.com/cards/named?exact=${searchCardName}`
    );
    const searchCard: Card = response.data;
    setSelectedSearchCard(searchCard);
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
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
  );
}
