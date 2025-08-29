/// <reference types="cypress" />
import {LOGIN} from "../support/testids/login"
import { HOMEPAGE } from "../support/testids/homepage"
import { MY_ACCOUNT } from "../support/testids/myAccount"


beforeEach(() => {
  cy.visit('http://localhost:3000/')
  cy.get(LOGIN.USER_NAME_LOGIN).should('be.visible').type(Cypress.env('username'))
  cy.get(LOGIN.PASSWORD_LOGIN).should('be.visible').type(Cypress.env('password'))
  cy.get(LOGIN.LOGIN_BUTTON).should('be.visible').click()
})

it('Access My Account page', () => {
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').and('have.text','My Account')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', '/settings');
})

it('Update fields with valid data & verify updated fields', () => {
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').and('have.text','My Account')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', '/settings');

    cy.get(MY_ACCOUNT.FIRST_NAME_FIELD).should('be.visible').clear().type('Andreea')
    cy.get(MY_ACCOUNT.LAST_NAME_FIELD).should('be.visible').clear().type('Gotea')
    cy.get(MY_ACCOUNT.EMAIL_FIELD).should('be.visible').clear().type('goteaandreea@gmail.com')
    cy.get(MY_ACCOUNT.PHONE_FIELD).should('be.visible').clear().type('0765357890')
    cy.get(MY_ACCOUNT.SAVE_BUTTON_MY_ACCOUNT_FORM).should('be.visible').click()

    cy.get(MY_ACCOUNT.FIRST_NAME_FIELD).should('be.visible').and('have.value', 'Andreea')
    cy.get(MY_ACCOUNT.LAST_NAME_FIELD).should('be.visible').and('have.value', 'Gotea')
    cy.get(MY_ACCOUNT.EMAIL_FIELD).should('be.visible').and('have.value', 'goteaandreea@gmail.com')
    cy.get(MY_ACCOUNT.PHONE_FIELD).should('be.visible').and('have.value','0765357890')
})

it('Not change data when clicking Save button without edits', () => {
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').and('have.text','My Account')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', '/settings');

    cy.get(MY_ACCOUNT.SAVE_BUTTON_MY_ACCOUNT_FORM).should('be.visible').click()

    cy.get(MY_ACCOUNT.FIRST_NAME_FIELD).should('be.visible').and('have.value', 'Andreea')
    cy.get(MY_ACCOUNT.LAST_NAME_FIELD).should('be.visible').and('have.value', 'Gotea')
    cy.get(MY_ACCOUNT.EMAIL_FIELD).should('be.visible').and('have.value', 'goteaandreea@gmail.com')
    cy.get(MY_ACCOUNT.PHONE_FIELD).should('be.visible').and('have.value','0765357890')
})

it('First Name field is empty', () => {
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').and('have.text','My Account')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', '/settings');

    cy.get(MY_ACCOUNT.FIRST_NAME_FIELD).should('be.visible').clear()
    cy.get(MY_ACCOUNT.ERROR_MESSAGE_FIRST_NAME_FIELD).should('be.visible').and('have.text', 'Enter a first name')

    cy.get(MY_ACCOUNT.SAVE_BUTTON_MY_ACCOUNT_FORM).should('be.disabled')
})

it('Error when email format is invalid', () => {
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').and('have.text','My Account')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', '/settings');

    cy.get(MY_ACCOUNT.FIRST_NAME_FIELD).should('be.visible').clear().type('Andreea')
    cy.get(MY_ACCOUNT.EMAIL_FIELD).should('be.visible').clear().type('goteaandreeagmail.com')
    cy.get(MY_ACCOUNT.ERROR_MESSAGE_EMAIL_FIELD).should('be.visible').and('have.text', 'Must contain a valid email address')

    cy.get(MY_ACCOUNT.SAVE_BUTTON_MY_ACCOUNT_FORM).should('be.disabled')
})


it('Error when phone format is invalid', () => {
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').and('have.text','My Account')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', '/settings');

    cy.get(MY_ACCOUNT.EMAIL_FIELD).should('be.visible').clear().type('goteaandreea@gmail.com')
    cy.get(MY_ACCOUNT.PHONE_FIELD).should('be.visible').clear().type('rrfrfrf444')

    cy.get(MY_ACCOUNT.ERROR_MESSAGE_PHONE_FIELD).should('be.visible').and('have.text', 'Phone number is not valid')

    cy.get(MY_ACCOUNT.SAVE_BUTTON_MY_ACCOUNT_FORM).should('be.disabled')
})

it('Fill in the fields, save and refresh the page. ', () => {
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').and('have.text','My Account')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', '/settings');

    cy.get(MY_ACCOUNT.FIRST_NAME_FIELD).should('be.visible').clear().type('Andreea')
    cy.get(MY_ACCOUNT.LAST_NAME_FIELD).should('be.visible').clear().type('Gotea')
    cy.get(MY_ACCOUNT.EMAIL_FIELD).should('be.visible').clear().type('goteaandreea@gmail.com')
    cy.get(MY_ACCOUNT.PHONE_FIELD).should('be.visible').clear().type('0765357890')
    cy.get(MY_ACCOUNT.SAVE_BUTTON_MY_ACCOUNT_FORM).should('be.visible').click()

    cy.reload()

    cy.get(MY_ACCOUNT.FIRST_NAME_FIELD).should('be.visible').and('have.value', 'Andreea')
    cy.get(MY_ACCOUNT.LAST_NAME_FIELD).should('be.visible').and('have.value', 'Gotea')
    cy.get(MY_ACCOUNT.EMAIL_FIELD).should('be.visible').and('have.value', 'goteaandreea@gmail.com')
    cy.get(MY_ACCOUNT.PHONE_FIELD).should('be.visible').and('have.value','0765357890')
})
