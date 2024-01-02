describe('insights page content test',  () => {

    beforeEach(() => {
        cy.createIfNotExists('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");
        cy.login('user@example.com', 'User123!');
        cy.visit('http://localhost:3000/insights');

    })

    it('checks whether content of insights page shows correctly', () => {
        cy.viewport(1550, 890);

        //checking content of header

        //checking title
        cy.get('[data-testid="insights-page-header-title"]').should('exist').should('contain' , 'Insights');

        //checking filter menu panel
        cy.get('[data-testid="insights-page-show-filter-menu"]').should('exist').should('contain' , 'Show filter menu');
        cy.get('[data-testid="insights-page-filter-menu"]').should('not.exist');
        cy.get('[data-testid="insights-page-show-filter-menu-button"]').click();        
        cy.get('[data-testid="insights-page-filter-menu"]').should('exist');
        cy.get('[data-testid="insights-page-show-filter-menu-button"]').click();        
        cy.get('[data-testid="insights-page-filter-menu"]').should('not.exist');

        //checking insights page charts
        cy.get('[data-testid="insights-page-header-income-expenses-chart"]').should('exist');
        cy.get('[data-testid="insights-page-linear-balance-chart"]').should('exist');
        cy.get('[data-testid="insights-page-pie-chart"]').should('exist');
        cy.get('[data-testid="insights-page-income-expeneses-chart"]').should('exist');
        cy.get('[data-testid="insights-page-expenses-distribution-chart"]').should('exist');

        //statistic panel
        cy.get('[data-testid="insights-page-statistics-panel"]').should('exist');

        cy.get('[data-testid="statistics-panel-max-value"]').should('exist').should('contain','Max value:');
        cy.get('[data-testid="statistics-panel-q3"]').should('exist').should('contain','Q3:');
        cy.get('[data-testid="statistics-panel-mean-value"]').should('exist').should('contain','Mean:');
        cy.get('[data-testid="statistics-panel-q1"]').should('exist').should('contain','Q1:');
        cy.get('[data-testid="statistics-panel-min-value"]').should('exist').should('contain','Min value:');

        cy.get('[data-testid="statistics-panel-max-value-amount"]').should('exist');
        cy.get('[data-testid="statistics-panel-q3-amount"]').should('exist');
        cy.get('[data-testid="statistics-panel-mean-value-amount"]').should('exist');
        cy.get('[data-testid="statistics-panel-q1-amount"]').should('exist');
        cy.get('[data-testid="statistics-panel-min-value-amount"]').should('exist');


      });
})

describe('insights page filtering data test',  () => {

    beforeEach(() => {
        cy.createIfNotExists('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");
        cy.addTransactions('user@example.com', 'User123!', 'Pekao');
        cy.login('user@example.com', 'User123!');
        cy.visit('http://localhost:3000/insights');

    })

    it('checks whether filtering data on insights page work properly', () => {
        cy.viewport(1550, 890);


        //checking filter menu panel
        cy.get('[data-testid="insights-page-show-filter-menu"]').should('exist').should('contain' , 'Show filter menu');
        cy.get('[data-testid="insights-page-filter-menu"]').should('not.exist');
        cy.get('[data-testid="insights-page-show-filter-menu-button"]').click();        
        cy.get('[data-testid="insights-page-filter-menu"]').should('exist');

        //content of filter menu panel

        //date section
        cy.get('[data-testid="insights-page-date-section"]').should('exist').should('contain','Dates');
        cy.get('[data-testid="insights-page-date-from-label"]').should('exist').should('contain','From');
        cy.get('[data-testid="insights-page-date-to-label"]').should('exist').should('contain','To');

        cy.get('[data-testid="insights-page-date-from-input-field"]').should('exist').type('2023-08-02');
        cy.get('[data-testid="insights-page-date-to-input-field"]').should('exist').type('2024-08-03');

        //category section
        cy.get('[data-testid="insights-page-category-section"]').should('exist').should('contain','Categories');
        cy.get('[data-testid="insights-page-category-section-input-field"]').should('exist').type('Groceries');

        //delta time section
        cy.get('[data-testid="insights-page-delta-time-section"]').should('exist').should('contain','Delta Time');
        cy.get('[data-testid="insights-page-delta-time-section-select-field"]').should('exist');

        cy.get('[data-testid="insights-page-delta-time-section-select-field"]').select('Day').should('have.value','Day');
        cy.get('[data-testid="insights-page-delta-time-section-select-field"]').select('Month').should('have.value','Month');

        
        //bin range section
        cy.get('[data-testid="insights-page-bin-range-section"]').should('exist').should('contain','Bin Range');
        cy.get('[data-testid="insights-page-bin-range-section-input-field"]').should('exist').type('25');

        //filter button
        cy.get('[data-testid="insights-page-filter-button"]').should('exist').should('contain','Filter').click();
        cy.get('[data-testid="insights-page-filter-menu"]').should('not.exist');


        cy.get('[data-testid="statistics-panel-max-value-amount"]').should('exist').should('contain','44.74 PLN');
        cy.get('[data-testid="statistics-panel-q3-amount"]').should('exist').should('contain','44.74 PLN');
        cy.get('[data-testid="statistics-panel-mean-value-amount"]').should('exist').should('contain','44.74 PLN');
        cy.get('[data-testid="statistics-panel-q1-amount"]').should('exist').should('contain','44.74 PLN');
        cy.get('[data-testid="statistics-panel-min-value-amount"]').should('exist').should('contain','44.74 PLN');

      });
})