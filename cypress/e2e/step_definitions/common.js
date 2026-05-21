import { Then } from "@badeball/cypress-cucumber-preprocessor";

// ── Steps compartidos entre múltiples features ──

Then("aparece el toast {string}", (message) => {
  cy.get("app-toast").should("contain", message);
});

Then("el toast desaparece", () => {
  cy.get("app-toast", { timeout: 20000 }).should("not.be.visible");
});

Then("la URL contiene {string}", (path) => {
  cy.url().should("include", path);
});
