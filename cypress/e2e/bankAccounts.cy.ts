/// <reference types="cypress" />
import {LOGIN} from "../support/testids/login"
import { HOMEPAGE } from "../support/testids/homepage"
import { BANK_ACCOUNTS } from "../support/testids/bankAccounts"

beforeEach(() => {
  cy.visit('http://localhost:3000/')
  cy.get(LOGIN.USER_NAME_LOGIN).should('be.visible').type(Cypress.env('username'))
  cy.get(LOGIN.PASSWORD_LOGIN).should('be.visible').type(Cypress.env('password'))
  cy.get(LOGIN.LOGIN_BUTTON).should('be.visible').click()
})

  it('Access Bank Accounts page', () => {
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_TEXT).should('be.visible').and('have.text','Bank Accounts')
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', '/bankaccounts');
  })

  it('Create Bank Account', () => {
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_TEXT).should('be.visible').and('have.text','Bank Accounts')
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', '/bankaccounts');

    cy.contains('h2', 'Bank Accounts').should('be.visible')
    cy.get(BANK_ACCOUNTS.NEW_ACCOUNT).should('be.visible')
    cy.get(BANK_ACCOUNTS.NEW_ACCOUNT).should('be.visible').click()

    cy.contains('h2', 'Create Bank Account').should('be.visible')
    cy.get(BANK_ACCOUNTS.BANK_ACCOUNT_FORM).should('be.visible')
    cy.get(BANK_ACCOUNTS.BANK_NAME).should('be.visible').type('Test1')
    cy.get(BANK_ACCOUNTS.ROUTING_NUMBER).should('be.visible').type('123456789')
    cy.get(BANK_ACCOUNTS.ACCOUNT_NUMBER).should('be.visible').type('987654321')
    cy.get(BANK_ACCOUNTS.SAVE_BUTTON).should('be.visible').click()

    cy.contains('p','Test1').should('be.visible')
  })

  it.only('Delete Bank Account', () => {
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_TEXT).should('be.visible').and('have.text','Bank Accounts')
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', '/bankaccounts');

    cy.contains('h2', 'Bank Accounts').should('be.visible')
    cy.get(BANK_ACCOUNTS.NEW_ACCOUNT).should('be.visible')
    cy.get(BANK_ACCOUNTS.NEW_ACCOUNT).should('be.visible').click()

    cy.contains('h2', 'Create Bank Account').should('be.visible')
    cy.get(BANK_ACCOUNTS.BANK_ACCOUNT_FORM).should('be.visible')
    cy.get(BANK_ACCOUNTS.BANK_NAME).should('be.visible').type('Test123')
    cy.get(BANK_ACCOUNTS.ROUTING_NUMBER).should('be.visible').type('123456789')
    cy.get(BANK_ACCOUNTS.ACCOUNT_NUMBER).should('be.visible').type('987654321')
    cy.get(BANK_ACCOUNTS.SAVE_BUTTON).should('be.visible').click()

    cy.contains('p','Test123').should('be.visible')
  })

  