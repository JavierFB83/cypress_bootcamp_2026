import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../support/pages/LoginPage";
import HomePage from "../../support/pages/HomePage";
import ProductDetailPage from "../../support/pages/ProductDetailPage";

// ── Background ──

Given(
  "el usuario inicia sesión con {string} y {string}",
  (email, password) => {
    LoginPage.visit();
    LoginPage.login(email, password);
  }
);

Given("el toast de login exitoso aparece y desaparece", () => {
  cy.get("app-toast").should("contain", "Inicio de sesión exitoso");
  cy.get("app-toast", { timeout: 20000 }).should("not.be.visible");
});

// ── Acciones (When) ──

When("el usuario busca y selecciona el producto {string}", (productName) => {
  HomePage.navigateToProduct(productName);
});

When("el usuario selecciona la talla {string}", (size) => {
  ProductDetailPage.selectSize(size);
  cy.contains("button", "Añadir a la cesta").should("be.enabled");
});

When("el usuario añade el producto al carrito", () => {
  ProductDetailPage.clickAddToCart();
});

When("el usuario va al carrito", () => {
  ProductDetailPage.getByHref("/cart").click();
});

When("el usuario elimina el primer producto del carrito", () => {
  cy.get('[aria-label="Eliminar producto"]').first().click();
});

When("el usuario aumenta la cantidad del producto", () => {
  cy.get('[aria-label="Aumentar cantidad"]').click();
});

When("el usuario reduce la cantidad del producto", () => {
  cy.get('[aria-label="Reducir cantidad"]').click();
});

// ── Verificaciones (Then) ──

Then("el título del producto es {string}", (name) => {
  cy.get("h1").should("contain", name);
});

Then("el título de la página es {string}", (title) => {
  cy.get("h1").should("contain", title);
});

Then("el producto {string} está en el carrito", (productName) => {
  cy.contains(productName).should("be.visible");
});

Then("el resumen del pedido es visible", () => {
  cy.contains("h2", "Resumen del Pedido").should("be.visible");
});

Then("se muestra {string}", (text) => {
  cy.contains(text).should("be.visible");
});

Then("hay {int} botones de eliminar producto", (count) => {
  cy.get('[aria-label="Eliminar producto"]').should("have.length", count);
});

Then("el carrito está vacío", () => {
  cy.contains("h2", "Tu cesta está vacía").should("be.visible");
});

Then("el botón {string} está deshabilitado", (text) => {
  cy.contains("button", text).should("be.disabled");
});

Then("la opción de envío {string} es visible", (option) => {
  cy.contains(option).should("be.visible");
});
