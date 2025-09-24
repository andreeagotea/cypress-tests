
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
import { HOMEPAGE } from "../support/testids/homepage"
import { TRANSACTION } from "../support/testids/transaction"

Cypress.Commands.add('loginViaUI', (email: string, password: string) => {
    cy.get(LOGIN.USER_NAME_LOGIN).should('be.visible').type(email)
    cy.get(LOGIN.PASSWORD_LOGIN).should('be.visible').type(password)
    cy.get(LOGIN.LOGIN_BUTTON).should('be.visible').click()
})
// Cypress.Commands.add('loginByAPI', (username, password = Cypress.env("defaultPassword")) => {
//     const loginApiUrl = `${Cypress.env('apiUrl')}/login`;
//     const targetAppHost = Cypress.env('apiUrl'); // e.g. http://localhost:3001
  
//     cy.request({
//       method: 'POST',
//       url: loginApiUrl,
//       body: { username, password },
//       followRedirect: false,
//     }).then((response) => {
//       expect(response.status).to.eq(200);
  
//       const setCookieHeader = response.headers['set-cookie'];
//       const sessionCookie = Array.isArray(setCookieHeader) 
//         ? setCookieHeader.find((c: string) => c.startsWith('connect.sid'))
//         : setCookieHeader?.startsWith('connect.sid') ? setCookieHeader : undefined;
  
//       if (sessionCookie) {
//         const match = sessionCookie.match(/^(connect\.sid)=([^;]+)/);
//         if (match) {
//           const [, name, value] = match;
//           // Store the session cookie for API requests
//           Cypress.env('sessionCookie', `${name}=${value}`);
          
//           // Use cy.origin for cross-origin navigation with cookie injection
//           cy.origin(targetAppHost, { args: { cookieName: name, cookieValue: value } }, ({ cookieName, cookieValue }) => {
//             cy.on('window:before:load', (win) => {
//               win.document.cookie = `${cookieName}=${cookieValue}`;
//             });
//             cy.visit('/');
//           });
//         }
//       }
//     });
//   });

// // Helper function to make authenticated API requests
// Cypress.Commands.add('authenticatedRequest', (options) => {
//   const sessionCookie = Cypress.env('sessionCookie');
  
//   if (!sessionCookie) {
//     throw new Error('No session cookie found. Please login first using cy.loginByApi()');
//   }

//   const requestOptions = {
//     ...options,
//     headers: {
//       ...options.headers,
//       'Cookie': sessionCookie
//     }
//   };

//   return cy.request(requestOptions);
// });

// // Helper function to construct API URLs with base URL
// Cypress.Commands.add('apiUrl', (endpoint: string) => {
//   const baseUrl = Cypress.env('apiUrl');
//   if (!baseUrl) {
//     throw new Error('apiUrl environment variable is not set');
//   }
  
//   // Ensure endpoint starts with /
//   const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
//   return cy.wrap(`${baseUrl}${normalizedEndpoint}`);
// });

Cypress.Commands.add('createNewTransaction', (amount: string, note: string, input: string, endpointNewTransaction: string) => {
  cy.get(HOMEPAGE.HEADER_NEW_TRANSACTION).should('be.visible').and('have.attr', 'href', endpointNewTransaction)
  cy.get(HOMEPAGE.HEADER_NEW_TRANSACTION).should('be.visible').click()
  cy.url().should('include', endpointNewTransaction);
  cy.get(TRANSACTION.USER_LIST_ITEM).first().click({ force: true });   
  cy.get(TRANSACTION.TRANSACTION_CREATE_FORM).should('be.visible')   
  cy.get(TRANSACTION.AMOUNT).should('be.visible').clear().type(amount)  
  cy.get(input).should('have.value', `$${amount}`)
  cy.get(TRANSACTION.TRANSACTION_FORM_REQUEST_BUTTON).should('be.disabled')
  cy.get(TRANSACTION.TRANSACTION_FORM_PAYMENT_BUTTON).should('be.disabled')
  cy.get(TRANSACTION.TRANSACTION_FORM_NOTE).should('be.visible').clear().type(note)
  cy.get(TRANSACTION.TRANSACTION_FORM_PAYMENT_BUTTON).should('be.visible').click({ force: true });   
  cy.get('[data-test="alert-bar-success"]').should('be.visible').and('have.text', 'Transaction Submitted!')
  const amountWithoutDecimals = amount.split('.')[0]; 
  cy.contains('Paid').should('be.visible');
  cy.contains(`$${amount}`).should('be.visible');
  cy.contains('for').should('be.visible');
  cy.contains(note).should('be.visible');
  cy.get(TRANSACTION.RETURN_TO_TRANSACTIONS).should('be.visible')
  cy.get(TRANSACTION.CREATE_ANOTHER_TRANSACTION).should('be.visible')
})