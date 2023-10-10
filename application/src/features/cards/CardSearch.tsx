import { Card } from "metamagic-types";
import useCardSearch from "../../hooks/useCardSearch";

interface CardSearchProps {
  cards: Array<Card> | null;
  selectedSearchCard: Card | null;
  setSelectedSearchCard: (card: Card | null) => void;
  addCard: (card: Card | null) => void;
}
export default function CardSearch({
  cards,
  selectedSearchCard,
  setSelectedSearchCard,
  addCard,
}: CardSearchProps) {
  const { suggestions, searchValue, setSearchValue, addSearchCard } =
    useCardSearch(setSelectedSearchCard);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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

        <ul style={{listStyle:"none"}}>
          {searchValue.trim().length > 1 &&
            suggestions.map((suggestion) => (
              <li
                key={`${suggestion}`}
                onClick={() => addSearchCard(suggestion)}
              >
                {suggestion}
              </li>
            ))}
        </ul>
      </form>
      {selectedSearchCard && (
        <button
          onClick={() => addCard(selectedSearchCard)}
          disabled={
            cards?.find((card) => selectedSearchCard.id === card.id)
              ? true
              : false
          }
        >
          add
        </button>
      )}
    </>
  );
}
