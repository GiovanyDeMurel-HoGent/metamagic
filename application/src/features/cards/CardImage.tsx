import { Card } from "metamagic-types";

export default function CardImage(card:Card) {

  
  return (
    <img src={card.image_uris?.json.normal} 
        alt={card.name as string}
        style={{ width: "280px", height: "auto", margin: "auto"}}
        />
  )
}
