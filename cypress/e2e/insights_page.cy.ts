describe('insights page content test', { testIsolation: false }, () => {

    beforeEach(() => {
        cy.login('user@example.com', 'User123!')
    })

    it('checks whether content of insights page shows correctly', () => {
        cy.viewport(1550, 890);

        //go to insights page
        cy.get('[data-testid="navbar-item-insights-page"]').click();

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

        cy.get('[data-testid="statistics-panel-max-value"]').should('exist');
        cy.get('[data-testid="statistics-panel-q3"]').should('exist');
        cy.get('[data-testid="statistics-panel-mean-value"]').should('exist');
        cy.get('[data-testid="statistics-panel-q1"]').should('exist');
        cy.get('[data-testid="statistics-panel-min-value"]').should('exist');

      });
})