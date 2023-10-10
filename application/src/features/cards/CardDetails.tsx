import { Card } from "metamagic-types";

interface CardDisplayProps {
    card: Card; // Pass a card object as a prop
  }
  
  export default function CardDisplay({card}:CardDisplayProps) {
    return (
        <>
    {card && 
      <div>
       <h2>Card Information</h2>
      <p><strong>Object:</strong> {card.object || 'N/A'}</p>
      <p><strong>ID:</strong> {card.id || 'N/A'}</p>
      <p><strong>Oracle ID:</strong> {card.oracle_id || 'N/A'}</p>
      <p><strong>Multiverse IDs:</strong> {card.multiverse_ids ? JSON.stringify(card.multiverse_ids) : 'N/A'}</p>
      <p><strong>MTGO ID:</strong> {card.mtgo_id || 'N/A'}</p>
      <p><strong>MTGO Foil ID:</strong> {card.mtgo_foil_id || 'N/A'}</p>
      <p><strong>TCGPlayer ID:</strong> {card.tcgplayer_id || 'N/A'}</p>
      <p><strong>Cardmarket ID:</strong> {card.cardmarket_id || 'N/A'}</p>
      <p><strong>Name:</strong> {card.name || 'N/A'}</p>
      <p><strong>Language:</strong> {card.lang || 'N/A'}</p>
      <p><strong>Released At:</strong> {card.released_at ? new Date(card.released_at).toLocaleDateString() : 'N/A'}</p>
      <p><strong>URI:</strong> {card.uri || 'N/A'}</p>
      <p><strong>Scryfall URI:</strong> {card.scryfall_uri || 'N/A'}</p>
      <p><strong>Layout:</strong> {card.layout || 'N/A'}</p>
      <p><strong>Highres Image:</strong> {card.highres_image ? 'Yes' : 'No'}</p>
      <p><strong>Image Status:</strong> {card.image_status || 'N/A'}</p>
      <p><strong>Mana Cost:</strong> {card.mana_cost || 'N/A'}</p>
      <p><strong>CMC:</strong> {card.cmc || 'N/A'}</p>
      <p><strong>Type Line:</strong> {card.type_line || 'N/A'}</p>
      <p><strong>Oracle Text:</strong> {card.oracle_text || 'N/A'}</p>
      <p><strong>Colors:</strong> {card.colors ? JSON.stringify(card.colors) : 'N/A'}</p>
      <p><strong>Color Identity:</strong> {card.color_identity ? JSON.stringify(card.color_identity) : 'N/A'}</p>
      <p><strong>Card Faces:</strong> {card.card_faces ? JSON.stringify(card.card_faces) : 'N/A'}</p>
      <p><strong>Keywords:</strong> {card.keywords ? JSON.stringify(card.keywords) : 'N/A'}</p>
      <p><strong>Legalities:</strong> {card.legalities ? JSON.stringify(card.legalities) : 'N/A'}</p>
      <p><strong>Games:</strong> {card.games ? JSON.stringify(card.games) : 'N/A'}</p>
      <p><strong>Reserved:</strong> {card.reserved ? 'Yes' : 'No'}</p>
      <p><strong>Foil:</strong> {card.foil ? 'Yes' : 'No'}</p>
      <p><strong>Nonfoil:</strong> {card.nonfoil ? 'Yes' : 'No'}</p>
      <p><strong>Finishes:</strong> {card.finishes ? JSON.stringify(card.finishes) : 'N/A'}</p>
      <p><strong>Oversized:</strong> {card.oversized ? 'Yes' : 'No'}</p>
      <p><strong>Promo:</strong> {card.promo ? 'Yes' : 'No'}</p>
      <p><strong>Reprint:</strong> {card.reprint ? 'Yes' : 'No'}</p>
      <p><strong>Variation:</strong> {card.variation ? 'Yes' : 'No'}</p>
      <p><strong>Set ID:</strong> {card.set_id || 'N/A'}</p>
      <p><strong>Set Name:</strong> {card.set_name || 'N/A'}</p>
      <p><strong>Set Type:</strong> {card.set_type || 'N/A'}</p>
      <p><strong>Set URI:</strong> {card.set_uri || 'N/A'}</p>
      <p><strong>Set Search URI:</strong> {card.set_search_uri || 'N/A'}</p>
      <p><strong>Scryfall Set URI:</strong> {card.scryfall_set_uri || 'N/A'}</p>
      <p><strong>Rulings URI:</strong> {card.rulings_uri || 'N/A'}</p>
      <p><strong>Prints Search URI:</strong> {card.prints_search_uri ? JSON.stringify(card.prints_search_uri) : 'N/A'}</p>
      <p><strong>Collector Number:</strong> {card.collector_number || 'N/A'}</p>
      <p><strong>Digital:</strong> {card.digital ? 'Yes' : 'No'}</p>
      <p><strong>Rarity:</strong> {card.rarity || 'N/A'}</p>
      <p><strong>Flavor Text:</strong> {card.flavor_text || 'N/A'}</p>
      <p><strong>Card Back ID:</strong> {card.card_back_id || 'N/A'}</p>
      <p><strong>Artist:</strong> {card.artist || 'N/A'}</p>
      <p><strong>Artist IDs:</strong> {card.artist_ids ? JSON.stringify(card.artist_ids) : 'N/A'}</p>
      <p><strong>Illustration ID:</strong> {card.illustration_id || 'N/A'}</p>
      <p><strong>Border Color:</strong> {card.border_color || 'N/A'}</p>
      <p><strong>Frame:</strong> {card.frame || 'N/A'}</p>
      <p><strong>Full Art:</strong> {card.full_art ? 'Yes' : 'No'}</p>
      <p><strong>Textless:</strong> {card.textless ? 'Yes' : 'No'}</p>
      <p><strong>Booster:</strong> {card.booster ? 'Yes' : 'No'}</p>
      <p><strong>Story Spotlight:</strong> {card.story_spotlight ? 'Yes' : 'No'}</p>
      <p><strong>EDHREC Rank:</strong> {card.edhrec_rank || 'N/A'}</p>
      <p><strong>Prices:</strong> {card.prices ? JSON.stringify(card.prices) : 'N/A'}</p>
      <p><strong>Related URIs:</strong> {card.related_uris ? JSON.stringify(card.related_uris) : 'N/A'}</p>
      <p><strong>Purchase URIs:</strong> {card.purchase_uris ? JSON.stringify(card.purchase_uris) : 'N/A'}</p>
      <p><strong>Amount:</strong> {card.amount || 'N/A'}</p>
    </div>
        }
        </>
    );
  }
