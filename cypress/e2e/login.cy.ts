import { UserData } from "../support/interfaces/UserData";
import { AlertMessagesPage } from "../support/pages/alert-messages-page";
import { LoginPage } from "../support/pages/login-page";
import { NavigationHeaderPage } from "../support/pages/navigation-header-page"

describe('Feature Login', () => {

    beforeEach(() => {
        cy.visit('/')
        NavigationHeaderPage.goToLoginForm();
    })

    it('User should be able to do login with success', () => {
        // Tripple A

        cy.intercept('POST', '/login').as('loginRequest');
        cy.fixture('login/user-data-success.json').then((userData : UserData) => {
            cy.doLogin(userData);
            cy.wait('@loginRequest', {timeout: 20000})

            // Assert
            NavigationHeaderPage.checkUserLoggedIn(userData.name);
        })
        

    })

    it('User should be not able to do login with invalid email', () => {
    
         // Arrange
         const testUserDataWithInvalidEmail: UserData = {
            name: 'Test User',
            email: 'emailnotexist@gmail.com',
            password: '12345678'
        };

         // Act
        LoginPage.doLogin2(testUserDataWithInvalidEmail);

        // Assert
        AlertMessagesPage.checkAlertMessageError('please try with correct email/password');
    })

    it('User should be not able to do login with invalid email - Mocking', () => {
    
        // Arrange
        const testUserDataWithInvalidEmail: UserData = {
            name: 'Test User',
            email: 'testuser@email.com',
            password: 'pass1234'
        };

        // Act
        cy.intercept('POST', '/login', {
            statusCode: 400 ,
            body:{"success":false,"errors":"please try with correct email/password"},
        })
       LoginPage.doLogin2(testUserDataWithInvalidEmail);

       // Assert
       AlertMessagesPage.checkAlertMessageError('please try with correct email/password');
   })
})