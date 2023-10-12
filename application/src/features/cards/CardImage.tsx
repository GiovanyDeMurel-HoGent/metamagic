import { Card } from "metamagic-types";
import useCardFaces from "../../hooks/useCardFaces";
import { useContext } from "react";
import { DeckContext } from "../decks/context/DeckContext";

export default function CardImage({card}:{card:Card}) {
  const {displayCardDetails, setDisplayCardDetails} = useContext(DeckContext)!
  const {image_uri, isReversible, handleReverse} = useCardFaces(card)

  const handleSetDisplayCardDetails = () => {
    if (displayCardDetails === null){
      setDisplayCardDetails(card)
    }
    else {setDisplayCardDetails(null)}
  }
  return (
    <>
      <div className="flex justify-center">
        <img className="w-[50%]"
          src={image_uri}
          alt={card.name as string}
          
        />
      </div>
      {isReversible && <button className="pr-2 pl-2 mr-2 w-16 h-8 bg-green-300" onClick={handleReverse}>flip</button>}
      <button className="pr-2 pl-2 w-16 h-8 ml-2 bg-green-300" onClick={handleSetDisplayCardDetails}>details</button>
    </>
  );
}
