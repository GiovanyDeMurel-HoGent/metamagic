describe('DecksPage Test', () => {
    it('Visits /decks', () => {
      cy.visit('/decks')
      cy.contains('zombies')
    })
  })