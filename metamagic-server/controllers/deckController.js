const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controller function to get all decks
async function getAllDecks(req, res) {
  try {
    const decks = await prisma.deck.findMany();
    res.json(decks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getDeckById(req, res) {
    const { deck_id } = req.params;
  
    try {
      const deck = await prisma.deck.findUnique({
        where: {
          id: deck_id,
        },
      });
  
      if (!deck) {
        return res.status(404).json({ error: 'Deck not found' });
      }
  
      res.json(deck);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async function getDecksByUserId(req, res) {
    const { user_id } = req.params;
  
    try {
      const decks = await prisma.deck.findMany({
        where: {
          user_id: user_id,
        },
      });
  
      res.json(decks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

// Controller function to get all cards for a specific deck by deck_id
async function getCardsForDeck(deck_id) {
  try {
    const cardsForDeck = await prisma.card.findMany({
      where: {
        deckcards: {
          every: {
            deck_id: deck_id,
          },
        },
      },
    });

    return cardsForDeck;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching cards for the deck.');
  }
}

module.exports = {
  getAllDecks,
  getDeckById,
  getDecksByUserId,
  getCardsForDeck,
};
