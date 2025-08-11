/// <reference types="cypress" />

describe('Test all the homepage elements', () => {

beforeEach(() => {
  cy.visit('http://localhost:3000/')
  cy.get('#username').should('be.visible').type('Arvilla_Hegmann')
  cy.get('#password').should('be.visible').type('s3cret')
  cy.get('[data-test="signin-submit"]').should('be.visible').click()
})

  it('Verify sidebar', () => {
    // Avatar & User Info
    cy.get('.MuiAvatar-img').should('be.visible').and('have.attr', 'src','https://avatars.dicebear.com/api/human/GjWovtg2hr.svg')
    cy.get('[data-test="sidenav-user-full-name"]').should('be.visible').and('have.text','Kristian B')
    cy.get('[data-test="sidenav-username"]').should('be.visible').and('have.text','@Arvilla_Hegmann')

    // Account Balance
    cy.get(':nth-child(1) > .MuiTypography-subtitle2').should('be.visible').and('have.text','Account Balance')
  
    // Home
    cy.get('[data-test="sidenav-home"] > .MuiListItemIcon-root').should('be.visible')
    cy.get('[data-test="sidenav-home"]').should('be.visible').and('have.text','Home')

    // My Account
    cy.get('[data-test="sidenav-user-settings"] > .MuiListItemIcon-root').should('be.visible')
    cy.get('[data-test="sidenav-user-settings"]').should('be.visible').and('have.text','My Account')
    cy.get('[data-test="sidenav-user-settings"]').should('be.visible').click()
    cy.url().should('include', '/settings');

    // Bank Accounts
    cy.get('[data-test="sidenav-bankaccounts"] > .MuiListItemIcon-root').should('be.visible')
    cy.get('[data-test="sidenav-bankaccounts"]').should('be.visible').and('have.text','Bank Accounts')
    cy.get('[data-test="sidenav-bankaccounts"]').should('be.visible').click()
    cy.url().should('include', '/bankaccounts');
   
    // Notifications
    cy.get('[data-test="sidenav-notifications"] > .MuiListItemIcon-root').should('be.visible')
    cy.get('[data-test="sidenav-notifications"]').should('be.visible').and('have.text','Notifications')
    cy.get('[data-test="sidenav-notifications"]').should('be.visible').click()
    cy.url().should('include', '/notifications');
  })

  it('Logout', () => {
    cy.get('[data-test="sidenav-signout"] > .MuiListItemIcon-root').should('be.visible')
    cy.get('[data-test="sidenav-signout"]').should('be.visible').and('have.text','Logout')
    cy.get('[data-test="sidenav-signout"]').should('be.visible').click()
    cy.url().should('include', '/signin');
})
})