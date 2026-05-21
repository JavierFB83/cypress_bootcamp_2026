import CommonPage from './CommonPage'

class LoginPage extends CommonPage {

  // Acciones
  visit() {
    cy.visit('https://footer-shop.vercel.app/login')
  }

  typeEmail(email) {
    this.getByFormControl('email').type(email)
  }

  typePassword(password) {
    this.getByFormControl('password').type(password)
  }

  clearEmail() {
    this.getByFormControl('email').clear()
  }

  clickSubmit() {
    this.getByType('submit').last().click()
  }

  clickForgotPassword() {
    this.getByRouterLink('/forgot-password').click()
  }

  clickTogglePasswordVisibility() {
    this.getByAriaLabel('Toggle password visibility').click()
  }

  login(email, password) {
    this.typeEmail(email)
    this.typePassword(password)
    this.clickSubmit()
  }
}

export default new LoginPage()
