describe('template spec', () => {

  beforeEach( () => {
    cy.visit('/auth')
    cy.login('elliott.short@gmail.com', 'pickles')
    cy.url().should('contain', '/recipes')
    // cy.screenshot()
  })

  it('recipe nav/ add to shopping list', () => {
    let recipeTitle = {'value': ''}
    let recipeDescription = {'value': ''}
    let listLength = {'total': 0}
    let recipeList = {'total': 0}
    cy.wrap(recipeTitle).its('value').as('recipeTitle')
    cy.wrap(recipeDescription).its('value').as('recipeDescription')
    cy.wrap(listLength).its('total').as('listLength')
    cy.visit('/shopping-list')
    cy.getDataTest('shopping-list').within( () => {
      cy.get('a').then( el => {
        listLength.total = el.length
      })
    })
    cy.getDataTest('recipes-nav').click()
    cy.url().should('include', '/recipes')
    cy.get('app-recipe-item').eq(0).within(() => {
      cy.get('h4').then( (el) => {
        recipeTitle.value = el.text();
      })
      cy.get('p').then( (el) => {
        recipeDescription.value = el.text();
      })
    })
    cy.get('app-recipe-item').eq(0).click()
    cy.getDataTest('ingredient-list').then( (el) => {
      recipeList.total = el.length;
    })
    cy.url().should('include', '/recipes/0')
    cy.get('@recipeTitle').then( (aliasValue) => {
      cy.getDataTest('recipe-name').should('contain.text', aliasValue)
    })
    cy.get('@recipeDescription').then( (aliasValue) => {
      cy.getDataTest('recipe-description').should('contain.text', aliasValue)
    })
    cy.getDataTest('manage-recipe').click()
    cy.getDataTest('list-add').click()
    cy.getDataTest('shopping-list-nav').click()
    cy.getDataTest('shopping-list').within( () => {
      cy.get('a').should('have.length', listLength.total + recipeList.total)
    })
  })

  it.only('edit recipe', () => {
    cy.visit('/recipes')
    cy.get('app-recipe-item').eq(0).click()
    cy.getDataTest('manage-recipe').click()
    cy.getDataTest('edit-recipe').click()
  })
})
