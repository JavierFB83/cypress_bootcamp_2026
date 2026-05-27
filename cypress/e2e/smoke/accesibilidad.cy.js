/// <reference types="cypress" />

describe('Accesibilidad - Footer Shop', () => {
  it('La página de productos cumple accesibilidad', () => {
    cy.visit('https://footer-shop.vercel.app/products');
    cy.checkAccessibility();
  });
});

// describe('Accesibilidad - Banco Santander', () => {
//   it('La home de Banco Santander cumple accesibilidad', () => {
//     cy.visit('https://www.bancosantander.es/particulares');
//     cy.checkAccessibility();
//   });
// });

// describe('Accesibilidad - Junta de Andalucía', () => {
//   it('La home de Junta de Andalucía cumple accesibilidad', () => {
//     cy.visit('https://www.juntadeandalucia.es/');
//     cy.checkAccessibility();
//   });
// });
