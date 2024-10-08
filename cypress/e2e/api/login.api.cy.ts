import { UserBuilder } from "../../support/builders/user-builder";

describe("Login API", () => {
    it("Login Success", () => {

        // Tripple A

        // Arrange
        const userData = new UserBuilder().build();

        //Act
        cy.request({
            method: "POST",
            url: `${Cypress.env('backendUrl')}/login`,
            body: {
                "email": userData.email,
                "password": userData.password
            }
        }).then(response => {

            // Assertion
            expect(response.status).to.be.eq(200);
            expect(response.body.success).to.be.eq(true);
        })
    })

    it("Login Failure - Password Incorrect", () => {

        // Arrange
        const userData = new UserBuilder().withPassword("12").build();

        // Act
        cy.request({
            method: "POST",
            url: `${Cypress.env('backendUrl')}/login`,
            body:  {
                "email": userData.email,
                "password": userData.password
            },
            failOnStatusCode: false
        }).then(response => {

            // Assertion
            expect(response.status).to.be.eq(400);
            expect(response.body.success).to.be.eq(false);
            expect(response.body.errors).to.be.eq("please try with correct email/password");
        })
    })

    it("Login Failure - Email Incorrect", () => {

        // Arrange
        const userData = new UserBuilder().withEmail("wrongemail.com").build();

        // Act
        cy.request({
            method: "POST",
            url: `${Cypress.env('backendUrl')}/login`,
            body:  {
                "email": userData.email,
                "password": userData.password
            },
            failOnStatusCode: false
        }).then(response => {

            // Assertion
            expect(response.status).to.be.eq(400);
            expect(response.body.success).to.be.eq(false);
            expect(response.body.errors).to.be.eq("please try with correct email/password");
        })
    })

    it("Login Failure - Email and Password Incorrects", () => {

        // Arrange
        const userData = new UserBuilder()
                                .withEmail("wrongemail.com")
                                .withPassword("12")
                                .build();

        // Act
        cy.request({
            method: "POST",
            url: `${Cypress.env('backendUrl')}/login`,
            body:  {
                "email": userData.email,
                "password": userData.password
            },
            failOnStatusCode: false
        }).then(response => {

            // Assertion
            expect(response.status).to.be.eq(400);
            expect(response.body.success).to.be.eq(false);
            expect(response.body.errors).to.be.eq("please try with correct email/password");
            
        })
    })
})