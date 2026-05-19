class CommonPage {

  // Métodos genéricos de selección
  getByAriaLabel(label) {
    return cy.get(`[aria-label="${label}"]`)
  }

  getByHref(path) {
    return cy.get(`a[href="${path}"]`)
  }

  getByType(type) {
    return cy.get(`[type="${type}"]`)
  }

  getByPlaceholder(placeholder) {
    return cy.get(`[placeholder="${placeholder}"]`)
  }

  getByFormControl(name) {
    return cy.get(`[formcontrolname="${name}"]`)
  }

  getByRouterLink(route) {
    return cy.get(`[routerlink="${route}"]`)
  }

  // Acciones comunes
  searchProduct(term) {
    cy.get('input[name="search"]').clear().type(term + '{enter}')
  }

  clickPage(pageNumber) {
    this.getByAriaLabel(`Ir a la página ${pageNumber}`).click()
  }

  clickProductCard(productName) {
    cy.contains('app-product-card', productName).click()
  }

  navigateToProduct(productName) {
    this.searchProduct(productName)
    this.clickProductCard(productName)
  }

}

export default CommonPage
