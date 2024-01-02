describe('email form test', () => {

    it('checks behaviour of email form with wrong input', () => {
      cy.visit('http://localhost:3000/register');
  
      cy.get('[data-testid="email-form-input-field"]').should("exist").invoke('attr', 'placeholder').should('contain', 'email');
      cy.get('[data-testid="email-form-input-field"]').type('wrong email');
      
      cy.get('[data-testid="email-form-continue-button"]').should("exist").invoke('attr', 'value').should('contain', 'Continue');
      cy.get('[data-testid="email-form-continue-button"]').click();

      cy.url().should('include', "/register");

      cy.get('[data-testid="error-message"]').should("exist").should('contain','Invalid Email');
    });
    it('checks behaviour of email form with existing user', () => {
      cy.createIfNotExists('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");
      cy.visit('http://localhost:3000/register');
  
      cy.get('[data-testid="email-form-input-field"]').type('user@example.com');
      
      cy.get('[data-testid="email-form-continue-button"]').click();

      cy.url().should('include', "/register");
      cy.get('[data-testid="log-in-form-password-input"]').should("exist").invoke('attr', 'placeholder').should('contain', 'password');
      cy.get('[data-testid="log-in-form-log-in-button"]').should("exist").invoke('attr', 'value').should('contain', 'Log In');

    });
    it('checks behaviour of email form with new user', () => {
        cy.deleteIfExists('newUser@example.com', 'NewUser123!');
        cy.visit('http://localhost:3000/register');
    
        cy.get('[data-testid="email-form-input-field"]').type('newUser@example.com');
        
        cy.get('[data-testid="email-form-continue-button"]').click();
  
        cy.url().should('include', "/register");
        cy.get('[data-testid="sign-up-form-password-input"]').should("exist").invoke('attr', 'placeholder').should('contain', 'password');
        cy.get('[data-testid="sign-up-form-username-input"]').should("exist").invoke('attr', 'placeholder').should('contain', 'nickname');
        cy.get('[data-testid="sign-up-form-sign-up-button"]').should("exist").invoke('attr', 'value').should('contain', 'Sign Up');
  
      });
  })


  describe('log in form test', () => {
    it('checks behaviour of log in form with correct data', () => {
      cy.createIfNotExists('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");

      //filling out email form
      cy.visit('http://localhost:3000/register');
  
      cy.get('[data-testid="email-form-input-field"]').type('user@example.com');
      
      cy.get('[data-testid="email-form-continue-button"]').click();

      //checking content of log in form
      cy.get('[data-testid="log-in-form-email-input"]').should("exist").should('have.value','user@example.com');
      cy.get('[data-testid="log-in-form-email-input"]').should('be.disabled');

      cy.get('[data-testid="log-in-form-password-input"]').should("exist").invoke('attr', 'placeholder').should('contain', 'password');
      cy.get('[data-testid="log-in-form-password-input"]').type('User123!');

      cy.get('[data-testid="log-in-form-log-in-button"]').should("exist").invoke('attr', 'value').should('contain', 'Log In');
  
      //checking log in button functionality

      cy.get('[data-testid="log-in-form-log-in-button"]').click();
      cy.url().should('include', "/home");

    })

    it('checks behaviour of log in form with incorrect data', () => {
      cy.createIfNotExists('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");

      //filling out email form
      cy.visit('http://localhost:3000/register');
  
      cy.get('[data-testid="email-form-input-field"]').type('user@example.com');
      
      cy.get('[data-testid="email-form-continue-button"]').click();

      //checking content of log in form
      cy.get('[data-testid="log-in-form-email-input"]').should("exist").should('have.value','user@example.com');
      cy.get('[data-testid="log-in-form-email-input"]').should('be.disabled');

      cy.get('[data-testid="log-in-form-password-input"]').should("exist").invoke('attr', 'placeholder').should('contain', 'password');
      cy.get('[data-testid="log-in-form-password-input"]').type('IncorrectPassword');

      cy.get('[data-testid="log-in-form-log-in-button"]').should("exist").invoke('attr', 'value').should('contain', 'Log In');
  
      //checking log in button functionality

      cy.get('[data-testid="log-in-form-log-in-button"]').click();
      cy.get('[data-testid="log-in-form-incorrect-password-error-info"]').should("exist").should('contain','Invalid Email or Password');
      cy.url().should('include', "/register");

    })
  })


  describe('sign up form test', () => {
    it('checks behaviour of sign up form with correct data', () => {
      cy.deleteIfExists('newUser@example.com', 'NewUser123!');

      //filling out email form
      cy.visit('http://localhost:3000/register');
  
      cy.get('[data-testid="email-form-input-field"]').type('newUser@example.com');
      
      cy.get('[data-testid="email-form-continue-button"]').click();

      //checking content of sign up form
      cy.get('[data-testid="sign-up-form-email-input"]').should("exist").should('have.value','newUser@example.com');
      cy.get('[data-testid="sign-up-form-email-input"]').should('be.disabled');

      cy.get('[data-testid="sign-up-form-password-input"]').should("exist").invoke('attr', 'placeholder').should('contain', 'password');
      cy.get('[data-testid="sign-up-form-password-input"]').type('NewUser123!');


      cy.get('[data-testid="sign-up-form-username-input"]').should("exist").invoke('attr', 'placeholder').should('contain', 'nickname');

      cy.get('[data-testid="sign-up-form-username-input"]').type('newUser');


      cy.get('[data-testid="sign-up-form-sign-up-button"]').should("exist").invoke('attr', 'value').should('contain', 'Sign Up');
  
      //checking sign up button functionality

      cy.get('[data-testid="sign-up-form-sign-up-button"]').click();
      cy.url().should('include', "/home");

      cy.get('[data-testid="signup-followup-form"]').should("exist");
      //checkign sign up follow up content
      cy.get('[data-testid="signup-followup-form-title"]').should("exist").should('contain','Before you begin');

      cy.get('[data-testid="signup-followup-form-bank-select"]').should("exist").select('Pekao');
      cy.get('[data-testid="signup-followup-form-bank-balance-input"]').should("exist").type('1000');
      cy.get('[data-testid="currency-select"]').should("exist").select('PLN');

      //checking sign up follow up button functionality
      cy.get('[data-testid="signup-followup-form-button"]').should("exist").should('contain','Finish').click();
      cy.get('[data-testid="signup-followup-form"]').should("not.exist")

    })
  })