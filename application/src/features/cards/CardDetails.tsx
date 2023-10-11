import { useContext } from "react";
import { DeckContext } from "../decks/context/DeckContext";

export default function CardDisplay() {
    const {displayCardDetails} = useContext(DeckContext)!
    return (
    <>
    {displayCardDetails && 
      <div>
        <h2>Card Details</h2>
        <p><strong>Object:</strong> {displayCardDetails.object || 'N/A'}</p>
        <p><strong>ID:</strong> {displayCardDetails.id || 'N/A'}</p>
        <p><strong>Oracle ID:</strong> {displayCardDetails.oracle_id || 'N/A'}</p>
        <p><strong>Multiverse IDs:</strong> {displayCardDetails.multiverse_ids ? JSON.stringify(displayCardDetails.multiverse_ids) : 'N/A'}</p>
        <p><strong>MTGO ID:</strong> {displayCardDetails.mtgo_id || 'N/A'}</p>
        <p><strong>MTGO Foil ID:</strong> {displayCardDetails.mtgo_foil_id || 'N/A'}</p>
        <p><strong>TCGPlayer ID:</strong> {displayCardDetails.tcgplayer_id || 'N/A'}</p>
        <p><strong>Cardmarket ID:</strong> {displayCardDetails.cardmarket_id || 'N/A'}</p>
        <p><strong>Name:</strong> {displayCardDetails.name || 'N/A'}</p>
        <p><strong>Language:</strong> {displayCardDetails.lang || 'N/A'}</p>
        <p><strong>Released At:</strong> {displayCardDetails.released_at ? new Date(displayCardDetails.released_at).toLocaleDateString() : 'N/A'}</p>
        <p><strong>URI:</strong> {displayCardDetails.uri || 'N/A'}</p>
        <p><strong>Scryfall URI:</strong> {displayCardDetails.scryfall_uri || 'N/A'}</p>
        <p><strong>Layout:</strong> {displayCardDetails.layout || 'N/A'}</p>
        <p><strong>Highres Image:</strong> {displayCardDetails.highres_image ? 'Yes' : 'No'}</p>
        <p><strong>Image Status:</strong> {displayCardDetails.image_status || 'N/A'}</p>
        <p><strong>Mana Cost:</strong> {displayCardDetails.mana_cost || 'N/A'}</p>
        <p><strong>CMC:</strong> {displayCardDetails.cmc || 'N/A'}</p>
        <p><strong>Type Line:</strong> {displayCardDetails.type_line || 'N/A'}</p>
        <p><strong>Oracle Text:</strong> {displayCardDetails.oracle_text || 'N/A'}</p>
        <p><strong>Colors:</strong> {displayCardDetails.colors ? JSON.stringify(displayCardDetails.colors) : 'N/A'}</p>
        <p><strong>Color Identity:</strong> {displayCardDetails.color_identity ? JSON.stringify(displayCardDetails.color_identity) : 'N/A'}</p>
        <p><strong>displayCardDetails Faces:</strong> {displayCardDetails.card_faces ? JSON.stringify(displayCardDetails.card_faces) : 'N/A'}</p>
        <p><strong>Keywords:</strong> {displayCardDetails.keywords ? JSON.stringify(displayCardDetails.keywords) : 'N/A'}</p>
        <p><strong>Legalities:</strong> {displayCardDetails.legalities ? JSON.stringify(displayCardDetails.legalities) : 'N/A'}</p>
        <p><strong>Games:</strong> {displayCardDetails.games ? JSON.stringify(displayCardDetails.games) : 'N/A'}</p>
        <p><strong>Reserved:</strong> {displayCardDetails.reserved ? 'Yes' : 'No'}</p>
        <p><strong>Foil:</strong> {displayCardDetails.foil ? 'Yes' : 'No'}</p>
        <p><strong>Nonfoil:</strong> {displayCardDetails.nonfoil ? 'Yes' : 'No'}</p>
        <p><strong>Finishes:</strong> {displayCardDetails.finishes ? JSON.stringify(displayCardDetails.finishes) : 'N/A'}</p>
        <p><strong>Oversized:</strong> {displayCardDetails.oversized ? 'Yes' : 'No'}</p>
        <p><strong>Promo:</strong> {displayCardDetails.promo ? 'Yes' : 'No'}</p>
        <p><strong>Reprint:</strong> {displayCardDetails.reprint ? 'Yes' : 'No'}</p>
        <p><strong>Variation:</strong> {displayCardDetails.variation ? 'Yes' : 'No'}</p>
        <p><strong>Set ID:</strong> {displayCardDetails.set_id || 'N/A'}</p>
        <p><strong>Set Name:</strong> {displayCardDetails.set_name || 'N/A'}</p>
        <p><strong>Set Type:</strong> {displayCardDetails.set_type || 'N/A'}</p>
        <p><strong>Set URI:</strong> {displayCardDetails.set_uri || 'N/A'}</p>
        <p><strong>Set Search URI:</strong> {displayCardDetails.set_search_uri || 'N/A'}</p>
        <p><strong>Scryfall Set URI:</strong> {displayCardDetails.scryfall_set_uri || 'N/A'}</p>
        <p><strong>Rulings URI:</strong> {displayCardDetails.rulings_uri || 'N/A'}</p>
        <p><strong>Prints Search URI:</strong> {displayCardDetails.prints_search_uri ? JSON.stringify(displayCardDetails.prints_search_uri) : 'N/A'}</p>
        <p><strong>Collector Number:</strong> {displayCardDetails.collector_number || 'N/A'}</p>
        <p><strong>Digital:</strong> {displayCardDetails.digital ? 'Yes' : 'No'}</p>
        <p><strong>Rarity:</strong> {displayCardDetails.rarity || 'N/A'}</p>
        <p><strong>Flavor Text:</strong> {displayCardDetails.flavor_text || 'N/A'}</p>
        <p><strong>displayCardDetails Back ID:</strong> {displayCardDetails.card_back_id || 'N/A'}</p>
        <p><strong>Artist:</strong> {displayCardDetails.artist || 'N/A'}</p>
        <p><strong>Artist IDs:</strong> {displayCardDetails.artist_ids ? JSON.stringify(displayCardDetails.artist_ids) : 'N/A'}</p>
        <p><strong>Illustration ID:</strong> {displayCardDetails.illustration_id || 'N/A'}</p>
        <p><strong>Border Color:</strong> {displayCardDetails.border_color || 'N/A'}</p>
        <p><strong>Frame:</strong> {displayCardDetails.frame || 'N/A'}</p>
        <p><strong>Full Art:</strong> {displayCardDetails.full_art ? 'Yes' : 'No'}</p>
        <p><strong>Textless:</strong> {displayCardDetails.textless ? 'Yes' : 'No'}</p>
        <p><strong>Booster:</strong> {displayCardDetails.booster ? 'Yes' : 'No'}</p>
        <p><strong>Story Spotlight:</strong> {displayCardDetails.story_spotlight ? 'Yes' : 'No'}</p>
        <p><strong>EDHREC Rank:</strong> {displayCardDetails.edhrec_rank || 'N/A'}</p>
        <p><strong>Prices:</strong> {displayCardDetails.prices ? JSON.stringify(displayCardDetails.prices) : 'N/A'}</p>
        <p><strong>Related URIs:</strong> {displayCardDetails.related_uris ? JSON.stringify(displayCardDetails.related_uris) : 'N/A'}</p>
        <p><strong>Purchase URIs:</strong> {displayCardDetails.purchase_uris ? JSON.stringify(displayCardDetails.purchase_uris) : 'N/A'}</p>
        <p><strong>Amount:</strong> {displayCardDetails.amount || 'N/A'}</p>
      </div>
    }
    </>
  );
}
