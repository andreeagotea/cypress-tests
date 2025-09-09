/// <reference types="cypress" />
import {LOGIN} from "../support/testids/login"
import { SIGN_UP } from "../support/testids/signUp"


beforeEach(() => {
  cy.fixture('signUpPage').as('signUp')
  cy.visit('http://localhost:3000/')
})

  it('Access the Sign Up page and fill in the fields to create a new account', function() {
    cy.get(SIGN_UP.SIGN_UP_TEXT).should('be.visible').and('have.attr','href', this.signUp.signUpEndpoint).and('have.text', this.signUp.createAccountTexts)
    cy.get(SIGN_UP.SIGN_UP_TEXT).should('be.visible').click()

    cy.get(SIGN_UP.SIGN_UP_TITLE).should('be.visible').and('have.text', this.signUp.signUpTitle)

    cy.get(SIGN_UP.FIRST_NAME).should('be.visible').clear().type(this.signUp.firstName)
    cy.get(SIGN_UP.LAST_NAME).should('be.visible').clear().type(this.signUp.lastName)
    cy.get(SIGN_UP.USER_NAME).should('be.visible').clear().type(this.signUp.userName)
    cy.get(SIGN_UP.PASSWORD).should('be.visible').clear().type(this.signUp.password)
    cy.get(SIGN_UP.CONFIRM_PASSWORD).should('be.visible').clear().type(this.signUp.confirmationPassword)
    cy.get(SIGN_UP.SUBMIT_BUTTON).should('be.visible').and('have.text', this.signUp.signUpButton).click()

    cy.get(LOGIN.USER_NAME_LOGIN).should('be.visible').type(Cypress.env('username_signup'))
    cy.get(LOGIN.PASSWORD_LOGIN).should('be.visible').type(Cypress.env('password_signup'))
    cy.get(LOGIN.LOGIN_BUTTON).should('be.visible').click()
})