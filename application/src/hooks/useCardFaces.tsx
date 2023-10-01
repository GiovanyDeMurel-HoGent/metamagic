import { Card } from "metamagic-types";
import { useState, useRef, useEffect } from "react";

export default function useCardFaces(card:Card) {
  const [isReversible, setIsReversible] = useState<boolean>();
  const [displayedCard, setDisplayedCard] = useState<Card | null>();
  const [isFrontFace, setIsFrontFace] = useState<boolean>();
  const frontFace = useRef<Card>();
  const backFace = useRef<Card>();

  const image_uri = displayedCard?.image_uris?.json
    ? displayedCard?.image_uris?.json.normal
    : displayedCard?.image_uris?.normal;

  useEffect(() => {
    const reversible = card.layout === "transform"
    if (!reversible) {
      setDisplayedCard(card);
      setIsFrontFace(true)
      setIsReversible(false);
    } else {
      if (reversible) {
        const front = {
          ...card,
          artist: card.card_faces[0].artist,
          artist_id: card.card_faces[0].artist_id,
          mana_cost: card.card_faces[0].mana_cost,
          name: card.card_faces[0].name,
          object: card.card_faces[0].object,
          oracle_text: card.card_faces[0].oracle_text,
          power: card.card_faces[0].power,
          toughness: card.card_faces[0].toughness,
          type_line: card.card_faces[0].type_line,
          image_uris: card.card_faces[0].image_uris,
        };
        const back = {
          ...card,
          artist: card.card_faces[1].artist,
          artist_id: card.card_faces[1].artist_id,
          mana_cost: card.card_faces[1].mana_cost,
          name: card.card_faces[1].name,
          object: card.card_faces[1].object,
          oracle_text: card.card_faces[1].oracle_text,
          power: card.card_faces[1].power,
          toughness: card.card_faces[1].toughness,
          type_line: card.card_faces[0].type_line,
          image_uris: card.card_faces[1].image_uris,
        };
        frontFace.current = front;
        backFace.current = back;
        setDisplayedCard(front);
        setIsFrontFace(true)
        setIsReversible(true);
        }
    }
  }, [card, isReversible]);

  const handleReverse = () => {
    if (isReversible) {
      if (isFrontFace) {
        setDisplayedCard(backFace.current);
        setIsFrontFace(false)
      } else {
        setDisplayedCard(frontFace.current);
        setIsFrontFace(true)
      }
    }
  };
  return {
    image_uri,
    isReversible,
    handleReverse
  };
}
