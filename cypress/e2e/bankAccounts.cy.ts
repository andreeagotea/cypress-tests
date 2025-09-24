/// <reference types="cypress" />
import {LOGIN} from "../support/testids/login"
import { HOMEPAGE } from "../support/testids/homepage"
import { BANK_ACCOUNTS } from "../support/testids/bankAccounts"

beforeEach(() => {
  cy.fixture('bankAccountsPage').as('bank');
  // cy.loginByAPI('Arvilla_Hegmann', 's3cret')
  // cy.visit('http://localhost:3000/')
  // // cy.intercept('POST', '/graphql').as('getHomePage');
  // cy.wait('@getHomePage').its('response.statusCode').should('eq', 200);
  cy.visit('http://localhost:3000/')
  cy.get(LOGIN.USER_NAME_LOGIN).should('be.visible').type(Cypress.env('username'))
  cy.get(LOGIN.PASSWORD_LOGIN).should('be.visible').type(Cypress.env('password'))
  cy.get(LOGIN.LOGIN_BUTTON).should('be.visible').click()
})

  it('Access Bank Accounts page', function() {
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_TEXT).should('be.visible').and('have.text', this.bank.bankAccounts)
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', this.bank.endpointBankAccounts);
  })

  it('Create Bank Account', function() {
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_TEXT).should('be.visible').and('have.text', this.bank.bankAccounts)
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', this.bank.endpointBankAccounts);

    cy.contains(this.bank.h2, this.bank.bankAccounts).should('be.visible')
    cy.get(BANK_ACCOUNTS.NEW_ACCOUNT).should('be.visible')
    cy.get(BANK_ACCOUNTS.NEW_ACCOUNT).should('be.visible').click({force: true})

    cy.contains(this.bank.h2, this.bank.createBankAccount).should('be.visible')
    cy.get(BANK_ACCOUNTS.BANK_ACCOUNT_FORM).should('be.visible')
    cy.get(BANK_ACCOUNTS.BANK_NAME).should('be.visible').clear().type(this.bank.bankName)
    cy.get(BANK_ACCOUNTS.ROUTING_NUMBER).should('be.visible').clear().type(this.bank.routingNumber)
    cy.get(BANK_ACCOUNTS.ACCOUNT_NUMBER).should('be.visible').clear().type(this.bank.accountNumber)
    cy.get(BANK_ACCOUNTS.SAVE_BUTTON).should('be.visible').click()

    cy.contains(this.bank.p, this.bank.bankName).should('be.visible')
  })

  it('Delete Bank Account', function() {
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_TEXT).should('be.visible').and('have.text', this.bank.bankAccounts)
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', this.bank.endpointBankAccounts);

    cy.contains(this.bank.h2, this.bank.bankAccounts).should('be.visible')
    cy.get(BANK_ACCOUNTS.NEW_ACCOUNT).should('be.visible')
    cy.get(BANK_ACCOUNTS.NEW_ACCOUNT).scrollIntoView().should('be.visible').click({force: true})

    cy.contains(this.bank.h2, this.bank.createBankAccount).should('be.visible')
    cy.get(BANK_ACCOUNTS.BANK_ACCOUNT_FORM).should('be.visible')
    cy.get(BANK_ACCOUNTS.BANK_NAME).should('be.visible').clear().type(this.bank.bankName)
    cy.get(BANK_ACCOUNTS.ROUTING_NUMBER).should('be.visible').clear().type(this.bank.routingNumber)
    cy.get(BANK_ACCOUNTS.ACCOUNT_NUMBER).should('be.visible').clear().type(this.bank.accountNumber)
    cy.get(BANK_ACCOUNTS.SAVE_BUTTON).should('be.visible').click()

    cy.contains(this.bank.p, this.bank.bankName).should('be.visible')
  })