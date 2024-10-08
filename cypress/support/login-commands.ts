/// <reference types="cypress" />

import { UserData } from "./interfaces/UserData";
import { credentialsPagelocators } from "./pages/credentials-locators";
import { CredentialsPage } from "./pages/credentials-page";

export {}

declare global {
    namespace Cypress {
      interface Chainable {
        doLogin: typeof doLogin
      }
    }
}

// const locators = {
//     inputEmail: '[data-qa-locator="input-email"]',
//     inputPassword: '[data-qa-locator="input-passord"]',
//     continueButton: '[data-qa-locator="continue-button"]'
// }

// const locators = CredentialsPage.getAllLocators();


function doLogin(testUserData: UserData){
    cy.log("Do Login Command")
    cy.get(credentialsPagelocators.inputEmail).type(testUserData.email)
    cy.get(credentialsPagelocators.inputPassword).type(testUserData.password)
    cy.get(credentialsPagelocators.continueButton).click()
}

Cypress.Commands.add('doLogin', doLogin);