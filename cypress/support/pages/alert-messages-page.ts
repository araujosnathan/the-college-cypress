export class AlertMessagesPage {
    private static readonly locators = {
        alertError: '[data-qa-locator="alert-error"]',
        errorMesssage: '[data-qa-locator="alert-error-message"]',
    }

  static checkAlertMessageError(errorMessage: string,){
    cy.get(this.locators.alertError).should('contain', 'Error');
    cy.get(this.locators.errorMesssage).should('contain', errorMessage);
  }

}