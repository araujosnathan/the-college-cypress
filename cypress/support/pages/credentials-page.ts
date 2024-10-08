export class CredentialsPage {
    private static readonly locators = {
        inputEmail: '[data-qa-locator="input-email"]',
        inputPassword: '[data-qa-locator="input-passord"]',
        continueButton: '[data-qa-locator="continue-button"]'
    }

  static continueAction(email: string, password: string){
    cy.get(this.locators.inputEmail).type(email)
    cy.get(this.locators.inputPassword).type(password)
    cy.get(this.locators.continueButton).click()
  }

  static getAllLocators(){
    return this.locators;
  }



}