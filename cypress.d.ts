/* eslint-disable @typescript-eslint/no-unused-vars */
 
declare namespace Cypress {
    interface Chainable {
        dataCy(value: string): Chainable<JQuery<HTMLElement>>
    }
  }
  export {};
  