describe('shopping list tests', () => {
  it('adding items works', () => {
    cy.visit('/shopping-list')
    cy.getDataTest('shopping-list').within( () => {
      cy.get('a').should('have.length', 2)
    })
    cy.getDataTest('name-input').type("hamburger")
    cy.getDataTest('amount-input').type("1")
    cy.getDataTest('submit-button').click()
    cy.getDataTest('shopping-list').within( () => {
      cy.get('a').should('have.length', 3)
      cy.get('a').its(2).should('contain.text', 'hamburger (1)')
    })
  })
})
