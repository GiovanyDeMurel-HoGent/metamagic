import { Card } from "metamagic-types";
import useCardFaces from "../../hooks/useCardFaces";

export default function CardImage(card: Card) {
  const {image_uri, isReversible, handleReverse} = useCardFaces(card)

  return (
    <>
      <div style={{ width: "100%" }}>
        <img
          src={image_uri}
          alt={card.name as string}
          style={{ width: "100px", height: "auto" }}
        />
      </div>
      {isReversible && <button onClick={handleReverse}>flip</button>}
    </>
  );
}
