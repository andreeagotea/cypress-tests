/// <reference types="cypress" />
import {LOGIN} from "../support/testids/login"
import { HOMEPAGE } from "../support/testids/homepage"
import { MY_ACCOUNT } from "../support/testids/myAccount"


beforeEach(() => {
  cy.fixture('myAccountPage').as('myAccount');
  cy.visit('http://localhost:3000/')
  cy.get(LOGIN.USER_NAME_LOGIN).should('be.visible').type(Cypress.env('username'))
  cy.get(LOGIN.PASSWORD_LOGIN).should('be.visible').type(Cypress.env('password'))
  cy.get(LOGIN.LOGIN_BUTTON).should('be.visible').click()
})

it('Access My Account page', function() {
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').and('have.text', this.myAccount.myAccount)
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', this.myAccount.endpointMyAccount);
})

it('Update fields with valid data & verify updated fields', function() {
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').and('have.text', this.myAccount.myAccount)
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', this.myAccount.endpointMyAccount);

    cy.get(MY_ACCOUNT.FIRST_NAME_FIELD).should('be.visible').clear().type(this.myAccount.firstName)
    cy.get(MY_ACCOUNT.LAST_NAME_FIELD).should('be.visible').clear().type(this.myAccount.lastName)
    cy.get(MY_ACCOUNT.EMAIL_FIELD).should('be.visible').clear().type(this.myAccount.email)
    cy.get(MY_ACCOUNT.PHONE_FIELD).should('be.visible').clear().type(this.myAccount.phoneNumber)
    cy.get(MY_ACCOUNT.SAVE_BUTTON_MY_ACCOUNT_FORM).should('be.visible').click()

    cy.get(MY_ACCOUNT.FIRST_NAME_FIELD).should('be.visible').and('have.value', this.myAccount.firstName)
    cy.get(MY_ACCOUNT.LAST_NAME_FIELD).should('be.visible').and('have.value', this.myAccount.lastName)
    cy.get(MY_ACCOUNT.EMAIL_FIELD).should('be.visible').and('have.value', this.myAccount.email)
    cy.get(MY_ACCOUNT.PHONE_FIELD).should('be.visible').and('have.value', this.myAccount.phoneNumber)
})

it('Not change data when clicking Save button without edits', function() {
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').and('have.text', this.myAccount.myAccount)
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', this.myAccount.endpointMyAccount);

    cy.get(MY_ACCOUNT.SAVE_BUTTON_MY_ACCOUNT_FORM).should('be.visible').click()

    cy.get(MY_ACCOUNT.FIRST_NAME_FIELD).should('be.visible').and('have.value', this.myAccount.firstName)
    cy.get(MY_ACCOUNT.LAST_NAME_FIELD).should('be.visible').and('have.value', this.myAccount.lastName)
    cy.get(MY_ACCOUNT.EMAIL_FIELD).should('be.visible').and('have.value', this.myAccount.email)
    cy.get(MY_ACCOUNT.PHONE_FIELD).should('be.visible').and('have.value', this.myAccount.phoneNumber)
})

it('First Name field is empty', function() {
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').and('have.text', this.myAccount.myAccount)
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', this.myAccount.endpointMyAccount);

    cy.get(MY_ACCOUNT.FIRST_NAME_FIELD).should('be.visible').clear()
    cy.get(MY_ACCOUNT.ERROR_MESSAGE_FIRST_NAME_FIELD).should('be.visible').and('have.text', this.myAccount.errorMessageFirstNameField)

    cy.get(MY_ACCOUNT.SAVE_BUTTON_MY_ACCOUNT_FORM).should('be.disabled')
})

it('Error when email format is invalid', function() {
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').and('have.text', this.myAccount.myAccount)
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', this.myAccount.endpointMyAccount);

    cy.get(MY_ACCOUNT.FIRST_NAME_FIELD).should('be.visible').clear().type(this.myAccount.firstName)
    cy.get(MY_ACCOUNT.EMAIL_FIELD).should('be.visible').clear().type(this.myAccount.invalidEmail)
    cy.get(MY_ACCOUNT.ERROR_MESSAGE_EMAIL_FIELD).should('be.visible').and('have.text', this.myAccount.errorMessageEmailField)

    cy.get(MY_ACCOUNT.SAVE_BUTTON_MY_ACCOUNT_FORM).should('be.disabled')
})


it('Error when phone format is invalid', function() {
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').and('have.text', this.myAccount.myAccount)
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', this.myAccount.endpointMyAccount);

    cy.get(MY_ACCOUNT.EMAIL_FIELD).should('be.visible').clear().type(this.myAccount.email)
    cy.get(MY_ACCOUNT.PHONE_FIELD).should('be.visible').clear().type(this.myAccount.invalidPhoneNumber)

    cy.get(MY_ACCOUNT.ERROR_MESSAGE_PHONE_FIELD).should('be.visible').and('have.text', this.myAccount.errorMessagePhoneField)

    cy.get(MY_ACCOUNT.SAVE_BUTTON_MY_ACCOUNT_FORM).should('be.disabled')
})

it('Fill in the fields, save and refresh the page. ', function() {
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').and('have.text', this.myAccount.myAccount)
    cy.get(HOMEPAGE.MY_ACCOUNT_SIDERBAR_TEXT).should('be.visible').click()
    cy.url().should('include', this.myAccount.endpointMyAccount);

    cy.get(MY_ACCOUNT.FIRST_NAME_FIELD).should('be.visible').clear().type(this.myAccount.firstName)
    cy.get(MY_ACCOUNT.LAST_NAME_FIELD).should('be.visible').clear().type(this.myAccount.lastName)
    cy.get(MY_ACCOUNT.EMAIL_FIELD).should('be.visible').clear().type(this.myAccount.email)
    cy.get(MY_ACCOUNT.PHONE_FIELD).should('be.visible').clear().type(this.myAccount.phoneNumber)
    cy.get(MY_ACCOUNT.SAVE_BUTTON_MY_ACCOUNT_FORM).should('be.visible').click()

    cy.reload()

    cy.get(MY_ACCOUNT.FIRST_NAME_FIELD).should('be.visible').and('have.value', this.myAccount.firstName)
    cy.get(MY_ACCOUNT.LAST_NAME_FIELD).should('be.visible').and('have.value', this.myAccount.lastName)
    cy.get(MY_ACCOUNT.EMAIL_FIELD).should('be.visible').and('have.value', this.myAccount.email)
    cy.get(MY_ACCOUNT.PHONE_FIELD).should('be.visible').and('have.value',this.myAccount.phoneNumber)
})
