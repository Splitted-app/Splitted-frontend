describe('add transactions button and first panel test', () => {

    beforeEach(() => {
        cy.login('user@example.com', 'User123!')
        cy.visit('http://localhost:3000/home');
    })

    it('checks whether add new mode button works corectly and content of first add new mode panel', () => {
        cy.viewport(1280, 720);

        //add transaction button on home page

        cy.get('[data-testid="transactions-overview-add-transaction-button"]').should('exist');

        cy.get('[data-testid="transactions-overview-add-transaction-button"]').click();

        cy.get('[data-testid="add-transactions-panel"]').should('exist');

        cy.get('[data-testid="add-transactions-panel-title"]').should('exist').should('contain', 'Add transactions');
        cy.get('[data-testid="import-csv-button"]').should('exist');
        cy.get('[data-testid="import-csv-description"]').should('exist');
        cy.get('[data-testid="manual-add-button"]').should('exist');        
        cy.get('[data-testid="manual-add-description"]').should('exist');

        //closing panel and going to transactions page

        cy.get('[data-testid="close-button"]').click();

        cy.get('[data-testid="navbar-item-transactions-page"]').click();

        //add transaction button on home page

        cy.get('[data-testid="transactions-page-add-transactions-button"]').should('exist');
        cy.get('[data-testid="transactions-page-add-transactions-button"]').click();
        cy.get('[data-testid="add-transactions-panel"]').should('exist');

        cy.get('[data-testid="add-transactions-panel-title"]').should('exist').should('contain', 'Add transactions');
        cy.get('[data-testid="import-csv-button"]').should('exist');
        cy.get('[data-testid="import-csv-description"]').should('exist');
        cy.get('[data-testid="manual-add-button"]').should('exist');        
        cy.get('[data-testid="manual-add-description"]').should('exist');
      });
})