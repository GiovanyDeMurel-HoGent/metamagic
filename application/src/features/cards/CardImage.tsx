import { Card } from "metamagic-types";
import useCardFaces from "../../hooks/useCardFaces";

export default function CardImage({
  card, displayCardDetails, setDisplayCardDetails
}:{
  card:Card, displayCardDetails:Card|null,setDisplayCardDetails: (card:Card|null) => void
}) {
  const {image_uri, isReversible, handleReverse} = useCardFaces(card)

  const handleSetDisplayCardDetails = () => {
    if (displayCardDetails === null){
      setDisplayCardDetails(card)
    }
    else {setDisplayCardDetails(null)}
  }
  return (
    <>
      <div style={{ width: "100%" }}>
        <img
          src={image_uri}
          alt={card.name as string}
          style={{ width: "200px", height: "auto" }}
        />
      </div>
      {isReversible && <button onClick={handleReverse}>flip</button>}
      <button onClick={handleSetDisplayCardDetails}>details</button>
    </>
  );
}
