const axios = require('axios')
const { PrismaClient } = require('@prisma/client');
const varina = require('./sample_decks/varina_lich_queen')
const massacre = require('./sample_decks/massacre_girl')
const atraxa = require('./sample_decks/atraxa_praetors_voice')
const akroma = require('./sample_decks/akroma_angel_of_fury')

const prisma = new PrismaClient();

const bulkOracleCardsURI = 'https://data.scryfall.io/oracle-cards/oracle-cards-20230926090140.json'



async function main() {

  try {
    const bulk_data = await getBulkOracleCards();
    const sampleDecksData = [varina, massacre, atraxa, akroma]
    const sampleDecksPromises = sampleDecksData.map(async (deck) => {
      return buildSampleDeck(deck.deckdetails, deck.decklist)
    });
    const sampleDecks = await Promise.all(sampleDecksPromises)
    await seedOracleCards(bulk_data)
    await seedDecks(sampleDecks)

  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

async function getBulkOracleCards() {
  try{
  const response = await axios.get(bulkOracleCardsURI)
  return response.data
  } catch (error) {
      console.error('Error downloading and storing Bulk oracle cards JSON data:', error.message)
      throw error
  }
}

async function seedOracleCards(jsonData) {
  try {
    const batchSize = 100;
    const totalCards = jsonData.length;
    let insertedCards = 0;

    for (let i = 0; i < totalCards; i += batchSize) {
      const batch = jsonData.slice(i, i + batchSize);
      await prisma.card.createMany({
        data: batch.map((card) => ({
          object: card.object,
          id: card.id,
          oracle_id: card.oracle_id,
          multiverse_ids: { json: card.multiverse_ids },
          mtgo_id: card.mtgo_id,
          mtgo_foil_id: card.mtgo_foil_id,
          tcgplayer_id: card.tcgplayer_id,
          cardmarket_id: card.cardmarket_id,
          name: card.name,
          lang: card.lang,
          released_at: new Date(card.released_at),
          uri: card.uri,
          scryfall_uri: card.scryfall_uri,
          layout: card.layout,
          highres_image: card.highres_image,
          image_status: card.image_status,
          image_uris: { json: card.image_uris },
          mana_cost: card.mana_cost,
          cmc: card.cmc,
          type_line: card.type_line,
          oracle_text: card.oracle_text,
          colors: { json: card.colors },
          color_identity: { json: card.color_identity },
          keywords: { json: card.keywords },
          card_faces: { json: card.card_faces },
          legalities: { json: card.legalities },
          games: { json: card.games },
          reserved: card.reserved,
          foil: card.foil,
          nonfoil: card.nonfoil,
          finishes: { json: card.finishes },
          oversized: card.oversized,
          promo: card.promo,
          reprint: card.reprint,
          variation: card.variation,
          set_id: card.set_id,
          set_name: card.set_name,
          set_type: card.set_type,
          set_uri: card.set_uri,
          set_search_uri: card.set_search_uri,
          scryfall_set_uri: card.scryfall_set_uri,
          rulings_uri: card.rulings_uri,
          prints_search_uri: card.prints_search_uri,
          collector_number: card.collector_number,
          digital: card.digital,
          rarity: card.rarity,
          flavor_text: card.flavor_text,
          card_back_id: card.card_back_id,
          artist: card.artist,
          artist_ids: { json: card.artist_ids },
          illustration_id: card.illustration_id,
          border_color: card.border_color,
          frame: card.frame,
          full_art: card.full_art,
          textless: card.textless,
          booster: card.booster,
          story_spotlight: card.story_spotlight,
          edhrec_rank: card.edhrec_rank,
          prices: { json: card.prices },
          related_uris: { json: card.related_uris },
          purchase_uris: { json: card.purchase_uris },
          
        })),
        skipDuplicates: true
      })
      //   Reset: \x1b[0m (Resets text color to the default)
      //   Red: \x1b[31m
      //   Green: \x1b[32m
      //   Yellow: \x1b[33m
      //   Blue: \x1b[34m
      //   Magenta: \x1b[35m
      //   Cyan: \x1b[36m
      //   White: \x1b[37m
      const progress = ((i + batchSize) / totalCards) * 100;
      insertedCards += batch.length;
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`Inserted: \x1b[32m${insertedCards}\x1b[0m out of \x1b[33m${totalCards}\x1b[0m cards. Progress: \x1b[36m${progress.toFixed(0)}%\x1b[0m`);
    }

  } catch (error) {
    throw error;
  }
}


async function seedDecks(deckData) {
  try {
    const deckPromises = deckData.map(async (deck) => {
      const existingDeck = await prisma.deck.findUnique({
        where: { id: deck.id },
      });

      if (existingDeck) {
        const updatedDeck = await prisma.deck.update({
          where: { id: deck.id },
          data: {
            name: deck.name,
            description: deck.description,
            legal: deck.legal,
          },
        });

        await prisma.deckCard.deleteMany({
          where: { deck_id: updatedDeck.id },
        });

        const deckCardPromises = deck.cards.map((card) => {
          return prisma.deckCard.create({
            data: {
              deck_id: updatedDeck.id,
              card_id: card.card_id,
              amount: card.amount,
            },
          });
        });

        await Promise.all(deckCardPromises);
        
        return updatedDeck;
      } else {
        const newDeck = await prisma.deck.create({
          data: {
            id: deck.id,
            user_id: deck.user_id,
            name: deck.name,
            description: deck.description,
            legal: deck.legal,
          },
        });

        const deckCardPromises = deck.cards.map((card) => {
          return prisma.deckCard.create({
            data: {
              deck_id: newDeck.id,
              card_id: card.card_id,
              amount: card.amount,
            },
          });
        });

        await Promise.all(deckCardPromises);

        return newDeck;
      }
    });

    const createdOrUpdatedDecks = await Promise.all(deckPromises);

    return createdOrUpdatedDecks;
  } catch (error) {
    throw error;
  }
}

async function parseDeckString(deckString, deckId) {
  try {
    const lines = deckString.split('\n');
    const deckObjects = [];

    for (const line of lines) {
      const parts = line.trim().split(/\s+/);

      if (parts.length >= 2) {
        const amount = parseInt(parts[0], 10);
        const name = parts.slice(1).join(' ');

        const card = await getCardIdByName(name);

        if (card && card.id) {
          deckObjects.push({ deck_id: deckId, card_id: card.id, amount });
        } else {
          console.log(`Card not found for: ${name}`);
        }
      }
    }
    return deckObjects;
  } catch (error) {
    throw error;
  }
}

async function getCardIdByName(cardName) {
  const card = await prisma.card.findFirst({
    where: { name: cardName },
    select: { id: true },
  });
  return card;
}

async function buildSampleDeck(deckdetails, decklist) {
  const cards = await parseDeckString(decklist, deckdetails.id)
  return { 
    ...deckdetails, cards: cards
  }
}

    
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
