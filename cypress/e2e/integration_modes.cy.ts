describe('add new mode panel test', { testIsolation: false }, () => {

    beforeEach(() => {
        cy.login('user@example.com', 'User123!')
    })

    it('checks whether add transactions button works corectly and content of first add transactions panel', () => {
        cy.viewport(1280, 720);

        //checking add new mode button

        cy.get('[data-testid="navbar-add-new-mode-button"]').should('exist').should('contain','Add new mode').click();

        //checking add new mode panel content
        cy.get('[data-testid="add-new-mode-panel"]').should('exist');
        cy.get('[data-testid="add-new-mode-panel-title"]').should('exist').should('contain' ,'Add mode');
        cy.get('[data-testid="add-new-mode-panel-description"]').should('exist');

        //checking add new mode panel buttons 


        cy.get('[data-testid="add-family-mode-button"]').should('exist').should('contain', 'Family mode');
        cy.get('[data-testid="add-mode-button-description"]').should('exist');
        cy.get('[data-testid="add-mode-button-icon"]').should('exist');
        cy.get('[data-testid="add-partner-mode-button"]').should('exist').should('contain', 'Partner mode');
        cy.get('[data-testid="add-party-mode-button"]').should('exist').should('contain', 'Party mode');

        //add family mode button
        cy.get('[data-testid="add-family-mode-button"]').click();
        cy.get('[data-testid="family-mode-add-panel"]').should('exist');

        //closing panel and opening add mode panel
        cy.get('[data-testid="close-button"]').click();
        cy.get('[data-testid="navbar-add-new-mode-button"]').click();

        //add partner mode button
        cy.get('[data-testid="add-partner-mode-button"]').click();
        cy.get('[data-testid="partner-mode-add-panel"]').should('exist');

        //closing panel and opening add mode panel
        cy.get('[data-testid="close-button"]').click();
        cy.get('[data-testid="navbar-add-new-mode-button"]').click();

        //add party mode button
        cy.get('[data-testid="add-party-mode-button"]').click();
        cy.get('[data-testid="party-mode-add-panel"]').should('exist');
        
        //closing panel and opening add mode panel
        cy.get('[data-testid="close-button"]').click();
        cy.get('[data-testid="navbar-add-new-mode-button"]').click();


      });
})