import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    setupNodeEvents() {
      // implement node event listeners here
    },
    env: {
      apiUrl: 'http://localhost:3001',
      defaultUsername: 'Arvilla_Hegmann',
      defaultPassword: 's3cret'
    }
  },
})
