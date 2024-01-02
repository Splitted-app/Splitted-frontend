describe('settings page navbar content test', () => {

    beforeEach(() => {
        cy.createIfNotExists('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");
        cy.login('user@example.com', 'User123!');
        cy.visit('http://localhost:3000/settings');

    })

    it('checks whether content of transactions page shows correctly', () => {
        cy.viewport(1550, 890);

        //checking if good navbar is showing
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


describe('account page content test', () =>{
    beforeEach(() => {
        cy.cleanSlate('user@example.com', 'User123!', "user", "1000", "Pekao", "PLN");        
        cy.login('user@example.com', 'User123!');
        cy.visit('http://localhost:3000/settings');

    })
    it('checks whether content of account page in settings shows properly', () => {
        cy.viewport(1550, 890);

        //checking if account button on settings navbar works properly
        cy.get('[data-testid="settings-page-navbar-account-page-button"]').should('exist').should('contain', 'Account');
        cy.get('[data-testid="settings-page-navbar-account-page-button"]').click();
        cy.get('[data-testid="account-page"]').should('exist');


        //checking content of account page

        //header content
        cy.get('[data-testid="account-page-main-title"]').should('exist').should('contain','Account');
        cy.get('[data-testid="account-page-subtitle"]').should('exist').should('contain','user@example.com');

        cy.get('[data-testid="account-page-user-panel"]').should('exist');
        cy.get('[data-testid="user-account-panel-username"]').should('exist').should('contain','user');
        cy.get('[data-testid="user-account-panel-avatar"]').should('exist');


        //main content

        cy.get('[data-testid="user-account-main-panel"]').should('exist');

        cy.get('[data-testid="user-account-main-panel-avatar-image"]').should('exist');
        cy.get('[data-testid="user-account-main-panel-username"]').should('exist').should('contain','user');

        cy.get('[data-testid="user-account-main-panel-budget-balance"]').should('exist').should('contain','1000');
        cy.get('[data-testid="user-account-main-panel-default-bank"]').should('exist').should('contain','Pekao');
        cy.get('[data-testid="user-account-main-panel-default-currency"]').should('exist').should('contain','PLN');

        //main content edit button

        cy.get('[data-testid="user-account-main-panel-edit-button"]').should('exist');
        cy.get('[data-testid="user-account-main-panel-edit-button-icon"]').should('exist');


        cy.get('[data-testid="user-account-main-panel-edit-button"]').click();

        cy.get('[data-testid="avatar-image-input-field"]').should('exist');
        cy.get('[data-testid="user-account-main-panel-bank-select-field"]').should('exist');
        cy.get('[data-testid="currency-select"]').should('exist');

        //change in edit mode
        cy.get('[data-testid="user-account-main-panel-bank-select-field"]').select('Pko');

        cy.get('[data-testid="user-account-main-panel-edit-button"]').click();

        cy.get('[data-testid="user-account-main-panel-default-bank"]').should('contain','Pko');

    })
})

describe('delete account test', () => {
    beforeEach(() => {
        cy.createIfNotExists('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");
        cy.login('user@example.com', 'User123!');
        cy.visit('http://localhost:3000/settings');

    })
    
    it('checks whether delete account button works properly', () => {
        cy.viewport(1550, 890);

        //checking delete account button
        cy.get('[data-testid="delete-account-button"]').should('exist').should('contain','Delete account').click();

        //checking if delete account confirmation panel is visible
        cy.get('[data-testid="delete-account-confirmation-panel"]').should('exist');

        //checking content of delete account confirmation panel

        cy.get('[data-testid="delete-account-confirmation-panel-main-title"]').should('exist').should('contain', 'Delete account');
        cy.get('[data-testid="delete-account-confirmation-panel-subtitle"]').should('exist');

        cy.get('[data-testid="delete-account-confirmation-panel-cancel-button"]').should('exist').should('contain','Cancel');
        cy.get('[data-testid="delete-account-confirmation-panel-delete-account-button"]').should('exist').should('contain','Delete Account');

        //checking functionality of cancel button


        cy.get('[data-testid="delete-account-confirmation-panel-cancel-button"]').click();
        cy.get('[data-testid="delete-account-confirmation-panel"]').should('not.exist');

        //loging out
        cy.get('[data-testid="settings-page-navbar-change-icon"]').click();
        cy.get('[data-testid="navbar-item-log-out-button"]').click();
        cy.get('[data-testid="log-out-confirmation-panel-log-out-button"]').click();

        //checking if user can log in

        cy.login('user@example.com', 'User123!');

        //checking functionality of delete account button
        cy.visit('http://localhost:3000/settings');        
        cy.get('[data-testid="delete-account-button"]').click();
        cy.get('[data-testid="delete-account-confirmation-panel-delete-account-button"]').click();
        cy.url().should('contain', '/')
        cy.get('[data-testid="start-page-button"]').click();
        cy.get('[data-testid="email-form-input-field"]').type('user@example.com');
        cy.get('[data-testid="email-form-continue-button"]').click();
        cy.get('[data-testid="sign-up-form-sign-up-button"]').should("exist").invoke('attr', 'value').should('contain', 'Sign Up');

    })

})
