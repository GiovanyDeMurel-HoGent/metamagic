const express = require('express');
const router = express.Router();
const deckController = require('../controllers/deckController');

const { getAllDecks, getDeckById, getCardsForDeck, getDecksByUserId } = deckController;

router.get('/api/decks', getAllDecks);

router.get('/api/decks/:deck_id', getDeckById);

router.get('/api/decks/user/:user_id', getDecksByUserId);

router.get('/api/decks/:deck_id/cards', async (req, res) => {
  const { deck_id } = req.params;

  try {
    const cardsForDeck = await getCardsForDeck(deck_id);
    res.json(cardsForDeck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
