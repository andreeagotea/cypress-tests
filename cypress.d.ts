declare namespace Cypress {
    interface Chainable {
        dataCy(value: string): Chainable<JQuery<HTMLElement>>
        loginViaUI(email: string, password: string): Chainable<void>
    }
  }
  export {};
  
  declare namespace Cypress {
    interface Chainable<Subject = any> {
      loginByAPI(username?: string, password?: string): Chainable<any>
    }
  }

  declare namespace Cypress {
    interface Chainable {
        dataCy(value: string): Chainable<JQuery<HTMLElement>>
        createNewTransaction(amount: string, note: string, input: string, endpointNewTransaction: string): Chainable<void>
    }
  }