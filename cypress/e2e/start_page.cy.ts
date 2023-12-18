describe('start page test', () => {
  it('checks content of start page and whether the main button opens register form', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="start-page-slogan"]').should("exist").contains("Spend it, Track it,");
    cy.get('[data-testid="start-page-title"]').should("exist").should('have.text' , "Splitted");
    cy.get('[data-testid="start-page-subtitle"]').should("exist").should('have.text' , "Let's start");

    cy.get('[data-testid="start-page-button"]').should("exist").click()

    cy.url().should('include', "/register");
  })
})