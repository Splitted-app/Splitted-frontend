describe('navbar content test', { testIsolation: false }, () => {

    beforeEach(() => {
        cy.login('user@example.com', 'User123!')
    })

    it('checks whether navbar items work correctly and the user is redirected to expected pages', () => {
        cy.viewport(1280, 720);
        //checking navbar content
        //checking navbar header content 
        cy.get('[data-testid="navbar-header"]').should('exist');

        cy.get('[data-testid="navbar-header-icon"]').should('exist');
        cy.get('[data-testid="navbar-header-text"]').should('exist').should('contain', 'Splitted');

        //checking navbar side pages content

        //home page
        cy.get('[data-testid="navbar-item-home-page"]').should('exist').should('contain', 'HomePage');
        cy.get('[data-testid="navbar-item-home-page"]').click();
        cy.url().should('include', "/home");

        //transactions page
        cy.get('[data-testid="navbar-item-transactions-page"]').should('exist').should('contain', 'Transactions');
        cy.get('[data-testid="navbar-item-transactions-page"]').click();
        cy.url().should('include', "/transactions");

        //insights page
        cy.get('[data-testid="navbar-item-insights-page"]').should('exist').should('contain', 'Insights');
        cy.get('[data-testid="navbar-item-insights-page"]').click();
        cy.url().should('include', "/insights");

        //goals page
        cy.get('[data-testid="navbar-item-goals-page"]').should('exist').should('contain', 'Goals');
        cy.get('[data-testid="navbar-item-goals-page"]').click();
        cy.url().should('include', "/goals");

        //modes panel
        cy.get('[data-testid="navbar-modes-panel"]').should('exist');

        //log out button
        cy.get('[data-testid="navbar-item-log-out-button"]').should('exist').should('contain', 'Log Out');
        cy.get('[data-testid="navbar-item-log-out-button"]').click();
        cy.get('[data-testid="log-out-confirmation-panel"]').should('exist');
        cy.get('[data-testid="log-out-confirmation-panel-cancel-button"]').click();

        //settings page
        cy.get('[data-testid="navbar-item-settings-page"]').should('exist').should('contain', 'Settings');
        cy.get('[data-testid="navbar-item-settings-page"]').click();
        cy.url().should('include', "/settings");
      });
})