const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// Define the "Deck" schema based on your Prisma schema
const deckSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      user_id: { type: 'string' },
      commander: { type: 'object' }, // Update the properties as needed
      name: { type: 'string' },
      description: { type: 'string' },
      created_at: { type: 'string', format: 'date-time' },
      updated_at: { type: 'string', format: 'date-time' },
      legal: { type: 'boolean' },
      deckcard: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/DeckCard',
        },
      },
    },
  };

  const deckCardSchema = {
    type: 'object',
    properties: {
      deck_id: { type: 'string' },
      card_id: { type: 'string' },
      amount: { type: 'integer' },
      deck: { $ref: '#/components/schemas/Deck' },
      card: { $ref: '#/components/schemas/Card' },
    },
  };
  
  const cardSchema = {
    type: 'object',
    properties: {
      object: { type: 'string' },
      id: { type: 'string' },
      oracle_id: { type: 'string' },
      multiverse_ids: { type: 'object' },
      mtgo_id: { type: 'integer' },
      mtgo_foil_id: { type: 'integer' },
      tcgplayer_id: { type: 'integer' },
      cardmarket_id: { type: 'integer' },
      name: { type: 'string' },
      lang: { type: 'string' },
      released_at: { type: 'string', format: 'date-time' },
      uri: { type: 'string' },
      scryfall_uri: { type: 'string' },
      layout: { type: 'string' },
      highres_image: { type: 'boolean' },
      image_status: { type: 'string' },
      image_uris: { type: 'object' },
      mana_cost: { type: 'string' },
      cmc: { type: 'number' },
      type_line: { type: 'string' },
      oracle_text: { type: 'string' },
      colors: { type: 'object' },
      color_identity: { type: 'object' },
      card_faces: { type: 'object' },
      keywords: { type: 'object' },
      legalities: { type: 'object' },
      games: { type: 'object' },
      reserved: { type: 'boolean' },
      foil: { type: 'boolean' },
      nonfoil: { type: 'boolean' },
      finishes: { type: 'object' },
      oversized: { type: 'boolean' },
      promo: { type: 'boolean' },
      reprint: { type: 'boolean' },
      variation: { type: 'boolean' },
      set_id: { type: 'string' },
      set_name: { type: 'string' },
      set_type: { type: 'string' },
      set_uri: { type: 'string' },
      set_search_uri: { type: 'string' },
      scryfall_set_uri: { type: 'string' },
      rulings_uri: { type: 'string' },
      prints_search_uri: { type: 'object' },
      collector_number: { type: 'string' },
      digital: { type: 'boolean' },
      rarity: { type: 'string' },
      flavor_text: { type: 'string' },
      card_back_id: { type: 'string' },
      artist: { type: 'string' },
      artist_ids: { type: 'object' },
      illustration_id: { type: 'string' },
      border_color: { type: 'string' },
      frame: { type: 'string' },
      full_art: { type: 'boolean' },
      textless: { type: 'boolean' },
      booster: { type: 'boolean' },
      story_spotlight: { type: 'boolean' },
      edhrec_rank: { type: 'integer' },
      prices: { type: 'object' },
      related_uris: { type: 'object' },
      purchase_uris: { type: 'object' },
      deckcard: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/DeckCard',
        },
      },
    },
  };

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'MetaMagic',
        version: '1.0.0',
        description: 'Documentation for MetaMagic API',
      },
      components: {
        schemas: {
          Deck: deckSchema,
          DeckCard: deckCardSchema,
          Card: cardSchema,
        },
      },
    },
    apis: ['./routes/*.js'], // Specify the path to your route files
  };

const swaggerSpec = swaggerJsdoc(swaggerOptions);

  


module.exports = {
  serveSwaggerUI: swaggerUi.serve,
  setupSwaggerUI: swaggerUi.setup(swaggerSpec),
};