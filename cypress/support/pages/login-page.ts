import { UserData } from "../interfaces/UserData";
import { CredentialsPage } from "./credentials-page";

export class LoginPage {
    private static readonly locators = {
        registerLink: '[data-qa-locator="register-link"]',
    }

    static goTocreateAccount(){
        cy.get(this.locators.registerLink).click()
    }

    static doLogin(email: string, password: string){
        CredentialsPage.continueAction(email, password)
    }

    static doLogin2(testUserData: UserData){
        CredentialsPage.continueAction(testUserData.email, testUserData.password)

    }
}