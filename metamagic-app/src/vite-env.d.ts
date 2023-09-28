/// <reference types="vite/client" />

declare module 'metamagic-types' {
    export interface Deck {
        id: string;
        user_id: string;
        commander: Record<string> | null
        name: string;
        description: string | null;
        created_at: Date | null;
        updated_at: Date | null;
        legal: boolean;
        cards?: Card[];
    }

    export interface Card {
        object: string;
        id: string;
        oracle_id: string | null;
        multiverse_ids: number[] | null;
        mtgo_id: number | null;
        mtgo_foil_id: number | null;
        tcgplayer_id: number | null;
        cardmarket_id: number | null;
        name: string | null;
        lang: string | null;
        released_at: Date | null;
        uri: string | null;
        scryfall_uri: string | null;
        layout: string | null;
        highres_image: boolean | null;
        image_status: string | null;
        image_uris: Record<string, string> | null;
        mana_cost: string | null;
        cmc: number | null;
        type_line: string | null;
        oracle_text: string | null;
        colors: string[] | null;
        color_identity: string[] | null;
        card_faces: Record<string, unknown> | null;
        keywords: string[] | null;
        legalities: Record<string, unknown> | null;
        games: string[] | null;
        reserved: boolean | null;
        foil: boolean | null;
        nonfoil: boolean | null;
        finishes: Record<string, unknown> | null;
        oversized: boolean | null;
        promo: boolean | null;
        reprint: boolean | null;
        variation: boolean | null;
        set_id: string | null;
        set_name: string | null;
        set_type: string | null;
        set_uri: string | null;
        set_search_uri: string | null;
        scryfall_set_uri: string | null;
        rulings_uri: string | null;
        prints_search_uri: Record<string, string> | null;
        collector_number: string | null;
        digital: boolean | null;
        rarity: string | null;
        flavor_text: string | null;
        card_back_id: string | null;
        artist: string | null;
        artist_ids: Record<string, unknown> | null;
        illustration_id: string | null;
        border_color: string | null;
        frame: string | null;
        full_art: boolean | null;
        textless: boolean | null;
        booster: boolean | null;
        story_spotlight: boolean | null;
        edhrec_rank: number | null;
        prices: Record<string, unknown> | null;
        related_uris: Record<string, unknown> | null;
        purchase_uris: Record<string, unknown> | null; 
    }

    interface DeckCard {
        deck_id: string;
        card_id: string;
        amount: number;
        deck: Deck;
        card: Card;
    }
}