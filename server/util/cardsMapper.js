function mapCards(cards) {
    return cards.map((card) => {
      const updatedCard = { ...card };
      for (const key in updatedCard) {
        if (updatedCard[key] && updatedCard[key].json) {
          updatedCard[key] = updatedCard[key].json;
        }
      }
      return updatedCard;
    });
  }
  

  module.exports = {
    mapCards,
  };