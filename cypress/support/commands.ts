
// ******Cypress.Commands.add('loginViaUI', (email: string, password: string) => 
// *****************************************
// This example commands.js shows you how to
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
import {LOGIN} from "../support/testids/login"

Cypress.Commands.add('loginViaUI', (email: string, password: string) => {
    cy.get(LOGIN.USER_NAME_LOGIN).should('be.visible').type(email)
    cy.get(LOGIN.PASSWORD_LOGIN).should('be.visible').type(password)
    cy.get(LOGIN.LOGIN_BUTTON).should('be.visible').click()
})

Cypress.Commands.add('loginByAPI', (username = Cypress.env('defaultUsername'), password = Cypress.env('defaultPassword')) => {
    return cy.request('POST', `${Cypress.env("apiUrl")}/login`, {
        username,
        password,
    })
}
)

