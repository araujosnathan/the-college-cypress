import { faker } from '@faker-js/faker';
import { NavigationHeaderPage } from '../support/pages/navigation-header-page';
import { LoginPage } from '../support/pages/login-page'
import { RegisterPage } from '../support/pages/register-page';
import { UserData } from '../support/interfaces/UserData';

describe('Feature Register', () => {
  beforeEach(() =>{
    cy.fixture('register/user-data-success.json').then((userData : UserData) => {
      cy.deleteUser(userData.email);
    })
  })
  it('User should be able to register with success', () => {
    // Tripple A

    // Arrange 
    cy.visit('/')
    NavigationHeaderPage.goToLoginForm()
    LoginPage.goTocreateAccount()

    // Act 

    // const timestamp = Date.now();
  //   cy.fixture('register/user-data-success.json').then((userData : UserData) => {
      

  //     // RegisterPage.createAccount('Nathan Tester', `meuemail${timestamp}@gmail.com`, '12345678');
  //     RegisterPage.createAccount(userData.name, userData.email.replace('{timestamp}', timestamp.toString()), userData.password);


  //     // Assert
  //     NavigationHeaderPage.checkUserLoggedIn(userData.name);
      
  // })

    cy.fixture('register/user-data-success.json').then((userData : UserData) => {
          // RegisterPage.createAccount('Nathan Tester', `meuemail${timestamp}@gmail.com`, '12345678');
          RegisterPage.createAccount(userData.name, userData.email, userData.password);
    

          // Assert
          NavigationHeaderPage.checkUserLoggedIn(userData.name);
          
      })
  

  })

})