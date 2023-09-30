const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



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

  async function getCardsForDeck(deck_id) {
    try {
      const deckCards = await prisma.deckCard.findMany({
        where: {
          deck_id: deck_id,
        },
      });
  
      const cardIdsWithAmount = deckCards.map((deckCard) => ({
        id: deckCard.card_id,
        amount: deckCard.amount,
      }));
  
      const cardsForDeck = await prisma.card.findMany({
        where: {
          id: {
            in: cardIdsWithAmount.map((card) => card.id),
          },
        },
      });
  
      const cardsWithAmount = cardsForDeck.map((card) => {
        const matchingCard = cardIdsWithAmount.find((c) => c.id === card.id);
        return {
          ...card,
          amount: matchingCard ? matchingCard.amount : 0,
        };
      });
  
      return cardsWithAmount;
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
