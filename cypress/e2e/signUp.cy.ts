/// <reference types="cypress" />
import {LOGIN} from "../support/testids/login"


beforeEach(() => {
  cy.visit('http://localhost:3000/')
})

  it.only('Access the Sign Up page and fill in the fields to create a new account', () => {
    cy.get('[data-test="signup"]').should('be.visible').and('have.attr','href','/signup').and('have.text',"Don't have an account? Sign Up")
    cy.get('[data-test="signup"]').should('be.visible').click()

    cy.get('[data-test="signup-title"]').should('be.visible').and('have.text', "Sign Up")

    cy.get('#firstName').should('be.visible').type('Abc')
    cy.get('#lastName').should('be.visible').type('Def')
    cy.get('#username').should('be.visible').type('abc.def')
    cy.get('#password').should('be.visible').type('1234')
    cy.get('#confirmPassword').should('be.visible').type('1234')
    cy.get('[data-test="signup-submit"]').should('be.visible').and('have.text', 'Sign Up').click()

    cy.get(LOGIN.USER_NAME_LOGIN).should('be.visible').type(Cypress.env('username_signup'))
    cy.get(LOGIN.PASSWORD_LOGIN).should('be.visible').type(Cypress.env('password_signup'))
    cy.get(LOGIN.LOGIN_BUTTON).should('be.visible').click()
})