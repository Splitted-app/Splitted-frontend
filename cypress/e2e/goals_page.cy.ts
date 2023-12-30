describe('goals page content test', () => {

    beforeEach(() => {
        cy.login('user@example.com', 'User123!');
        cy.visit('http://localhost:3000/goals');

    })

    it('checks whether content of insights page shows correctly', () => {
        cy.viewport(1550, 890);

        //checking content of header

        //checking title
        cy.get('[data-testid="goals-page-header-title"]').should('exist').should('contain' , 'Goals');

        //checking 'Select Main Goal' button
        cy.get('[data-testid="goals-page-select-main-goal-button"]').should('exist').should('contain' , 'Select Main Goal');
                
        //checking 'Add new goal' button
        cy.get('[data-testid="goals-page-add-new-goal-button"]').should('exist').should('contain' , 'Add new goal');

        //checking main goal section
        cy.get('[data-testid="goals-page-main-goal-container"]').should('exist');
        cy.get('[data-testid="goals-page-main-goal-container-text"]').should('exist').should('contain', 'Your main goal');
        cy.get('[data-testid="goals-page-main-goal"]').should('exist');

        //checking current goals section
        cy.get('[data-testid="goals-page-current-goals-section"]').should('exist');
        cy.get('[data-testid="goals-page-current-goals-section-title"]').should('exist').should('contain', 'Your current goals');
        cy.get('[data-testid="goals-page-current-goals"]').should('exist');

        //goal panel content
        cy.get('[data-testid="goal-name"]').should('exist');
        cy.get('[data-testid="goal-amount"]').should('exist');
        cy.get('[data-testid="goal-deadline"]').should('exist');
        cy.get('[data-testid="goal-progress"]').should('exist');
        cy.get('[data-testid="goal-edit-icon"]').should('exist');
        cy.get('[data-testid="goal-delete-icon"]').should('exist');
        //main goal icon?
        cy.get('[data-testid="main-goal-icon"]').should('exist');

        cy.get('[data-testid="goal-icon"]').should('exist');
        cy.get('[data-testid="goal"]').should('exist').invoke('attr','style').should('contain','linear-gradient');


      });
})