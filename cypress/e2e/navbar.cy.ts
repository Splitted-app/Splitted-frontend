describe('navbar content test', () => {

    beforeEach(() => {
        cy.createIfNotExists('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");
        cy.login('user@example.com', 'User123!')
        cy.visit('http://localhost:3000/home');

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

describe('log out functionality test', () => {

    beforeEach(() => {
        cy.createIfNotExists('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");
        cy.login('user@example.com', 'User123!')
        cy.visit('http://localhost:3000/home');

    })
    
    it('checks whether loging out functionality works properly', () => {
        cy.viewport(1280, 720);

        //checking if log out button 
        cy.get('[data-testid="navbar-item-log-out-button"]').should('exist').should('contain','Log Out').click();
        
        //checking if log out confirmation panel is visible
        cy.get('[data-testid="log-out-confirmation-panel"]').should('exist');

        //checking content of log out confirmation panel
        cy.get('[data-testid="log-out-confirmation-panel-main-title"]').should('exist').should('contain', 'Log Out');
        cy.get('[data-testid="log-out-confirmation-panel-subtitle"]').should('exist');

        cy.get('[data-testid="log-out-confirmation-panel-cancel-button"]').should('exist').should('contain','Cancel');
        cy.get('[data-testid="log-out-confirmation-panel-log-out-button"]').should('exist').should('contain','Log Out');


        //checking functionality of cancel button

        cy.get('[data-testid="log-out-confirmation-panel-cancel-button"]').click();
        cy.get('[data-testid="log-out-confirmation-panel"]').should('not.exist');
        cy.url().should('include', "/home");

        //checking functionality of log out button

        cy.get('[data-testid="navbar-item-log-out-button"]').click();
        cy.get('[data-testid="log-out-confirmation-panel-log-out-button"]').click();
        cy.url().should('include', "/");


    })
})