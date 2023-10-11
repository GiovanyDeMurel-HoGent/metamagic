import useCardSearch from "../../hooks/useCardSearch";
import { useContext } from "react";
import { DeckContext } from "../decks/context/DeckContext";
import useCardsUpdate from "../../hooks/useCardsUpdate";

export default function CardSearch() {
  const { suggestions,
    searchValue, 
     setSearchValue, 
    addSearchCard 
    } =
    useCardSearch();
    const {  cards,
      selectedSearchCard,
      } = useContext(DeckContext)!
      const {addCard} = useCardsUpdate()

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
