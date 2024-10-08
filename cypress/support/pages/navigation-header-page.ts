export class NavigationHeaderPage {
    private static readonly locators = {
        loginButton: '[data-qa-label="button-login"]',
        userNameLabel: '[class="nav-login-cart"] p'
    }

    static goToLoginForm(){
        cy.get(this.locators.loginButton).click()
    }

    static checkUserLoggedIn(expectedUserName: string){
        cy.get(this.locators.userNameLabel).should('contain', expectedUserName)
    }
}