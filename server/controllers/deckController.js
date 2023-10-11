const { PrismaClient } = require("@prisma/client");
const { mapCards } = require("../util/cardsMapper");
const prisma = new PrismaClient();

async function getAllDecks(req, res) {
  try {
    const decks = await prisma.deck.findMany();
    res.json(decks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
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
      return res.status(404).json({ error: "Deck not found" });
    }

    res.json(deck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
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
    res.status(500).json({ error: "Internal server error" });
  }
}

// async function getCardsForDeck(deck_id) {
//   try {
//     const deckCards = await prisma.deckCard.findMany({
//       where: {
//         deck_id: deck_id,
//       },
//     });

//     const cardIdsWithAmount = deckCards.map((deckCard) => ({
//       id: deckCard.card_id,
//       amount: deckCard.amount,
//     }));

//     const cardsForDeck = await prisma.card.findMany({
//       where: {
//         id: {
//           in: cardIdsWithAmount.map((card) => card.id),
//         },
//       },
//     });

//     const cardsWithAmount = cardsForDeck.map((card) => {
//       const matchingCard = cardIdsWithAmount.find((c) => c.id === card.id);
//       return {
//         ...card,
//         amount: matchingCard ? matchingCard.amount : 0,
//       };
//     });

//     return cardsWithAmount;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error fetching cards for the deck.");
//   }
// }
async function getCardsForDeck(deck_id) {
  try {
    const deckCards = await prisma.deckCard.findMany({
      where: {
        deck_id: deck_id,
      },
      select: {
        amount: true,
        card: true,
        // replace with below if only want to select certain properties.
        // for example if getting every card property via separate api call later
        // card: {
        //   select: {
        //     // Select the card properties you need
        //     id: true,
        //     // Add other properties you need here
        //   },
        // },
      },
    });

    const cardsWithAmount = deckCards.map((deckCard) => ({
      ...deckCard.card,
      amount: deckCard.amount,
    }));
      //remove annoying postgres extra "json" properties
    const mappedCards = mapCards(cardsWithAmount)
    return mappedCards;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching cards for the deck.");
  }
}

async function updateDeck(deck) {
  const cards = deck.cards;
  const deck_id = deck.id;
  const name = deck.name;
  const description = deck.description;
  const legal = deck.legal;

  try {
    // Check if the deck exists
    const existingDeck = await prisma.deck.findUnique({
      where: {
        id: deck_id,
      },
    });

    if (!existingDeck) {
      return res.status(404).json({ error: "Deck not found" });
    }

    // Update the deck
    const updatedDeck = await prisma.deck.update({
      where: {
        id: deck_id,
      },
      data: {
        name: name || existingDeck.name, // Use existing value if not provided
        description: description || existingDeck.description, // Use existing value if not provided
        legal: legal !== undefined ? legal : existingDeck.legal, // Use existing value if not provided
      },
    });

    // Update deckCards
    const updatedDeckCards = [];
    for (const card of cards) {
      const existingDeckCard = await prisma.deckCard.findUnique({
        where: {
          deck_id_card_id: {
            deck_id: deck_id,
            card_id: card.id,
          },
        },
      });

      if (!existingDeckCard) {
        // If the deckCard doesn't exist, create a new one
        const newDeckCard = await prisma.deckCard.create({
          data: {
            deck_id: deck_id,
            card_id: card.id,
            amount: card.amount,
          },
        });
        updatedDeckCards.push(newDeckCard);
      } else if (existingDeckCard.amount !== card.amount) {
        // If the amount is different, update the existing deckCard
        const updatedAmountDeckCard = await prisma.deckCard.update({
          where: {
            deck_id_card_id: {
              deck_id: deck_id,
              card_id: card.id,
            },
          },
          data: {
            amount: card.amount,
          },
        });
        updatedDeckCards.push(updatedAmountDeckCard);
      } else {
        updatedDeckCards.push(existingDeckCard);
      }
    }

    // Delete deckCards that are no longer in the deck object
    await prisma.deckCard.deleteMany({
      where: {
        deck_id: deck_id,
        NOT: {
          card_id: {
            in: cards.map((card) => card.id),
          },
        },
      },
    });

    // res.json({ deck: updatedDeck, cards: updatedDeckCards });
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Error updating deck and associated deck cards" });
  }
}

module.exports = {
  getAllDecks,
  getDeckById,
  getDecksByUserId,
  getCardsForDeck,
  updateDeck
};
