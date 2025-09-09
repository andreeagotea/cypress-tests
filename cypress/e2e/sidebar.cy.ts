/// <reference types="cypress" />

import { HOMEPAGE } from "../support/testids/homepage"
import {LOGIN} from "../support/testids/login"
import {LOGOUT} from "../support/testids/logout"
import cypress from "cypress"

describe('Test all the sidebar elements', () => {

beforeEach(() => {
  cy.fixture('sidebarPage').as('sidebar');
  cy.fixture('homePage').as('home');
  cy.fixture('myAccountPage').as('myAccount');
  cy.fixture('bankAccountsPage').as('bank');
  cy.fixture('notificationsPage').as('notification');
  cy.fixture('logoutPage').as('logout');
  cy.visit('http://localhost:3000/')
  cy.get(LOGIN.USER_NAME_LOGIN).should('be.visible').type(Cypress.env('username'))
  cy.get(LOGIN.PASSWORD_LOGIN).should('be.visible').type(Cypress.env('password'))
  cy.get(LOGIN.LOGIN_BUTTON).should('be.visible').click()
})

  it('Verify Header', function() {
  cy.get(HOMEPAGE.TOGGLE_SIDERBAR).should('be.visible')
  cy.get(HOMEPAGE.HEADER_TITLE).should('be.visible')
  cy.get(HOMEPAGE.HEADER_NEW_TRANSACTION).should('be.visible').and('have.attr', 'href', this.sidebar.endpointNewTransaction)
  cy.get(HOMEPAGE.HEADER_NOTIFICATIONS).should('be.visible').and('have.attr', 'href', this.sidebar.endpointNotifications)
  })

  it('Verify sidebar', function() {
    // Avatar & User Info
    cy.get(HOMEPAGE.AVATAR_IMAGE).should('be.visible').and('have.attr', 'src', 'https://avatars.dicebear.com/api/human/GjWovtg2hr.svg')
    cy.get(HOMEPAGE.FULL_NAME_SIDERBAR).should('be.visible').and('have.text', this.sidebar.fullName)
    cy.get(HOMEPAGE.USERNAME_SIDERBAR).should('be.visible').and('have.text', this.sidebar.userName)

    // Account Balance
    cy.get(HOMEPAGE.ACCOUNT_BALANCE_SIDERBAR).should('be.visible').and('have.text', this.sidebar.accountBalance)
  
    // Home
    cy.get(HOMEPAGE.HOME_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.HOME_SIDERBAR_TEXT).should('be.visible').and('have.text','Home').and('have.attr', 'href', this.home.endpointHome)
  })

  // My  Account
  it('My Account', function() {
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').and('have.text', this.myAccount.myAccount)
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', this.myAccount.endpointMyAccount);
  })

  // Bank Accounts
  it('Bank Accounts', function() {
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_TEXT).should('be.visible').and('have.text', this.bank.bankAccounts)
    cy.get(HOMEPAGE.BANK_ACCOUNTS_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', this.bank.endpointBankAccounts);
  })

  // Notifications
  it('Notifications', function() {
    cy.get(HOMEPAGE.NOTIFICATIONS_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.NOTIFICATIONS_SIDERBAR_TEXT).should('be.visible').and('have.text', this.notification.notifications)
    cy.get(HOMEPAGE.NOTIFICATIONS_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', this.notification.endpointNotifications);
  })

  // Siderbar toggle
  it('Siderbar toggle', function() {
    cy.get(HOMEPAGE.TOGGLE_SIDERBAR).should('be.visible')
    cy.get(HOMEPAGE.TOGGLE_SIDERBAR).should('be.visible').click()
    cy.get(HOMEPAGE.HOME_SIDERBAR_TEXT).should('not.be.visible').and('have.text', this.home.home)
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('not.be.visible').and('have.text', this.myAccount.myAccount)    
  })

  // Logout
  it('Logout', function() {
    cy.get(LOGOUT.LOGOUT_SIDERBAR_ICON).should('be.visible')
    cy.get(LOGOUT.LOGOUT_SIDERBAR_TEXT).should('be.visible').and('have.text', this.logout.logout)
    cy.get(LOGOUT.LOGOUT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', this.logout.endpointLogout);
})
})