import { CredentialsPage } from "./credentials-page";

export class RegisterPage {
    private static readonly locators = {
        inputName: '[data-qa-locator="input-name"]',
    }

  static createAccount(name: string, email: string, password: string){
    cy.get(this.locators.inputName).type(name)
    CredentialsPage.continueAction(email, password)
  }
}