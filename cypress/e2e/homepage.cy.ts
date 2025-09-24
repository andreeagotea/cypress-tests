/// <reference types="cypress" />

import {LOGIN} from "../support/testids/login"
import { HOMEPAGE } from "../support/testids/homepage"
import { TRANSACTION } from "../support/testids/transaction";

describe('Test all the homepage elements', () => {

beforeEach(() => {
  cy.fixture('homePage').as('home');
  cy.fixture('sidebarPage').as('sidebar');
  cy.fixture('transactionPage').as('transaction');
  cy.visit('http://localhost:3000/')
  cy.loginViaUI(Cypress.env('username'), Cypress.env('password'))
  cy.intercept('POST', '/graphql').as('getHomePage');
  cy.wait('@getHomePage').its('response.statusCode').should('eq', 200);
})

  it('Verify tabs from the header', function() {
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

it('Amount filter - set a value and clear it', function() {
  cy.get(HOMEPAGE.PRICE_FILTER).should('be.visible').click({force: true})
  cy.get(HOMEPAGE.TITLE_PRICE_FILTER).should('be.visible').and('have.text', this.home.initialAmount)
  cy.get(HOMEPAGE.CLEAR_BUTTON_PRICE_FILTER).should('be.visible').click({force: true})
  cy.get(HOMEPAGE.AMOUNT_SLIDER).then(($slider) => {
    const slider = $slider[0];
    const rect = slider.getBoundingClientRect();

    const maxValue = 1000; 
    const targetValue = 500; 

    const percent = targetValue / maxValue;

    const xPosition = rect.width * percent;
    const yPosition = rect.height / 2;
    
  cy.get(HOMEPAGE.AMOUNT_SLIDER).click(xPosition, yPosition, { force: true });
  cy.get(HOMEPAGE.TITLE_PRICE_FILTER).should('be.visible').and('have.text', this.home.afterAmount)

  cy.get(HOMEPAGE.LIST_AMOUNT_FILTER).each(($el) => {
    const amountText = $el.text().replace('$', '').replace(',', '').trim();
    const amount = parseFloat(amountText);
    expect(amount).to.be.lte(targetValue); 

  cy.get(HOMEPAGE.CLEAR_BUTTON_PRICE_FILTER).should('be.visible').click({force: true})
  cy.get(HOMEPAGE.TITLE_PRICE_FILTER).should('be.visible').and('have.text', this.home.initialAmount);
});
});
})

it('Amount filter - set a value and clear it - px', function() {
  cy.get(HOMEPAGE.PRICE_FILTER).should('be.visible').click({force: true})
  cy.get(HOMEPAGE.TITLE_PRICE_FILTER).should('be.visible').and('have.text', this.home.initialAmount)
  cy.get(HOMEPAGE.CLEAR_BUTTON_PRICE_FILTER).should('be.visible').click({force: true})
  cy.get('[data-test="transaction-list-filter-amount-range-slider"] .MuiSlider-track')
  .then(($track) => {
    const width = $track.width() ?? 0;
    const xPosition = width - 90; 
    cy.wrap($track).click(xPosition, 5, { force: true });
  });
  cy.get(HOMEPAGE.TITLE_PRICE_FILTER).should('be.visible').and('have.text', this.home.afterAmountPxTest)
})

it('Create new transaction - pay', function() {
  cy.get(HOMEPAGE.HEADER_NEW_TRANSACTION).should('be.visible').and('have.attr', 'href', this.sidebar.endpointNewTransaction)
  cy.get(HOMEPAGE.HEADER_NEW_TRANSACTION).should('be.visible').click()
  cy.url().should('include', this.sidebar.endpointNewTransaction);
  cy.get(TRANSACTION.USER_LIST_ITEM).first().click({ force: true });   
  cy.get(TRANSACTION.TRANSACTION_CREATE_FORM).should('be.visible')   
  cy.get(TRANSACTION.AMOUNT).should('be.visible').clear().type(this.transaction.amount)  
  cy.get(this.transaction.input).should('have.value', `$${this.transaction.amount}`)
  cy.get(TRANSACTION.TRANSACTION_FORM_REQUEST_BUTTON).should('be.disabled')
  cy.get(TRANSACTION.TRANSACTION_FORM_PAYMENT_BUTTON).should('be.disabled')
  cy.get(TRANSACTION.TRANSACTION_FORM_NOTE).should('be.visible').clear().type(this.transaction.note)
  cy.get(TRANSACTION.TRANSACTION_FORM_PAYMENT_BUTTON).should('be.visible').click({ force: true });   
  cy.get('[data-test="alert-bar-success"]').should('be.visible').and('have.text', 'Transaction Submitted!')
  const amountWithoutDecimals = this.transaction.amount.split('.')[0]; 
  cy.contains('Paid').should('be.visible');
  cy.contains(`$${this.transaction.amount}`).should('be.visible');
  cy.contains('for').should('be.visible');
  cy.contains(this.transaction.note).should('be.visible');
  cy.get(TRANSACTION.RETURN_TO_TRANSACTIONS).should('be.visible')
  cy.get(TRANSACTION.CREATE_ANOTHER_TRANSACTION).should('be.visible')
})


it('Create new transaction - request', function() {
  cy.get(HOMEPAGE.HEADER_NEW_TRANSACTION).should('be.visible').and('have.attr', 'href', this.sidebar.endpointNewTransaction)
  cy.get(HOMEPAGE.HEADER_NEW_TRANSACTION).should('be.visible').click()
  cy.url().should('include', this.sidebar.endpointNewTransaction);
  cy.get(TRANSACTION.USER_LIST_ITEM).first().click({ force: true });   
  cy.get(TRANSACTION.TRANSACTION_CREATE_FORM).should('be.visible')   
  cy.get(TRANSACTION.AMOUNT).should('be.visible').clear().type(this.transaction.amount)  
  cy.get(this.transaction.input).should('have.value', `$${this.transaction.amount}`)
  cy.get(TRANSACTION.TRANSACTION_FORM_REQUEST_BUTTON).should('be.disabled')
  cy.get(TRANSACTION.TRANSACTION_FORM_PAYMENT_BUTTON).should('be.disabled')
  cy.get(TRANSACTION.TRANSACTION_FORM_NOTE).should('be.visible').clear().type(this.transaction.note)
  cy.get(TRANSACTION.TRANSACTION_FORM_REQUEST_BUTTON).should('be.visible').click({ force: true });   
  cy.get('[data-test="alert-bar-success"]').should('be.visible').and('have.text', 'Transaction Submitted!')
  const amountWithoutDecimals = this.transaction.amount.split('.')[0]; 
  cy.contains('Requested ').should('be.visible');
  cy.contains(`$${this.transaction.amount}`).should('be.visible');
  cy.contains('for').should('be.visible');
  cy.contains(this.transaction.note).should('be.visible');
  cy.get(TRANSACTION.RETURN_TO_TRANSACTIONS).should('be.visible')
  cy.get(TRANSACTION.CREATE_ANOTHER_TRANSACTION).should('be.visible')
})

it('Create new transaction - empty fields', function() {
  cy.get(HOMEPAGE.HEADER_NEW_TRANSACTION).should('be.visible').and('have.attr', 'href', this.sidebar.endpointNewTransaction)
  cy.get(HOMEPAGE.HEADER_NEW_TRANSACTION).should('be.visible').click()
  cy.url().should('include', this.sidebar.endpointNewTransaction);
  cy.get(TRANSACTION.USER_LIST_ITEM).first().click({ force: true });   
  cy.get(TRANSACTION.TRANSACTION_CREATE_FORM).should('be.visible')   
  cy.get(TRANSACTION.AMOUNT).should('be.visible').click({ force: true })
  cy.get(TRANSACTION.TRANSACTION_CREATE_FORM).should('be.visible').click({ force: true })
  cy.contains(this.transaction.p, this.transaction.amountEmptyField).should('be.visible')
  cy.get(TRANSACTION.TRANSACTION_FORM_NOTE).should('be.visible').click({ force: true })
  cy.get(TRANSACTION.TRANSACTION_CREATE_FORM).should('be.visible').click({ force: true })
  cy.contains(this.transaction.p, this.transaction.noteEmptyField).should('be.visible')
})

it('Return to transactions', function() {
  cy.createNewTransaction(Cypress.env('amount'), Cypress.env('note'), Cypress.env('input'), Cypress.env('endpointNewTransaction'))
  cy.get(TRANSACTION.RETURN_TO_TRANSACTIONS).should('be.visible').click()
  cy.get(HOMEPAGE.EVERYONE_TAB).should('be.visible').and('have.text', this.home.everyone).and('have.attr', 'href', this.home.endpointHome)
})

it('Create another transaction', function() {
  cy.createNewTransaction(Cypress.env('amount'), Cypress.env('note'), Cypress.env('input'), Cypress.env('endpointNewTransaction'))
  cy.get(TRANSACTION.CREATE_ANOTHER_TRANSACTION).should('be.visible').click()
  cy.get(HOMEPAGE.HEADER_NEW_TRANSACTION).should('be.visible').and('have.attr', 'href', this.sidebar.endpointNewTransaction)
})

it.only('Transaction Detail - "Mine" tab', function() {
  cy.get(HOMEPAGE.HEADER_NEW_TRANSACTION).should('be.visible').and('have.attr', 'href', this.sidebar.endpointNewTransaction)
  cy.get(HOMEPAGE.HEADER_NEW_TRANSACTION).should('be.visible').click()
  cy.url().should('include', this.sidebar.endpointNewTransaction);
  cy.get(TRANSACTION.USER_LIST_ITEM).first().click({ force: true });   
  cy.get(TRANSACTION.TRANSACTION_CREATE_FORM).should('be.visible')   
  cy.get(TRANSACTION.AMOUNT).should('be.visible').clear().type(this.transaction.amount)  
  cy.get(this.transaction.input).should('have.value', `$${this.transaction.amount}`)
  cy.get(TRANSACTION.TRANSACTION_FORM_REQUEST_BUTTON).should('be.disabled')
  cy.get(TRANSACTION.TRANSACTION_FORM_PAYMENT_BUTTON).should('be.disabled')
  cy.get(TRANSACTION.TRANSACTION_FORM_NOTE).should('be.visible').clear().type(this.transaction.note)
  cy.get(TRANSACTION.TRANSACTION_FORM_PAYMENT_BUTTON).should('be.visible').click({ force: true });   
  cy.get(TRANSACTION.TRANSACTION_SUBMITTED_MESSAGE).should('be.visible').and('have.text', this.transaction.transactionSubmittedMessage)
  const amountWithoutDecimals = this.transaction.amount.split('.')[0]; 
  cy.contains('Paid').should('be.visible');
  cy.contains(`$${this.transaction.amount}`).should('be.visible');
  cy.contains('for').should('be.visible');
  cy.contains(this.transaction.note).should('be.visible');
  cy.get(TRANSACTION.RETURN_TO_TRANSACTIONS).should('be.visible')
  cy.get(TRANSACTION.CREATE_ANOTHER_TRANSACTION).should('be.visible')
  cy.get(HOMEPAGE.HOME_SIDERBAR_TEXT).should('be.visible').and('have.text','Home').and('have.attr', 'href', this.home.endpointHome).click()
  cy.get(HOMEPAGE.MINE_TAB).should('be.visible').and('have.text', this.home.mine).and('have.attr', 'href', this.home.endpointMine).click()
  cy.get(TRANSACTION.TRANSACTIONS_MINE_TAB).first().click({ force: true });
  cy.get('[data-test="transaction-detail-header"]').should('be.visible').and('have.text', 'Transaction Detail')
  cy.contains('[data-test^="transaction-amount-"]', `-$${this.transaction.amount}`).should('be.visible');})
})


// it.only('Add comment', function() {
//   cy.createNewTransaction(Cypress.env('amount'), Cypress.env('note'), Cypress.env('input'), Cypress.env('endpointNewTransaction'))
//   cy.get(TRANSACTION.RETURN_TO_TRANSACTIONS).should('be.visible').click()
//   cy.get(HOMEPAGE.EVERYONE_TAB).should('be.visible').and('have.text', this.home.everyone).and('have.attr', 'href', this.home.endpointHome)
// })