describe('home page content test', () => {

    beforeEach(() => {
        cy.login('user@example.com', 'User123!')
        cy.visit('http://localhost:3000/home');
    })

    it('checks if content of home page is correct', () => {
        cy.url().should('include' , '/home');
        cy.viewport(1280, 720);

        cy.get('[data-testid="home-page-your-balance-text"]').should("exist").should('contain', 'Your balance');

        cy.get('[data-testid="home-page-bank-balance-text"]').should("exist").should('contain', '1000.00');

        cy.get('[data-testid="home-page-currency-text"]').should("exist").should('contain', 'PLN');

        cy.get('[data-testid="home-page-reminders-panel"]').should("exist");

        cy.get('[data-testid="home-page-transactions-overview"]').should("exist");

        cy.get('[data-testid="home-page-transactions-overview-title"]').should("exist").should('contain', 'Transactions');


        cy.get('[data-testid="home-page-left-arrow-button"]').should("exist");

        cy.get('[data-testid="home-page-right-arrow-button"]').should("exist");
        cy.get('[data-testid="home-page-right-arrow-button"]').should("exist").click();

        cy.get('[data-testid="home-page-insights-overview"]').should("exist");

        cy.get('[data-testid="home-page-insights-overview-title"]').should("exist").should('contain', 'Insights');


        cy.get('[data-testid="home-page-right-arrow-button"]').should("exist").click();
        cy.get('[data-testid="home-page-transactions-overview"]').should("exist");


        cy.get('[data-testid="overview-time-scale-selector"]').should("exist");
        cy.get('[data-testid="overview-time-span-selector"]').should("exist");


      });
})