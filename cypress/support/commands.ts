/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import 'cypress-file-upload';

Cypress.Commands.add("login", (email: string = "user@example.com", password: string = "User123!") => {
    cy.session([email, password], () => {
        cy.visit('http://localhost:3000/register');
        cy.get('[data-testid="email-form-input-field"]').type(email);
        cy.get('[data-testid="email-form-continue-button"]').click();
        cy.get('[data-testid="log-in-form-password-input"]').type(password);
        cy.get('[data-testid="log-in-form-log-in-button"]').click();
        cy.url().should('contain', '/home')
    })
  })

Cypress.Commands.add("deleteIfExists", (email: string = "user@example.com", password: string = "User123!") => {
    cy.visit('http://localhost:3000/register');
    cy.request('GET', `http://localhost:8080/api/users/email-check?email=${email}`).its('body').then((body)=>{
            if (body.userExists)
            {
                cy.request('POST', `http://localhost:8080/api/users/login`, {
                        email: email,
                        password: password
                    }).its('body').then(body=>{
                    cy.request({
                        'method': 'DELETE',
                        'url': 'http://localhost:8080/api/users',
                        'auth':
                        {
                            'bearer': body.token
                        }
                    })
                })
            }
    })
})

Cypress.Commands.add("createIfNotExists", (
        email: string = "user@example.com", 
        password: string = "User123!",
        username: string = "user",
        balance: string = "0",
        bank: string = "Pekao",
        currency: string = "PLN") => {
    cy.visit('http://localhost:3000/register');
    cy.request('GET', `http://localhost:8080/api/users/email-check?email=${email}`).its('body').then((body)=>{
            if (!body.userExists)
            {
                cy.request('POST', 'http://localhost:8080/api/users/register', {
                    email: email,
                    password: password,
                    userName: username
                })
                .then(()=>{
                    cy.request('POST', `http://localhost:8080/api/users/login`, {
                        email: email,
                        password: password
                    }).its('body').then(body=>{
                        cy.request({
                            'method': 'POST',
                            'url': 'http://localhost:8080/api/budgets',
                            'body': {
                                bank: bank,
                                currency: currency,
                                budgetBalance: balance
                            },
                            'auth': {
                                'bearer': body.token
                            }
                        })
                    })
                })
            }
    })
    Cypress.session.clearAllSavedSessions()
})

Cypress.Commands.add("addTransactions", (
        email: string = "user@example.com", 
        password: string = "User123!", 
        bank: string = "Pekao") => {
    let token = ""
    let budgetId = ""
    cy.request('POST', `http://localhost:8080/api/users/login`, {
        email: email,
        password: password
    }).its('body').then(body=>{
        token = body.token
        cy.request({
            'method': 'GET',
            'url': 'http://localhost:8080/api/users/budgets',
            'auth': {'bearer': token}
        }).its('body').then(body=>{
            budgetId = body[0].id
            cy.fixture('bank_test.csv').then((file: any)=>{
                const data = new FormData()
                data.append('csvfile', new Blob([file], { type: 'text/csv' }), 'bank_test.csv');
                cy.request({
                    'method': 'POST',
                    'url': `http://localhost:8080/api/budgets/${budgetId}/transactions/csv?bank=${bank}`,
                    'auth': {'bearer': token},
                    'headers': {
                        "Content-Type": "multipart/form-data"
                    },
                    'body': data
                })
            })
        })
    })
})

Cypress.Commands.add("addTransaction", (
    email: string = "user@example.com", 
    password: string = "User123!", 
    amount: number = 0,
    category: string = "Groceries",
    date: string = "",
    notes: string = "") => {
let token = ""
let budgetId = ""
cy.request('POST', `http://localhost:8080/api/users/login`, {
    email: email,
    password: password
}).its('body').then(body=>{
    token = body.token
    cy.request({
        'method': 'GET',
        'url': 'http://localhost:8080/api/users/budgets',
        'auth': {'bearer': token}
    }).its('body').then(body=>{
        budgetId = body[0].id
        cy.request({
            'method': 'POST',
            'url': `http://localhost:8080/api/budgets/${budgetId}/transactions/`,
            'auth': {'bearer': token},
            'body': {
                "amount": amount,
                "currency": "PLN",
                "date": date,
                "description": notes,
                "transactionType": "Other",
                "userCategory": category
            }
        })
    })
})
})

Cypress.Commands.add("addGoal", (
    email: string = "user@example.com", 
    password: string = "User123!",
    isMain: boolean = false)=>{
        let token = ""
        cy.request('POST', `http://localhost:8080/api/users/login`, {
        email: email,
        password: password
        }).its('body').then(body=>{
            token = body.token;
            cy.request({
                'method': 'POST',
                'url': 'http://localhost:8080/api/goals',
                'auth': {'bearer': token},
                'body': {
                    "amount": 100,
                    "category": "Groceries",
                    "goalType": "AccountBalance",
                    "deadline": "2030-01-01T12:00:00.000Z"
                }
            }).its('body').then(body=>{
                cy.request({
                    'method': 'PUT',
                    'url': `http://localhost:8080/api/goals/${body.id}`,
                    'auth': {'bearer': token},
                    'body': {
                        "isMain": isMain
                    }
                })
            })
    })
})

Cypress.Commands.add("cleanSlate", (
        email: string = "user@example.com", 
        password: string = "User123!",
        username: string = "user",
        balance: string = "0",
        bank: string = "Pekao",
        currency: string = "PLN"
) => {
    cy.deleteIfExists(email, password);
    cy.createIfNotExists(email, password, username, balance, bank, currency);
    cy.login(email, password);
    Cypress.session.clearAllSavedSessions()
})