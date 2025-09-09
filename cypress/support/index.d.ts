declare namespace Cypress {
    interface Chainable {
      loginViaUI(email: string, password: string): Chainable<void>;
      loginByAPI(username?: string, password?: string): Chainable<any>;
    }
  }