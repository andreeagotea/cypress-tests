/// <reference types="cypress" />

import {LOGIN} from "../support/testids/login"
import { HOMEPAGE } from "../support/testids/homepage"

describe('Test all the homepage elements', () => {

beforeEach(() => {
  cy.visit('http://localhost:3000/')
  cy.get(LOGIN.USER_NAME_LOGIN).should('be.visible').type(Cypress.env('username'))
  cy.get(LOGIN.PASSWORD_LOGIN).should('be.visible').type(Cypress.env('password'))
  cy.get(LOGIN.LOGIN_BUTTON).should('be.visible').click()
})

  it('Verify tabs tabs from the header', () => {
    cy.get(HOMEPAGE.HOME_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.HOME_SIDERBAR_TEXT).should('be.visible').and('have.text','Home').and('have.attr', 'href', '/')
    cy.get(HOMEPAGE.HOME_SIDERBAR_TEXT).should('be.visible').click()

    cy.get(HOMEPAGE.EVERYONE_TAB).should('be.visible').and('have.text','Everyone').and('have.attr', 'href', '/')
    cy.get(HOMEPAGE.FRIENDS_TAB).should('be.visible').and('have.text','Friends').and('have.attr', 'href', '/contacts')
    cy.get(HOMEPAGE.MINE_TAB).should('be.visible').and('have.text','Mine').and('have.attr', 'href', '/personal')
})

it('Date picker - open and close', () => {
  cy.get(HOMEPAGE.DATE_PICKER_FILTER).should('be.visible').click({force: true})
  cy.get(HOMEPAGE.TITLE_DATE_PICKER).should('be.visible').and('have.text', 'Select a date...')
  cy.get(HOMEPAGE.DAY_1_DATE_PICKER).should('be.visible').and('have.text', 'Sun')
  cy.get(HOMEPAGE.DAY_4_DATE_PICKER).should('be.visible').and('have.text', 'Wed')
  cy.get(HOMEPAGE.DAY_7_DATE_PICKER).should('be.visible').and('have.text', 'Sat')
  cy.get('body').type('{esc}');
  cy.get(HOMEPAGE.TITLE_DATE_PICKER).should('not.exist')
})

it('Date picker - selecte a date', () => {
  cy.get(HOMEPAGE.DATE_PICKER_FILTER).should('be.visible').click({force: true})
  cy.get(HOMEPAGE.TITLE_DATE_PICKER).should('be.visible').and('have.text', 'Select a date...')
  cy.get(HOMEPAGE.DAY_1_DATE_PICKER).should('be.visible').and('have.text', 'Sun')
  cy.get(HOMEPAGE.SELECTED_DATE1_PICKER).contains('20').click({force: true})
  cy.get(HOMEPAGE.TEXT_SELECTED_DATE_PICKER).should('be.visible')
})

it('Date picker - select a date range', () => {
  cy.get(HOMEPAGE.DATE_PICKER_FILTER).should('be.visible').click({force: true})
  cy.get(HOMEPAGE.TITLE_DATE_PICKER).should('be.visible').and('have.text', 'Select a date...')
  cy.get(HOMEPAGE.DAY_1_DATE_PICKER).should('be.visible').and('have.text', 'Sun')
  cy.get(HOMEPAGE.SELECTED_DATE1_PICKER).contains('20').click({force: true})
  cy.get(HOMEPAGE.SELECTED_DATE2_PICKER).contains('25').click({force: true})
  cy.get(HOMEPAGE.TEXT_SELECTED_DATE_PICKER).should('be.visible')
  cy.get(HOMEPAGE.VERIFY_SELECTED_DATE_RANGE_PICKER).should('be.visible')
})

it('Date picker - select a date range and clear selected range', () => {
  cy.get(HOMEPAGE.DATE_PICKER_FILTER).should('be.visible').click({force: true})
  cy.get(HOMEPAGE.TITLE_DATE_PICKER).should('be.visible').and('have.text', 'Select a date...')
  cy.get(HOMEPAGE.DAY_1_DATE_PICKER).should('be.visible').and('have.text', 'Sun')
  cy.get(HOMEPAGE.SELECTED_DATE1_PICKER).contains('20').click({force: true})
  cy.get(HOMEPAGE.SELECTED_DATE2_PICKER).contains('25').click({force: true})
  cy.get(HOMEPAGE.TEXT_SELECTED_DATE_PICKER).should('be.visible')
  cy.get(HOMEPAGE.VERIFY_SELECTED_DATE_RANGE_PICKER).should('be.visible')
  cy.get(HOMEPAGE.CLEAR_BUTTON_DATE_PICKER).should('be.visible').click({force: true})
})
})