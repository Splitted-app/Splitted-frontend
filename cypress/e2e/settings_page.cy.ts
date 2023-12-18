describe('settings page navbar content test', { testIsolation: false }, () => {

    beforeEach(() => {
        cy.login('user@example.com', 'User123!')
    })

    it('checks whether content of transactions page shows correctly', () => {
        cy.viewport(1550, 890);

        //go to transactions page
        cy.get('[data-testid="navbar"]').should('exist');
        cy.get('[data-testid="navbar-item-settings-page"]').click();
        cy.get('[data-testid="navbar"]').should('not.exist');
        cy.get('[data-testid="settings-page-navbar"]').should('exist');

        //checking navbar header and testing icon allowing switching between navbars

        cy.get('[data-testid="settings-page-navbar-header-title-and-icon"]').should('exist').should('contain' , 'Splitted');

        //testing icon
        //switching between navbars
        cy.get('[data-testid="settings-page-navbar-change-icon"]').should('exist').click();
        cy.get('[data-testid="navbar"]').should('exist');
        cy.get('[data-testid="settings-page-navbar"]').should('not.exist');
        cy.get('[data-testid="navbar-change-icon"]').should('exist').click();
        cy.get('[data-testid="settings-page-navbar"]').should('exist');
        cy.get('[data-testid="navbar"]').should('not.exist');

        //coming back to original navbar
        cy.get('[data-testid="settings-page-navbar-change-icon"]').click();
        cy.get('[data-testid="navbar-item-home-page"]').click();
        cy.get('[data-testid="settings-page-navbar"]').should('not.exist');
        cy.get('[data-testid="navbar-change-icon"]').should('not.exist');

        //coming back to settings page
        cy.get('[data-testid="navbar-item-settings-page"]').click();
        cy.get('[data-testid="settings-page-navbar"]').should('exist');

        //checking settings navbar side pages content

        //acount page
        cy.get('[data-testid="settings-page-navbar-account-page-button"]').should('exist').should('contain', 'Account');
        cy.get('[data-testid="settings-page-navbar-account-page-button"]').click();
        cy.get('[data-testid="account-page"]').should('exist');

        //train ai page
        cy.get('[data-testid="settings-page-navbar-ai-model-page-button"]').should('exist').should('contain', 'AI Model');
        cy.get('[data-testid="settings-page-navbar-ai-model-page-button"]').click();
        cy.get('[data-testid="train-ai-page"]').should('exist');

        //friends page
        cy.get('[data-testid="settings-page-navbar-friends-page-button"]').should('exist').should('contain', 'Friends');
        cy.get('[data-testid="settings-page-navbar-friends-page-button"]').click();
        cy.get('[data-testid="friends-page"]').should('exist');

        //delete account section
        cy.get('[data-testid="delete-account-button"]').should('exist').should('contain', 'Delete account');
        cy.get('[data-testid="delete-account-button"]').click();
        cy.get('[data-testid="delete-account-confirmation-panel"]').should('exist');



    });
})