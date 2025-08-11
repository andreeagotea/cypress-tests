declare namespace Cypress {
    interface Chainable {
        dataCy(value: string): Chainable<JQuery<HTMLElement>>
    }
  }
  export {};
  