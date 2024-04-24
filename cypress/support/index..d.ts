declare namespace Cypress {
  interface Chainable<Subject = any> {
    getDataTest(nameInput: string): Cypress.Chainable;
    // login(email: string, password): Cypress.Chainable;
  }
}
