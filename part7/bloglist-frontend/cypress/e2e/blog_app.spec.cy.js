describe('Blog app', function() {
    beforeEach(function () {
        // cy.request("POST", "http://localhost:3003/api/testing/reset");
        // const user = {
        //   name: "Madhatter",
        //   username: "User",
        //   password: "madhatter",
        // };
        // cy.request("POST", "http://localhost:3003/api/users", user);
        cy.visit("http://localhost:3000");
    });
    
    it("Login form is shown", function () {
        cy.contains("log in to application");
    });

    describe('Login',function() {
        it('succeeds with correct credentials', async function() {
            cy.get('#username').type('User')
            cy.get('#password').type('madhatter')
            cy.get('#login-button').click()

            cy.contains('User logged in')
        })
    
        it('fails with wrong credentials', function() {

            cy.get('#username').type('User')
            cy.get('#password').type('madhatter1')
            cy.get('#login-button').click()

            cy.get(".error")
        
        })
    })

    describe('when logged in', async function() {
        await beforeEach(function(){
            cy.get('#username').type('User')
            cy.get('#password').type('madhatter')
            cy.get('#login-button').click()
        })
    
        it('a blog can be created', function(){
            cy.get('#togglabe')
            cy.get('#title').type('Test')
            cy.get('#author').type('test')
            cy.get('#url').type('https://docs.cypress.io/api/commands/contains#Number')
            cy.get('#create').click()
            cy.contains('Test')
        })
    })
})