const express = require('express');
const router = express.Router();
const deckController = require('../controllers/deckController');
const { axios } = require('axios');

const { getAllDecks, getDeckById, getCardsForDeck, getDecksByUserId, updateDeck } = deckController;

/**
 * @swagger
 * /api/decks:
 *   get:
 *     tags: 
 *       - Decks
 *     summary: Get all decks.
 *     description: Retrieve a list of all decks.
 *     responses:
 *       200:
 *         description: A list of decks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deck'
 */
router.get('/api/decks', getAllDecks);

/**
 * @swagger
 * /api/decks/{deck_id}:
 *   get:
 *     tags: 
 *       - Decks
 *     summary: Get a deck by ID.
 *     description: Retrieve a deck by its unique ID.
 *     parameters:
 *       - in: path
 *         name: deck_id
 *         required: true
 *         description: The ID of the deck to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A deck object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deck'
 *       404:
 *         description: Deck not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/decks/:deck_id', getDeckById);
/**
 * @swagger
 * /api/decks/user/{user_id}:
 *   get:
 *     tags: 
 *       - Decks
 *     summary: Get decks by user ID.
 *     description: Retrieve decks associated with a user by their user ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: The user ID to filter decks.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An array of deck objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deck'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/decks/user/:user_id', getDecksByUserId);

/**
 * @swagger
 * /api/decks/{deck_id}/cards:
 *   get:
 *     tags: 
 *       - Decks
 *     summary: Get cards for a deck by deck ID.
 *     description: Retrieve cards associated with a deck by its deck ID.
 *     parameters:
 *       - in: path
 *         name: deck_id
 *         required: true
 *         description: The ID of the deck to retrieve cards for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An array of card objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *       404:
 *         description: Deck not found.
 *       500:
 *         description: Internal server error.
 */
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

router.put("/api/decks/:deck_id", async (req, res) => {
  const { deck_id } = req.params;
  const deck  = req.body; // Destructure the 'deck' property from req.body
  try {
    await updateDeck(deck, deck_id); // Pass 'deck' and 'deck_id' to your updateDeck function
    res.status(200).json({ message: 'Deck updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
