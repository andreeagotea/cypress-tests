/// <reference types="cypress" />

import {LOGIN} from "../support/testids/login"
import { HOMEPAGE } from "../support/testids/homepage"

describe('Test all the homepage elements', () => {

beforeEach(() => {
  cy.fixture('homePage').as('home');
  cy.visit('http://localhost:3000/')
  cy.loginViaUI(Cypress.env('username'), Cypress.env('password'))
  cy.intercept('POST', '/graphql').as('getHomePage');
  cy.wait('@getHomePage').its('response.statusCode').should('eq', 200);
})

  it('Verify tabs tabs from the header', function() {
    cy.get(HOMEPAGE.HOME_SIDERBAR_ICON).should('be.visible')
    cy.get(HOMEPAGE.HOME_SIDERBAR_TEXT).should('be.visible').and('have.text', this.home.home).and('have.attr', 'href', this.home.endpointHome)
    cy.get(HOMEPAGE.HOME_SIDERBAR_TEXT).should('be.visible').click()

    cy.get(HOMEPAGE.EVERYONE_TAB).should('be.visible').and('have.text', this.home.everyone).and('have.attr', 'href', this.home.endpointHome)
    cy.get(HOMEPAGE.FRIENDS_TAB).should('be.visible').and('have.text', this.home.friends).and('have.attr', 'href',  this.home.endpointFriends)
    cy.get(HOMEPAGE.MINE_TAB).should('be.visible').and('have.text', this.home.mine).and('have.attr', 'href', this.home.endpointMine)
})

it('Date picker - open and close', function() {
  cy.get(HOMEPAGE.DATE_PICKER_FILTER).should('be.visible').click({force: true})
  cy.get(HOMEPAGE.TITLE_DATE_PICKER).should('be.visible').and('have.text', this.home.selectDate)
  cy.get(HOMEPAGE.DAY_1_DATE_PICKER).should('be.visible').and('have.text', this.home.sun)
  cy.get(HOMEPAGE.DAY_4_DATE_PICKER).should('be.visible').and('have.text', this.home.wed)
  cy.get(HOMEPAGE.DAY_7_DATE_PICKER).should('be.visible').and('have.text', this.home.sat)
  cy.get('body').type('{esc}');
  cy.get(HOMEPAGE.TITLE_DATE_PICKER).should('not.exist')
})

it('Date picker - selecte a date', function() {
  cy.get(HOMEPAGE.DATE_PICKER_FILTER).should('be.visible').click({force: true})
  cy.get(HOMEPAGE.TITLE_DATE_PICKER).should('be.visible').and('have.text', this.home.selectDate)
  cy.get(HOMEPAGE.DAY_1_DATE_PICKER).should('be.visible').and('have.text', this.home.sun)
  cy.get(HOMEPAGE.SELECTED_DATE1_PICKER).contains(this.home.date1DatePicker).click({force: true})
  cy.get(HOMEPAGE.TEXT_SELECTED_DATE_PICKER).should('be.visible')
})

it('Date picker - select a date range', function() {
  cy.get(HOMEPAGE.DATE_PICKER_FILTER).should('be.visible').click({force: true})
  cy.get(HOMEPAGE.TITLE_DATE_PICKER).should('be.visible').and('have.text', this.home.selectDate)
  cy.get(HOMEPAGE.DAY_1_DATE_PICKER).should('be.visible').and('have.text', this.home.sun)
  cy.get(HOMEPAGE.SELECTED_DATE1_PICKER).contains(this.home.date1DatePicker).click({force: true})
  cy.get(HOMEPAGE.SELECTED_DATE2_PICKER).contains(this.home.date2DatePicker).click({force: true})
  cy.get(HOMEPAGE.TEXT_SELECTED_DATE_PICKER).should('be.visible')
  cy.get(HOMEPAGE.VERIFY_SELECTED_DATE_RANGE_PICKER).should('be.visible')
})

it('Date picker - select a date range and clear selected range', function() {
  cy.get(HOMEPAGE.DATE_PICKER_FILTER).should('be.visible').click({force: true})
  cy.get(HOMEPAGE.TITLE_DATE_PICKER).should('be.visible').and('have.text', this.home.selectDate)
  cy.get(HOMEPAGE.DAY_1_DATE_PICKER).should('be.visible').and('have.text', this.home.sun)
  cy.get(HOMEPAGE.SELECTED_DATE1_PICKER).contains(this.home.date1DatePicker).click({force: true})
  cy.get(HOMEPAGE.SELECTED_DATE2_PICKER).contains(this.home.date2DatePicker).click({force: true})
  cy.get(HOMEPAGE.TEXT_SELECTED_DATE_PICKER).should('be.visible')
  cy.get(HOMEPAGE.VERIFY_SELECTED_DATE_RANGE_PICKER).should('be.visible')
  cy.get(HOMEPAGE.CLEAR_BUTTON_DATE_PICKER).should('be.visible').click({force: true})
})
})