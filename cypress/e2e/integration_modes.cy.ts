describe('add new mode panel test', () => {

    beforeEach(() => {
        cy.createIfNotExists('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");
        cy.login('user@example.com', 'User123!');
        cy.visit('http://localhost:3000/home');

    })

    it('checks whether add new mode button works corectly and content of first add new mode panel', () => {
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
        
        //closing panel 
        cy.get('[data-testid="close-button"]').click();

      });
})

describe('add family mode test', () => {

    beforeEach(() => {
        cy.cleanSlate('user1@example.com', 'User1123!', "user1", "100", "Pekao", "PLN");
        cy.cleanSlate('user2@example.com', 'User2123!', "user2", "50", "Pko", "EUR");
        cy.cleanSlate('user3@example.com', 'User3123!', "user3", "0", "Ing", "USD");
        cy.login('user1@example.com', 'User1123!');
        cy.visit('http://localhost:3000/home');

    })

    it('checks if process of integrating two user budgets in family mode works properly', () => {
        cy.viewport(1280, 720);

        cy.get('[data-testid="navbar-add-new-mode-button"]').click();


        //add family mode button


        cy.get('[data-testid="add-family-mode-button"]').should('exist').should('contain', 'Family mode');
        cy.get('[data-testid="add-family-mode-button"]').click();
        cy.get('[data-testid="family-mode-add-panel"]').should('exist');

        //content of add family mode panel

        cy.get('[data-testid="family-mode-add-panel-main-title"]').should('exist').should('contain','Family mode');
        cy.get('[data-testid="family-mode-add-panel-subtitle"]').should('exist');

        //find your family section
        cy.get('[data-testid="family-mode-add-panel-find-your-family-section"]').should('exist');
        cy.get('[data-testid="family-mode-add-panel-find-your-family-section-label"]').should('exist').should('contain','Let\'s find your family:');
        cy.get('[data-testid="family-mode-add-panel-find-your-family-section-search-field"]').should('exist');

        cy.get('[data-testid="family-mode-add-panel-find-your-family-section-search-field"]').type('user2');
        cy.get('[data-testid="family-mode-add-panel-find-your-family-section-search-field"]').should('contain','user2');

        //family icon
        cy.get('[data-testid="family-mode-add-panel-family-mode-icon"]').should('exist');

        //integrate account button

        //integrate account button with no user selected
        cy.get('[data-testid="family-mode-add-panel-integrate-accounts-button"]').should('exist').should('contain','Integrate accounts').should('be.disabled');
        cy.get('[data-testid="family-mode-add-panel"]').should('exist');
        cy.get('[data-testid="family-mode-followup-panel"]').should('not.exist');

        //integrate account button with selected user
        cy.get('[data-testid="family-mode-add-panel-find-your-family-section-search-field"]').type('user2{enter}{enter}');
        cy.get('[data-testid="family-mode-add-panel-find-your-family-section-search-field"]').should('contain','user2');
        cy.get('[data-testid="family-mode-add-panel-integrate-accounts-button"]').should('exist').should('contain','Integrate accounts').click();
        cy.get('[data-testid="family-mode-add-panel"]').should('not.exist');
        cy.get('[data-testid="family-mode-followup-panel"]').should('exist');
        
        //family mode follow up panel content

        cy.get('[data-testid="family-mode-followup-panel-main-title"]').should('exist').should('contain','Before you begin');
        cy.get('[data-testid="family-mode-followup-panel-subtitle"]').should('exist');

        //form
        cy.get('[data-testid="family-mode-followup-panel-form"]').should('exist');

        //bank field
        cy.get('[data-testid="family-mode-followup-panel-form-select-bank-field-label"]').should('exist').should('contain','Pick your bank:');

        cy.get('[data-testid="family-mode-followup-panel-form-select-bank-field"]').should('exist');

        
        cy.get('[data-testid="family-mode-followup-panel-form-select-bank-field"]').select('Pko').should('have.value','Pko');
        cy.get('[data-testid="family-mode-followup-panel-form-select-bank-field"]').select('Pekao').should('have.value','Pekao');
        cy.get('[data-testid="family-mode-followup-panel-form-select-bank-field"]').select('Santander').should('have.value','Santander');
        cy.get('[data-testid="family-mode-followup-panel-form-select-bank-field"]').select('Ing').should('have.value','Ing');
        cy.get('[data-testid="family-mode-followup-panel-form-select-bank-field"]').select('Mbank').should('have.value','Mbank');
        cy.get('[data-testid="family-mode-followup-panel-form-select-bank-field"]').select('Other').should('have.value','Other');

        cy.get('[data-testid="family-mode-followup-panel-form-select-bank-field"]').select('Mbank');

        //currency field
        cy.get('[data-testid="family-mode-followup-panel-form-select-currency-field-label"]').should('exist').should('contain','Choose your currency:');
        cy.get('[data-testid="currency-select"]').should("exist").select('USD');

        //budget name field
        cy.get('[data-testid="family-mode-followup-panel-form-budget-name-input-field-label"]').should('exist').should('contain','Budget name:');
        cy.get('[data-testid="family-mode-followup-panel-form-budget-name-input-field"]').should('exist').type('FamilyMode1');

        //finish button

        cy.get('[data-testid="family-mode-followup-panel-finish-button"]').should('exist').should('contain','Finish').click();

        //checking if accounts integrated correctly
        cy.get('[data-testid="family-mode-followup-panel"]').should('not.exist');

        cy.get('[data-testid="mode-item"]').should('exist');
        cy.get('[data-testid="mode-item-title"]').should('contain','FamilyMode1').should('exist').click();
        cy.get('[data-testid="family-mode-page"]').should('exist');
        cy.get('[data-testid="navbar-item-home-page"]').click();

        cy.get('[data-testid="home-page-bank-balance-text"]').should("exist").should('contain', '150.00');

        cy.get('[data-testid="home-page-currency-text"]').should("exist").should('contain', 'USD');

        cy.get('[data-testid="navbar-item-settings-page"]').click();
        cy.get('[data-testid="user-account-main-panel-default-bank"]').should('exist').should('contain','Mbank');

        //loging out and loging as a second user in integration mode
        cy.get('[data-testid="settings-page-navbar-change-icon"]').click();
        cy.get('[data-testid="navbar-item-home-page"]').click();
        cy.get('[data-testid="navbar-item-log-out-button"]').click();
        cy.get('[data-testid="log-out-confirmation-panel-log-out-button"]').click();

        cy.login('user2@example.com', 'User2123!');
        cy.visit('http://localhost:3000/home');

        
        cy.get('[data-testid="mode-item"]').should('exist');
        cy.get('[data-testid="mode-item-title"]').should('contain','FamilyMode1').should('exist').click();
        cy.get('[data-testid="family-mode-page"]').should('exist');
        cy.get('[data-testid="navbar-item-home-page"]').click();

        cy.get('[data-testid="home-page-bank-balance-text"]').should("exist").should('contain', '150.00');

        cy.get('[data-testid="home-page-currency-text"]').should("exist").should('contain', 'USD');

        cy.get('[data-testid="navbar-item-settings-page"]').click();
        cy.get('[data-testid="user-account-main-panel-default-bank"]').should('exist').should('contain','Mbank');


        //checking if its possible to create another family mode when user is already in family mode
        cy.get('[data-testid="settings-page-navbar-change-icon"]').click();
        cy.get('[data-testid="navbar-item-home-page"]').click();
        cy.get('[data-testid="navbar-add-new-mode-button"]').click();
        cy.get('[data-testid="add-family-mode-button"]').click();
        cy.get('[data-testid="family-mode-add-panel-find-your-family-section-search-field"]').type('user3{enter}{enter}');
        cy.get('[data-testid="family-mode-add-panel-find-your-family-section-search-field"]').should('contain','user3');
        cy.get('[data-testid="family-mode-add-panel-integrate-accounts-button"]').click();

        cy.get('[data-testid="family-mode-followup-panel-form-select-bank-field"]').select('Pko');
        cy.get('[data-testid="currency-select"]').select('PLN');
        cy.get('[data-testid="family-mode-followup-panel-form-budget-name-input-field"]').type('FamilyMode2');
        cy.get('[data-testid="family-mode-followup-panel-finish-button"]').click();

        cy.get('[data-testid="error-message"]').should('exist').should('contain','This user is unavailable');


        cy.wait(5000);

        cy.get('[data-testid="home-page-bank-balance-text"]').should("exist").should('contain', '150.00');

        cy.get('[data-testid="home-page-currency-text"]').should("exist").should('contain', 'USD');

        cy.get('[data-testid="navbar-item-settings-page"]').click();
        cy.get('[data-testid="user-account-main-panel-default-bank"]').should('exist').should('contain','Mbank');
        cy.get('[data-testid="settings-page-navbar-change-icon"]').click();
        cy.get('[data-testid="navbar-item-home-page"]').click();
        cy.get('[data-testid="mode-item-title"]').should('not.contain','FamilyMode2');

      });
})



describe('add party mode test', () => {

    beforeEach(() => {
        cy.cleanSlate('user1@example.com', 'User1123!', "user1", "100", "Pekao", "PLN");
        cy.cleanSlate('user2@example.com', 'User2123!', "user2", "50", "Pekao", "PLN");
        cy.cleanSlate('user3@example.com', 'User3123!', "user3", "0", "Ing", "USD");
        cy.addTransactions('user1@example.com', 'User1123!', 'Pekao');
        cy.addTransactions('user2@example.com', 'User2123!', 'Pekao');
        cy.login('user1@example.com', 'User1123!');
        cy.visit('http://localhost:3000/home');

    })

    it('checks if process of creating temporary budget works properly', () => {
        cy.viewport(1280, 720);

        cy.get('[data-testid="navbar-add-new-mode-button"]').click();

        //add party mode button

        cy.get('[data-testid="add-party-mode-button"]').should('exist').should('contain', 'Party mode');
        cy.get('[data-testid="add-party-mode-button"]').click();
        cy.get('[data-testid="party-mode-add-panel"]').should('exist');

        //content of add party mode panel

        cy.get('[data-testid="party-mode-add-panel-main-title"]').should('exist').should('contain','Party mode');
        cy.get('[data-testid="party-mode-add-panel-subtitle"]').should('exist');
        cy.get('[data-testid="party-mode-add-panel-party-mode-icon"]').should('exist');


        //find your friends section
        cy.get('[data-testid="party-mode-add-panel-find-your-friends-section"]').should('exist');
        cy.get('[data-testid="party-mode-add-panel-find-your-friends-section-label"]').should('exist').should('contain','Let\'s find your friends:');
        cy.get('[data-testid="party-mode-add-panel-find-your-friends-section-search-field"]').should('exist');

        cy.get('[data-testid="party-mode-add-panel-find-your-friends-section-search-field"]').type('user2');
        cy.get('[data-testid="party-mode-add-panel-find-your-friends-section-search-field"]').should('contain','user2');


        //integrate account button

        //integrate account button with no user selected
        cy.get('[data-testid="party-mode-add-panel-integrate-accounts-button"]').should('exist').should('contain','Integrate accounts').should('be.disabled');
        cy.get('[data-testid="party-mode-add-panel"]').should('exist');
        cy.get('[data-testid="party-mode-followup-panel"]').should('not.exist');

        //find your friends section and selecting users
        cy.get('[data-testid="party-mode-add-panel-find-your-friends-section-search-field"]').type('user2{enter}{enter}');
        cy.get('[data-testid="party-mode-add-panel-find-your-friends-section-search-field"]').should('contain','user2');
        cy.get('[data-testid="party-mode-add-panel-find-your-friends-section-search-field"]').type('user3{enter}{enter}');
        cy.get('[data-testid="party-mode-add-panel-find-your-friends-section-search-field"]').should('contain','user3');


        //friend list container
        cy.get('[data-testid="part-mode-add-panel-friends-list-container"]').should('exist');
        cy.get('[data-testid="part-mode-add-panel-friends-list-container-title"]').should('exist').should('contain','Your Friends:');
        cy.get('[data-testid="party-friend-list"]').should('exist');
        cy.get('[data-testid="party-friend"]').should('contain','user2').should('exist');
        cy.get('[data-testid="party-friend"]').should('contain','user3').should('exist');

        cy.get('[data-testid="party-friend-delete-button"]').should('exist');

        cy.get('[data-testid="party-friend"]').contains('user3').within(()=>{
            cy.get('[data-testid="party-friend-delete-button"]').click();
        })

        cy.get('[data-testid="party-friend"]').should('contain','user2').should('exist');
        cy.get('[data-testid="party-friend"]').should('not.contain','user3');

        //integrate account button with selected user
        cy.get('[data-testid="party-mode-add-panel-integrate-accounts-button"]').should('exist').should('contain','Integrate accounts').click();
        cy.get('[data-testid="party-mode-add-panel"]').should('not.exist');
        cy.get('[data-testid="party-mode-followup-panel"]').should('exist');
        
        //party mode follow up panel content

        cy.get('[data-testid="party-mode-followup-panel-main-title"]').should('exist').should('contain','Before you begin');
        cy.get('[data-testid="party-mode-followup-panel-subtitle"]').should('exist');

        //form
        cy.get('[data-testid="party-mode-followup-panel-form"]').should('exist');

    
        //budget name field
        cy.get('[data-testid="party-mode-followup-panel-form-budget-name-input-field-label"]').should('exist').should('contain','Budget name:');
        cy.get('[data-testid="party-mode-followup-panel-form-budget-name-input-field"]').should('exist').type('PartyMode1');

        //finish button

        cy.get('[data-testid="party-mode-followup-panel-finish-button"]').should('exist').should('contain','Finish').click();

        //checking if accounts integrated correctly
        cy.get('[data-testid="party-mode-followup-panel"]').should('not.exist');

        cy.get('[data-testid="mode-item"]').should('exist');
        cy.get('[data-testid="mode-item-title"]').should('contain','PartyMode1').should('exist').click();
        cy.get('[data-testid="party-mode-page"]').should('exist');
        cy.get('[data-testid="navbar-item-home-page"]').click();

        cy.get('[data-testid="home-page-bank-balance-text"]').should("exist").should('contain', '100.00');

        cy.get('[data-testid="home-page-currency-text"]').should("exist").should('contain', 'PLN');

        cy.get('[data-testid="navbar-item-settings-page"]').click();
        cy.get('[data-testid="user-account-main-panel-default-bank"]').should('exist').should('contain','Pekao');

        cy.get('[data-testid="settings-page-navbar-change-icon"]').click();
        cy.get('[data-testid="navbar-item-transactions-page"]').click();

        cy.get('[data-testid="transaction-split-it-button"]').should('exist');

        //loging out and loging as a second user in integration mode
        cy.get('[data-testid="navbar-item-log-out-button"]').click();
        cy.get('[data-testid="log-out-confirmation-panel-log-out-button"]').click();

        cy.login('user2@example.com', 'User2123!');
        cy.visit('http://localhost:3000/home');

        
        cy.get('[data-testid="mode-item"]').should('exist');
        cy.get('[data-testid="mode-item-title"]').should('contain','PartyMode1').should('exist').click();
        cy.get('[data-testid="party-mode-page"]').should('exist');
        cy.get('[data-testid="navbar-item-home-page"]').click();

        cy.get('[data-testid="home-page-bank-balance-text"]').should("exist").should('contain', '50.00');

        cy.get('[data-testid="home-page-currency-text"]').should("exist").should('contain', 'PLN');

        cy.get('[data-testid="navbar-item-settings-page"]').click();
        cy.get('[data-testid="user-account-main-panel-default-bank"]').should('exist').should('contain','Pekao');

        //checking if its possible to create another party mode when user is already in party mode
        cy.get('[data-testid="settings-page-navbar-change-icon"]').click();
        cy.get('[data-testid="navbar-item-home-page"]').click();
        cy.get('[data-testid="navbar-add-new-mode-button"]').click();
        cy.get('[data-testid="add-party-mode-button"]').click();
        cy.get('[data-testid="party-mode-add-panel-find-your-friends-section-search-field"]').type('user3{enter}{enter}');
        cy.get('[data-testid="party-mode-add-panel-find-your-friends-section-search-field"]').should('contain','user3');
        cy.get('[data-testid="party-mode-add-panel-integrate-accounts-button"]').click();

        cy.get('[data-testid="party-mode-followup-panel-form-budget-name-input-field"]').should('exist').type('PartyMode2');

        cy.get('[data-testid="party-mode-followup-panel-finish-button"]').click();


        cy.get('[data-testid="error-message"]').should('not.exist');

        cy.get('[data-testid="party-mode-followup-panel"]').should('not.exist');

        cy.get('[data-testid="mode-item"]').should('exist');
        cy.get('[data-testid="mode-item"]').should('have.length', 2)
        cy.get('[data-testid="mode-item"]').eq(0).click();
        cy.get('[data-testid="party-mode-page"]').should('exist');
        cy.get('[data-testid="mode-item"]').eq(1).click();
        cy.get('[data-testid="party-mode-page"]').should('exist');
        cy.get('[data-testid="navbar-item-home-page"]').click();

        cy.get('[data-testid="home-page-bank-balance-text"]').should("exist").should('contain', '50.00');

        cy.get('[data-testid="home-page-currency-text"]').should("exist").should('contain', 'PLN');

        cy.get('[data-testid="navbar-item-settings-page"]').click();
        cy.get('[data-testid="user-account-main-panel-default-bank"]').should('exist').should('contain','Pekao');

        cy.get('[data-testid="settings-page-navbar-change-icon"]').click();
        cy.get('[data-testid="navbar-item-transactions-page"]').click();

        cy.get('[data-testid="transaction-split-it-button"]').should('exist');
      });
})

describe('settling bills test', () => {

    beforeEach(() => {

        cy.connectUsers('user1@example.com', 'User1123!', 'user1', 'user2@example.com', 'User2123!', 'user2', 'partner');
        const transactionDate = new Date();
        transactionDate.setDate(transactionDate.getDate() - 1); // always yesterday
        cy.addTransaction('user1@example.com', 'User1123!', 
        -10, 
        'Groceries', 
        transactionDate.toISOString(), 
        'Biedronka');

        cy.addTransaction('user2@example.com', 'User2123!', 
        5, 
        'Job', 
        transactionDate.toISOString(), 
        'Salary');
        cy.login('user1@example.com', 'User1123!');
        cy.visit('http://localhost:3000/home');

    })

    it('checks first panel in settling bills process with chosen option settled in cash ', () => {
        cy.viewport(1280, 720);

        //addind transaction to common budget
        cy.get('[data-testid="navbar-item-transactions-page"]').click();
        cy.get('[data-testid="transaction-split-it-button"]').should('exist').click();

        //loging out and loging as a second user in integration mode
        cy.get('[data-testid="navbar-item-log-out-button"]').click();
        cy.get('[data-testid="log-out-confirmation-panel-log-out-button"]').click();
        cy.login('user2@example.com', 'User2123!');
        cy.visit('http://localhost:3000/home');

        //going to common pannel
        cy.get('[data-testid="mode-item"]').should('exist');
        cy.get('[data-testid="mode-item-title"]').should('contain','TestBudget').should('exist').click();
        cy.get('[data-testid="partner-mode-page"]').should('exist');
        cy.get('[data-testid="transaction"]').should('exist');


        //settle your bills button
        cy.get('[data-testid="partner-mode-page-settle-your-bills-button"]').should('exist').should('contain','Settle your bills').click();

        cy.get('[data-testid="transaction-checkbox-label"]').should('exist').click();

        cy.get('[data-testid="partner-mode-page-settle-your-bills-button"]').click();

        //settle your bills first panel content
        cy.get('[data-testid="settle-your-bills-panel"]').should('exist');
        
        cy.get('[data-testid="settle-your-bills-panel-main-title"]').should('exist').should('contain','Settle Your Bills');
        cy.get('[data-testid="settle-your-bills-panel-subtitle"]').should('exist');

        //settle your bills first panel buttons
        cy.get('[data-testid="settle-your-bills-panel-settled-in-cash-button"]').should('exist').should('contain','Settled in cash').click();
        cy.get('[data-testid="settle-your-bills-panel"]').should('not.exist');

      });

      it('checks first panel in settling bills process with chosen option settled with transactions', () => {
        cy.viewport(1280, 720);

        //addind transaction to common budget
        cy.get('[data-testid="navbar-item-transactions-page"]').click();
        cy.get('[data-testid="transaction-split-it-button"]').should('exist').click();

        //loging out and loging as a second user in integration mode
        cy.get('[data-testid="navbar-item-log-out-button"]').click();
        cy.get('[data-testid="log-out-confirmation-panel-log-out-button"]').click();
        cy.login('user2@example.com', 'User2123!');
        cy.visit('http://localhost:3000/home');

        //going to common pannel
        cy.get('[data-testid="mode-item"]').should('exist');
        cy.get('[data-testid="mode-item-title"]').should('contain','TestBudget').should('exist').click();
        cy.get('[data-testid="partner-mode-page"]').should('exist');
        cy.get('[data-testid="transaction"]').should('exist');


        //settle your bills button
        cy.get('[data-testid="partner-mode-page-settle-your-bills-button"]').should('exist').should('contain','Settle your bills').click();

        cy.get('[data-testid="transaction-checkbox-label"]').should('exist').click();

        cy.get('[data-testid="partner-mode-page-settle-your-bills-button"]').click();

        //settle your bills first panel content
        cy.get('[data-testid="settle-your-bills-panel"]').should('exist');
        
        cy.get('[data-testid="settle-your-bills-panel-main-title"]').should('exist').should('contain','Settle Your Bills');
        cy.get('[data-testid="settle-your-bills-panel-subtitle"]').should('exist');

        //settle your bills first panel buttons
        cy.get('[data-testid="settle-your-bills-panel-settled-with-transactions-button"]').should('exist').should('contain','Settled with transaction').click();


        cy.get('[data-testid="choose-settle-transaction-panel"]').should('exist');

      });


      it('checks panel transaction that settles bill selection', () => {
        cy.viewport(1280, 720);
        Cypress.session.clearAllSavedSessions()

        //addind transaction to common budget
        cy.get('[data-testid="navbar-item-transactions-page"]').click();
        cy.get('[data-testid="transaction-split-it-button"]').click();


        //loging out and loging as a second user in integration mode
        cy.get('[data-testid="navbar-item-log-out-button"]').click();
        cy.get('[data-testid="log-out-confirmation-panel-log-out-button"]').click();
        cy.login('user2@example.com', 'User2123!');
        cy.visit('http://localhost:3000/home');

        //going to common pannel
        cy.get('[data-testid="mode-item-title"]').should('contain','TestBudget').click();

        //settle your bills button
        cy.get('[data-testid="partner-mode-page-settle-your-bills-button"]').click();

        cy.get('[data-testid="transaction-checkbox-label"]').click();

        cy.get('[data-testid="partner-mode-page-settle-your-bills-button"]').click();

        //settle your bills first panel buttons
        cy.get('[data-testid="settle-your-bills-panel-settled-with-transactions-button"]').should('exist').should('contain','Settled with transaction').click();

        cy.get('[data-testid="choose-settle-transaction-panel"]').should('exist');


        //transaction selection panel content
        cy.get('[data-testid="choose-settle-transaction-panel-main-title"]').should('exist').should('contain','Settled with transaction');
        cy.get('[data-testid="choose-settle-transaction-panel-subtitle"]').should('exist');

        cy.get('[data-testid="choose-settle-transaction-panel-transaction-selection-section"]').should('exist');

        cy.get('[data-testid="transaction-checkbox-label"]').should('exist').click();

        cy.get('[data-testid="choose-settle-transaction-panel-cancel-button"]').should('exist');
        cy.get('[data-testid="choose-settle-transaction-panel-finish-button"]').should('exist').click();
        cy.get('[data-testid="choose-settle-transaction-panel-transaction-selection-section"]').should('not.exist');


        //loging out and loging as a second user in integration mode
        cy.get('[data-testid="navbar-item-log-out-button"]').click();
        cy.get('[data-testid="log-out-confirmation-panel-log-out-button"]').click();
        cy.login('user1@example.com', 'User1123!');
        cy.visit('http://localhost:3000/home');
        
        //going to common pannel
        cy.get('[data-testid="mode-item-title"]').should('contain','TestBudget').click();


        cy.get('[data-testid="transaction"]').should('have.class','waiting-for-approval');

      });



      it('checks accepting payback functionality', () => {
        cy.viewport(1280, 720);
        // Cypress.session.clearAllSavedSessions()
        cy.reload();

        //addind transaction to common budget
        cy.get('[data-testid="navbar-item-transactions-page"]').click();
        cy.get('[data-testid="transaction-split-it-button"]').click();


        //loging out and loging as a second user in integration mode
        cy.get('[data-testid="navbar-item-log-out-button"]').click();
        cy.get('[data-testid="log-out-confirmation-panel-log-out-button"]').click();
        cy.login('user2@example.com', 'User2123!');
        cy.visit('http://localhost:3000/home');

        //going to common pannel
        cy.get('[data-testid="mode-item-title"]').should('contain','TestBudget').click();

        //settle your bills button
        cy.get('[data-testid="partner-mode-page-settle-your-bills-button"]').click();

        cy.get('[data-testid="transaction-checkbox-label"]').click();

        cy.get('[data-testid="partner-mode-page-settle-your-bills-button"]').click();

        //settle your bills first panel buttons
        cy.get('[data-testid="settle-your-bills-panel-settled-with-transactions-button"]').should('exist').should('contain','Settled with transaction').click();

        cy.get('[data-testid="choose-settle-transaction-panel"]').should('exist');


        //transaction selection panel content
        cy.get('[data-testid="choose-settle-transaction-panel-main-title"]').should('exist').should('contain','Settled with transaction');
        cy.get('[data-testid="choose-settle-transaction-panel-subtitle"]').should('exist');

        cy.get('[data-testid="choose-settle-transaction-panel-transaction-selection-section"]').should('exist');

        cy.get('[data-testid="transaction-checkbox-label"]').should('exist').click();

        cy.get('[data-testid="choose-settle-transaction-panel-cancel-button"]').should('exist');
        cy.get('[data-testid="choose-settle-transaction-panel-finish-button"]').should('exist').click();
        cy.get('[data-testid="choose-settle-transaction-panel-transaction-selection-section"]').should('not.exist');


        //loging out and loging as a second user in integration mode
        cy.get('[data-testid="navbar-item-log-out-button"]').click();
        cy.get('[data-testid="log-out-confirmation-panel-log-out-button"]').click();
        cy.login('user1@example.com', 'User1123!');
        cy.visit('http://localhost:3000/home');
        
        //going to common pannel
        cy.get('[data-testid="mode-item-title"]').should('contain','TestBudget').click();


        cy.get('[data-testid="debt-panel-amount"]').should('contain', '5.00');
        cy.get('[data-testid="transaction"]').should('have.class','waiting-for-approval').click();

        //approve settle panel content
        
        cy.get('[data-testid="approve-settle-panel"]').should('exist');

        cy.get('[data-testid="approve-settle-panel-main-title"]').should('exist').should('contain','Accept Payback');
        cy.get('[data-testid="approve-settle-panel-user"]').should('exist').should('contain', 'user2');
        cy.get('[data-testid="payback-type-text"').should('contain', 'This transaction was settled with this transaction');

        cy.get('[data-testid="transaction-to-approve"]').should('exist');
        cy.get('[data-testid="transaction-to-approve-type"]').should('exist').should('contain', 'Other');
        cy.get('[data-testid="transaction-to-approve-date"]').should('exist');
        cy.get('[data-testid="transaction-to-approve-amount"]').should('exist').should('contain', '5.00');
        cy.get('[data-testid="transaction-to-approve-currency"]').should('exist').should('contain', 'PLN');

        cy.get('[data-testid="approve-settle-panel-decline-button"]').should('exist');
        cy.get('[data-testid="approve-settle-panel-accept-button"]').should('exist').click();

        cy.get('[data-testid="approve-settle-panel"]').should('not.exist');
        cy.get('[data-testid="debt-panel-amount"]').should('contain', /^0$/);
        cy.get('[data-testid="transaction"]').should('not.exist');
      });

      it('checks declining payback functionality', () => {
        cy.viewport(1280, 720);
        // Cypress.session.clearAllSavedSessions()
        cy.reload();

        //addind transaction to common budget
        cy.get('[data-testid="navbar-item-transactions-page"]').click();
        cy.get('[data-testid="transaction-split-it-button"]').click();


        //loging out and loging as a second user in integration mode
        cy.get('[data-testid="navbar-item-log-out-button"]').click();
        cy.get('[data-testid="log-out-confirmation-panel-log-out-button"]').click();
        cy.login('user2@example.com', 'User2123!');
        cy.visit('http://localhost:3000/home');

        //going to common pannel
        cy.get('[data-testid="mode-item-title"]').should('contain','TestBudget').click();

        //settle your bills button
        cy.get('[data-testid="partner-mode-page-settle-your-bills-button"]').click();

        cy.get('[data-testid="transaction-checkbox-label"]').click();

        cy.get('[data-testid="partner-mode-page-settle-your-bills-button"]').click();

        //settle your bills first panel buttons
        cy.get('[data-testid="settle-your-bills-panel-settled-with-transactions-button"]').should('exist').should('contain','Settled with transaction').click();

        cy.get('[data-testid="choose-settle-transaction-panel"]').should('exist');


        //transaction selection panel content
        cy.get('[data-testid="choose-settle-transaction-panel-main-title"]').should('exist').should('contain','Settled with transaction');
        cy.get('[data-testid="choose-settle-transaction-panel-subtitle"]').should('exist');

        cy.get('[data-testid="choose-settle-transaction-panel-transaction-selection-section"]').should('exist');

        cy.get('[data-testid="transaction-checkbox-label"]').should('exist').click();

        cy.get('[data-testid="choose-settle-transaction-panel-cancel-button"]').should('exist');
        cy.get('[data-testid="choose-settle-transaction-panel-finish-button"]').should('exist').click();
        cy.get('[data-testid="choose-settle-transaction-panel-transaction-selection-section"]').should('not.exist');


        //loging out and loging as a second user in integration mode
        cy.get('[data-testid="navbar-item-log-out-button"]').click();
        cy.get('[data-testid="log-out-confirmation-panel-log-out-button"]').click();
        cy.login('user1@example.com', 'User1123!');
        cy.visit('http://localhost:3000/home');
        
        //going to common pannel
        cy.get('[data-testid="mode-item-title"]').should('contain','TestBudget').click();


        cy.get('[data-testid="debt-panel-amount"]').should('contain', '5.00');
        cy.get('[data-testid="transaction"]').should('have.class','waiting-for-approval').click();

        //approve settle panel content
        
        cy.get('[data-testid="approve-settle-panel"]').should('exist');

        cy.get('[data-testid="approve-settle-panel-main-title"]').should('exist').should('contain','Accept Payback');
        cy.get('[data-testid="approve-settle-panel-user"]').should('exist').should('contain', 'user2');
        cy.get('[data-testid="payback-type-text"').should('contain', 'This transaction was settled with this transaction');

        cy.get('[data-testid="transaction-to-approve"]').should('exist');
        cy.get('[data-testid="transaction-to-approve-type"]').should('exist').should('contain', 'Other');
        cy.get('[data-testid="transaction-to-approve-date"]').should('exist');
        cy.get('[data-testid="transaction-to-approve-amount"]').should('exist').should('contain', '5.00');
        cy.get('[data-testid="transaction-to-approve-currency"]').should('exist').should('contain', 'PLN');

        cy.get('[data-testid="approve-settle-panel-accept-button"]').should('exist');
        cy.get('[data-testid="approve-settle-panel-decline-button"]').should('exist').click();
        
        cy.get('[data-testid="approve-settle-panel"]').should('not.exist');
        cy.get('[data-testid="debt-panel-amount"]').should('contain', /5.00/);
        cy.get('[data-testid="transaction"]').should('exist');
      });
})