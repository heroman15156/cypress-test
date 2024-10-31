export class LoginPage {
  static emailInput = '[data-testid="email-input"]';
  static passwordInput = '[data-testid="password-input"]';
  static submitButton = '[data-testid="submit-button"]';
  static emailError = '[data-testid="email-error"]';
  static passwordError = '[data-testid="password-error"]';
  static errorMessage = '[data-testid="error-message"]';

  static typeEmail(email: string) {
    cy.get(this.emailInput).type(email);
  }

  static typePassword(password: string) {
    cy.get(this.passwordInput).type(password);
  }

  static submit() {
    cy.get(this.submitButton).click();
  }
}
