/// <reference types="cypress" />

import { HOMEPAGE } from "../support/testids/homepage"
import {LOGIN} from "../support/testids/login"
import {LOGOUT} from "../support/testids/logout"
import cypress from "cypress"

describe('Test all the sidebar elements', () => {

beforeEach(() => {
  cy.visit('http://localhost:3000/')
  cy.get(LOGIN.USER_NAME_LOGIN).should('be.visible').type(Cypress.env('username'))
  cy.get(LOGIN.PASSWORD_LOGIN).should('be.visible').type(Cypress.env('password'))
  cy.get(LOGIN.LOGIN_BUTTON).should('be.visible').click()
})

  it('Verify Header', () => {
  cy.get(HOMEPAGE.TOGGLE_SIDERBAR).should('be.visible')
  cy.get(HOMEPAGE.HEADER_TITLE).should('be.visible')
  cy.get(HOMEPAGE.HEADER_NEW_TRANSACTION).should('be.visible').and('have.attr', 'href', '/transaction/new')
  cy.get(HOMEPAGE.HEADER_NOTIFICATIONS).should('be.visible').and('have.attr', 'href', '/notifications')
  })

  it('Verify sidebar', () => {
    // Avatar & User Info
    cy.get(HOMEPAGE.AVATAR_IMAGE).should('be.visible').and('have.attr', 'src','https://avatars.dicebear.com/api/human/GjWovtg2hr.svg')
    cy.get(HOMEPAGE.FULL_NAME_SIDERBAR).should('be.visible').and('have.text','Kristian B')
    cy.get(HOMEPAGE.USERNAME_SIDERBAR).should('be.visible').and('have.text','@Arvilla_Hegmann')

    // Account Balance
    cy.get(HOMEPAGE.ACCOUNT_BALANCE_SIDERBAR).should('be.visible').and('have.text','Account Balance')
  
    // Home
    cy.get(HOMEPAGE.HOME_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.HOME_SIDERBAR_TEXT).should('be.visible').and('have.text','Home').and('have.attr', 'href', '/')
  })

  // My  Account
  it('My Account', () => {
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').and('have.text','My Account')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', '/settings');
  })

  // Bank Accounts
  it('Bank Accounts', () => {
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_TEXT).should('be.visible').and('have.text','Bank Accounts')
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', '/bankaccounts');
  })

  // Notifications
  it('Notifications', () => {
    cy.get(HOMEPAGE.NOTIFICATIONS_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.NOTIFICATIONS_SIDERBAR_TEXT).should('be.visible').and('have.text','Notifications')
    cy.get(HOMEPAGE.NOTIFICATIONS_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', '/notifications');
  })

  // Siderbar toggle
  it('Siderbar toggle', () => {
    cy.get(HOMEPAGE.TOGGLE_SIDERBAR).should('be.visible')
    cy.get(HOMEPAGE.TOGGLE_SIDERBAR).should('be.visible').click()
    cy.get(HOMEPAGE.HOME_SIDERBAR_TEXT).should('not.be.visible').and('have.text','Home')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('not.be.visible').and('have.text','My Account')    
  })

  // Logout
  it('Logout', () => {
    cy.get(LOGOUT.LOGOUT_SIDERBAR_ICON).should('be.visible')
    cy.get(LOGOUT.LOGOUT_SIDERBAR_TEXT).should('be.visible').and('have.text','Logout')
    cy.get(LOGOUT.LOGOUT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', '/signin');
})
})