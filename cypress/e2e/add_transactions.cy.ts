
describe('add transactions button and first panel test', () => {

    it('checks whether add transactions button works corectly and content of first add transactions panel', () => {
        cy.createIfNotExists('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");
        cy.login('user@example.com', 'User123!');
        cy.visit('http://localhost:3000/home');

        cy.viewport(1920, 720);

        //add transaction button on home page

        cy.get('[data-testid="transactions-overview-add-transaction-button"]').should('exist');

        cy.get('[data-testid="transactions-overview-add-transaction-button"]').click();

        cy.get('[data-testid="add-transactions-panel"]').should('exist');

        cy.get('[data-testid="add-transactions-panel-title"]').should('exist').should('contain', 'Add transactions');
        cy.get('[data-testid="import-csv-button"]').should('exist');
        cy.get('[data-testid="import-csv-description"]').should('exist');
        cy.get('[data-testid="manual-add-button"]').should('exist');        
        cy.get('[data-testid="manual-add-description"]').should('exist');

        //closing panel and going to transactions page

        cy.get('[data-testid="close-button"]').click();

        cy.get('[data-testid="navbar-item-transactions-page"]').click();

        //add transaction button on transactions page

        cy.get('[data-testid="transactions-page-add-transactions-button"]').should('exist');
        cy.get('[data-testid="transactions-page-add-transactions-button"]').click();
        cy.get('[data-testid="add-transactions-panel"]').should('exist');

        cy.get('[data-testid="add-transactions-panel-title"]').should('exist').should('contain', 'Add transactions');
        cy.get('[data-testid="import-csv-button"]').should('exist');
        cy.get('[data-testid="import-csv-description"]').should('exist');
        cy.get('[data-testid="manual-add-button"]').should('exist');        
        cy.get('[data-testid="manual-add-description"]').should('exist');
      });
})

describe('add transactions by import csv file with correct data test', () => {

    beforeEach(() => {
        cy.cleanSlate('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");
        cy.login('user@example.com', 'User123!');
        cy.visit('http://localhost:3000/home');
    })

    it('checks whether add transactions by import csv file panel content and if filled with correct data without duplicated transactions works properly. Cancel button in clicked.', () => {
        
        cy.viewport(1920, 720);

        //add transaction button on home page and first add transactions panel

        cy.get('[data-testid="transactions-overview-add-transaction-button"]').click();

        cy.get('[data-testid="import-csv-button"]').click();

        cy.get('[data-testid="import-csv-panel"]').should('exist');

        //content of import csv file panel

        cy.get('[data-testid="import-csv-panel-main-title"]').should('exist').should('contain','Add transactions');
        cy.get('[data-testid="import-csv-panel-subtitle"]').should('exist').should('contain','Import Csv File');

        cy.get('[data-testid="import-csv-panel-form"]').should('exist');

        cy.get('[data-testid="import-csv-panel-bank-select"]').should('exist');

        //bank select field

        cy.get('[data-testid="import-csv-panel-bank-select"]').select('Pko').should('have.value','Pko');
        cy.get('[data-testid="import-csv-panel-bank-select"]').select('Pekao').should('have.value','Pekao');
        cy.get('[data-testid="import-csv-panel-bank-select"]').select('Santander').should('have.value','Santander');
        cy.get('[data-testid="import-csv-panel-bank-select"]').select('Ing').should('have.value','Ing');
        cy.get('[data-testid="import-csv-panel-bank-select"]').select('Mbank').should('have.value','Mbank');
        cy.get('[data-testid="import-csv-panel-bank-select"]').select('Other').should('have.value','Other');

        cy.get('[data-testid="import-csv-panel-bank-select"]').select('Pekao');

        //file input field

        cy.get('[data-testid="import-csv-panel-file-input"]').should('exist');

        const fixtureFile = 'bank_test.csv';
        cy.get('[data-testid="import-csv-panel-file-input"]').attachFile(fixtureFile);


        //next button
        cy.get('[data-testid="import-csv-panel-next-button"]').should('exist').should('contain','Next').click();

        //import csv check panel
        cy.get('[data-testid="import-csv-check-panel"]').should('exist');

        //import csv check panel content
        cy.get('[data-testid="transaction-list"]').should('exist');

        cy.get('[data-testid="transaction-edit-button"]').should('exist');
        cy.get('[data-testid="transaction-delete-button"]').should('exist');

        //import csv check panel buttons

        cy.get('[data-testid="import-csv-check-panel-cancel-button"]').should('exist').should('contain','Cancel');

        cy.get('[data-testid="import-csv-check-panel-cancel-button"]').click();

        cy.get('[data-testid="import-csv-panel"]').should('not.exist');

        cy.get('[data-testid="navbar-item-transactions-page"]').click();
        
        cy.get('[data-testid="transaction"]').should('not.exist');
      });

    it('checks whether add transactions by import csv file panel content and if filled with correct data without duplicated transactions works properly. Add button is clicked.', () => {
      cy.viewport(1520, 720);

      //add transaction button on home page and first add transactions panel

      cy.get('[data-testid="transactions-overview-add-transaction-button"]').click();

      cy.get('[data-testid="import-csv-button"]').click();

      cy.get('[data-testid="import-csv-panel"]').should('exist');

      //content of import csv file panel

      cy.get('[data-testid="import-csv-panel-main-title"]').should('exist').should('contain','Add transactions');
      cy.get('[data-testid="import-csv-panel-subtitle"]').should('exist').should('contain','Import Csv File');

      cy.get('[data-testid="import-csv-panel-form"]').should('exist');

      cy.get('[data-testid="import-csv-panel-bank-select"]').should('exist');

      //bank select field

      cy.get('[data-testid="import-csv-panel-bank-select"]').select('Pko').should('have.value','Pko');
      cy.get('[data-testid="import-csv-panel-bank-select"]').select('Pekao').should('have.value','Pekao');
      cy.get('[data-testid="import-csv-panel-bank-select"]').select('Santander').should('have.value','Santander');
      cy.get('[data-testid="import-csv-panel-bank-select"]').select('Ing').should('have.value','Ing');
      cy.get('[data-testid="import-csv-panel-bank-select"]').select('Mbank').should('have.value','Mbank');
      cy.get('[data-testid="import-csv-panel-bank-select"]').select('Other').should('have.value','Other');

      cy.get('[data-testid="import-csv-panel-bank-select"]').select('Pekao');

      //file input field

      cy.get('[data-testid="import-csv-panel-file-input"]').should('exist');

      const fixtureFile = 'bank_test.csv';
      cy.get('[data-testid="import-csv-panel-file-input"]').attachFile(fixtureFile);


      //next button
      cy.get('[data-testid="import-csv-panel-next-button"]').should('exist').should('contain','Next').click();

      //import csv check panel
      cy.get('[data-testid="import-csv-check-panel"]').should('exist');

      //import csv check panel content
      cy.get('[data-testid="transaction-list"]').should('exist');

      cy.get('[data-testid="transaction-edit-button"]').should('exist');
      cy.get('[data-testid="transaction-delete-button"]').should('exist');

      //import csv check panel buttons

      cy.get('[data-testid="import-csv-check-panel-cancel-button"]').should('exist').should('contain','Cancel');
      cy.get('[data-testid="import-csv-check-panel-add-button"]').should('exist').should('contain','Add');


      cy.get('[data-testid="import-csv-check-panel-add-button"]').click();

      cy.get('[data-testid="import-csv-panel"]').should('not.exist');

      cy.get('[data-testid="navbar-item-transactions-page"]').click();

      cy.get('[data-testid="transaction"]').
      get('[data-testid="transaction-category-field"]').should('contain','Transport').
      parent().get('[data-testid="transaction-type-field"]').should('contain','Card').
      parent().get('[data-testid="transaction-date-field"]').should('contain','03.08.2023').
      parent().get('[data-testid="transaction-description-field"]').should('contain','Bilety ZKM').
      parent().get('[data-testid="transaction-amount-field"]').should('contain','-62.77').should('exist');
    });
})



describe('add transactions by manual add transactions test', () => {

  beforeEach(() => {
      cy.cleanSlate('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");
      cy.login('user@example.com', 'User123!')
      cy.visit('http://localhost:3000/home');
  })

  it('checks whether manually adding transactions works properly.', () => {
      cy.viewport(1920, 720);

      //add transaction button on home page and first add transactions panel

      cy.get('[data-testid="transactions-overview-add-transaction-button"]').click();

      cy.get('[data-testid="manual-add-button"]').click();

      cy.get('[data-testid="manual-add-transaction-panel"]').should('exist');

      //content of manual add transaction panel

      cy.get('[data-testid="manual-add-transaction-panel-main-title"]').should('exist').should('contain','Add transactions');
      cy.get('[data-testid="manual-add-transaction-panel-subtitle"]').should('exist').should('contain','Add manually transactions');

      cy.get('[data-testid="manual-add-transaction-panel-form"]').should('exist');


      cy.get('[data-testid="manual-add-transaction-panel-amount-field"]').should('exist').type('-500');

      cy.get('[data-testid="manual-add-transaction-panel-category-field"]').should('exist').type('Shopping');

      cy.get('[data-testid="manual-add-transaction-panel-date-field"]').should('exist').type('2023-12-20');

      cy.get('[data-testid="manual-add-transaction-panel-notes-field"]').should('exist').type('christmas shopping');

      //add button functionality

      cy.get('[data-testid="manual-add-transaction-panel-add-button"]').should('exist').should('contain','Add').click();

      cy.get('[data-testid="manual-add-transaction-panel-form"]').should('not.exist');

      cy.get('[data-testid="navbar-item-transactions-page"]').click();

      cy.get('[data-testid="transaction"]').
        get('[data-testid="transaction-category-field"]').should('contain','Shopping').
        parent().get('[data-testid="transaction-date-field"]').should('contain','20.12.2023').
        parent().get('[data-testid="transaction-description-field"]').should('contain','christmas shopping').
        parent().get('[data-testid="transaction-amount-field"]').should('contain','-500').should('exist');
    });
  })