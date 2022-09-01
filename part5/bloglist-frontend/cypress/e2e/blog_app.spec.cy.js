describe('Blog app', function() {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/testing/reset");
        const user = {
          name: "Madhatter",
          username: "MadHatter",
          password: "madhatter",
        };
        cy.request("POST", "http://localhost:3003/api/users", user);
        cy.visit("http://localhost:3000");
    });
    
    it("Login form is shown", function () {
        cy.contains("log in to application");
    });

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('MadHatter')
            cy.get('#password').type('madhatter')
            cy.get('#login-button').click()

            cy.contains('MadHatter logged in')
        })
    
        // it('fails with wrong credentials', function() {

        //     cy.get('#username').type('MadHatter')
        //     cy.get('#password').type('madhatter1')
        //     cy.get('#login-button').click()
        //     // console.log(cy.get(".error"))

        //     cy.get(".error").should("invalid username or password")
        
        //     // cy.get("html").should("not.contain", "MadHatter logged in");
        // })
    })
})