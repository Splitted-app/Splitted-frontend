describe('transactions page content test', { testIsolation: false }, () => {

    beforeEach(() => {
        cy.login('user@example.com', 'User123!')
    })

    it('checks whether content of transactions page shows correctly', () => {
        cy.viewport(1550, 890);

        //go to transactions page
        cy.get('[data-testid="navbar-item-transactions-page"]').click();

        //checking content of header

        //checking title
        cy.get('[data-testid="transactions-page-header-title"]').should('exist').should('contain' , 'Transactions');

        //checking 'Add Transactions' button
        cy.get('[data-testid="transactions-page-add-transactions-button"]').should('exist').should('contain' , 'Add Transactions');
        
        //checking 'Delete Transactions' button
        cy.get('[data-testid="transactions-page-delete-transactions-button"]').should('exist').should('contain' , 'Delete Transactions');

        //checking Insights Panel
        cy.get('[data-testid="transactions-page-insights-panel"]').should('exist');
        cy.get('[data-testid="transactions-insights-panel-title"]').should('exist').should('contain' ,'Analysis');
        cy.get('[data-testid="transactions-insights-panel-chart"]').should('exist');

        //checking filter menu panel
        cy.get('[data-testid="transactions-page-show-filter-menu"]').should('exist').should('contain' , 'Show filter menu');
        cy.get('[data-testid="transactions-page-filter-menu"]').should('not.exist');
        cy.get('[data-testid="transactions-page-show-filter-menu-button"]').click();        
        cy.get('[data-testid="transactions-page-filter-menu"]').should('exist');
        cy.get('[data-testid="transactions-page-show-filter-menu-button"]').click();        
        cy.get('[data-testid="transactions-page-filter-menu"]').should('not.exist');

        //checking transactions list
        cy.get('[data-testid="transactions-page-transactions-list"]').should('exist');
        cy.get('[data-testid="category-field"]').should('exist');
        cy.get('[data-testid="transaction-type-field"]').should('exist');
        cy.get('[data-testid="date-field"]').should('exist');
        cy.get('[data-testid="description-field"]').should('exist');
        cy.get('[data-testid="amount-field"]').should('exist');
        cy.get('[data-testid="transaction-edit-button"]').should('exist');

      });
})