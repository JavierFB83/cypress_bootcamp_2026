const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");

const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

// wick-a11y: importa las tareas de accesibilidad
const addAccessibilityTasks = require('wick-a11y/accessibility-tasks');

module.exports = defineConfig({
  // Desactiva la seguridad de mismo origen para permitir interactuar con iframes
  // cross-origin de Stripe (checkout.stripe.com ↔ js.stripe.com)
  chromeWebSecurity: false,
  // Modifica el código de terceros (Stripe) que bloquea el renderizado de la página
  // en Cypress. Sin esto, la página de Stripe Checkout muestra solo skeletons
  experimentalModifyObstructiveThirdPartyCode: true,
  // Configuración para pruebas de accesibilidad con wick-a11y
  accessibilityFolder: 'cypress/accessibility',
  // env: { // Opción de voz eliminada por incompatibilidad en Cypress runner
  // },
  e2e: {
    // Soporta tanto archivos .cy.js como .feature
    specPattern: [
      "cypress/e2e/**/*.cy.js",
      "cypress/e2e/**/*.feature",
    ],
    defaultCommandTimeout: 15000,
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);

      await addCucumberPreprocessorPlugin(on, config);

      // wick-a11y: agrega tareas de accesibilidad
      addAccessibilityTasks(on);

      return config;
    },
  },
});
