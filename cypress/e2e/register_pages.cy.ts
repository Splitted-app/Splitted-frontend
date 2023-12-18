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
      cy.visit('http://localhost:3000/register');
  
      cy.get('[data-testid="email-form-input-field"]').type('user@example.com');
      
      cy.get('[data-testid="email-form-continue-button"]').click();

      cy.url().should('include', "/register");
      cy.get('[data-testid="log-in-form-password-input"]').should("exist").invoke('attr', 'placeholder').should('contain', 'password');
      cy.get('[data-testid="log-in-form-log-in-button"]').should("exist").invoke('attr', 'value').should('contain', 'Log In');

    });
    it('checks behaviour of email form with new user', () => {
        cy.visit('http://localhost:3000/register');
    
        cy.get('[data-testid="email-form-input-field"]').type('newUser@example.com');
        
        cy.get('[data-testid="email-form-continue-button"]').click();
  
        cy.url().should('include', "/register");
        cy.get('[data-testid="sign-up-form-password-input"]').should("exist").invoke('attr', 'placeholder').should('contain', 'password');
        cy.get('[data-testid="sign-up-form-username-input"]').should("exist").invoke('attr', 'placeholder').should('contain', 'nickname');
        cy.get('[data-testid="sign-up-form-sign-up-button"]').should("exist").invoke('attr', 'value').should('contain', 'Sign Up');
  
      });
  })