import { Card } from "metamagic-types";

export default function CardImage(card:Card) {
  const image_uri = card.image_uris?.json ? card.image_uris?.json.normal : card.image_uris?.normal
  
  return (
    <img src={image_uri} 
        alt={card.name as string}
        style={{ width: "280px", height: "auto", margin: "auto"}}
        />
  )
}
