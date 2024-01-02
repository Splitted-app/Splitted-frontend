describe('transactions page content test', () => {

    beforeEach(() => {
        cy.cleanSlate('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");
        cy.addTransactions('user@example.com', 'User123!', 'Pekao');
        cy.login('user@example.com', 'User123!')
        cy.visit('http://localhost:3000/transactions');

    })

    it('checks whether content of transactions page shows correctly', () => {
        cy.viewport(1550, 890);

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
        cy.get('[data-testid="transaction-category-field"]').should('exist');
        cy.get('[data-testid="transaction-type-field"]').should('exist');
        cy.get('[data-testid="transaction-date-field"]').should('exist');
        cy.get('[data-testid="transaction-description-field"]').should('exist');
        cy.get('[data-testid="transaction-amount-field"]').should('exist');
        cy.get('[data-testid="transaction-edit-button"]').should('exist');

      });
})


describe('edit transaction test',()=>{
    beforeEach(() => {
        const transactionDate = new Date();
        transactionDate.setDate(transactionDate.getDate() - 1); // always yesterday
        cy.cleanSlate('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");
        cy.addTransaction('user@example.com', 'User123!', 
            -10, 
            'Groceries', 
            transactionDate.toISOString(), 
            'Biedronka');
        cy.login('user@example.com', 'User123!')
        cy.visit('http://localhost:3000/transactions');

    })
    it('checks whether edit button on transaction works properly', () => {
        cy.viewport(1550, 890);


        //checking appearance of edit button
        cy.get('[data-testid="transaction-edit-icon"]').should('exist');
        cy.get('[data-testid="transaction-green-checkmark-icon"]').should('not.exist');
        cy.get('[data-testid="transaction-edit-button"]').should('exist').click();
        cy.get('[data-testid="transaction-edit-icon"]').should('not.exist');
        cy.get('[data-testid="transaction-green-checkmark-icon"]').should('exist');


        //checking editting of a transaction
        cy.get('[data-testid="transaction-category-field"]').should('exist').invoke('attr','contentEditable').should('contain','true');
        cy.get('[data-testid="transaction-category-field"]').clear().type('Travel');


        cy.get('[data-testid="transaction-edit-type-select-field"]').should('exist');

        cy.get('[data-testid="transaction-edit-type-select-field"]').should('exist').select('Blik').should('have.value','Blik');
        cy.get('[data-testid="transaction-edit-type-select-field"]').should('exist').select('Card').should('have.value','Card');
        cy.get('[data-testid="transaction-edit-type-select-field"]').should('exist').select('Transfer').should('have.value','Transfer');
        cy.get('[data-testid="transaction-edit-type-select-field"]').should('exist').select('Other').should('have.value','Other');

        cy.get('[data-testid="transaction-edit-type-select-field"]').select('Card');

        cy.get('[data-testid="transaction-date-field"]').should('exist').should('not.have.attr','contentEditable');

        cy.get('[data-testid="transaction-description-field"]').should('exist').invoke('attr','contentEditable').should('contain','true');
        cy.get('[data-testid="transaction-description-field"]').clear().type('plane tickets');

        cy.get('[data-testid="transaction-amount-field"]').should('exist').invoke('attr','contentEditable').should('contain','true');
        cy.get('[data-testid="transaction-amount-field"]').clear().type('-700');

        cy.get('[data-testid="transaction-currency-field"]').should('exist').should('not.have.attr','contentEditable');


        //checking confirming edit changes
        cy.get('[data-testid="transaction-green-checkmark-icon"]').click();
        cy.get('[data-testid="transaction-edit-icon"]').should('exist');
        cy.get('[data-testid="transaction-green-checkmark-icon"]').should('not.exist');

        cy.get('[data-testid="transaction-category-field"]').should('contain','Travel');
        cy.get('[data-testid="transaction-type-field"]').should('contain','Card');
        cy.get('[data-testid="transaction-description-field"]').should('contain','plane tickets');
        cy.get('[data-testid="transaction-amount-field"]').should('contain','-700');


        cy.get('[data-testid="transaction-category-field"]').should('exist').invoke('attr','contentEditable').should('contain','false');
        cy.get('[data-testid="transaction-edit-type-select-field"]').should('not.exist');
        cy.get('[data-testid="transaction-description-field"]').should('exist').invoke('attr','contentEditable').should('contain','false');
        cy.get('[data-testid="transaction-amount-field"]').should('exist').invoke('attr','contentEditable').should('contain','false');

      });
})