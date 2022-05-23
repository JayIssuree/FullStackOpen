describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3000/api/testing/reset')
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user) 
      cy.visit('http://localhost:3001')
    })
  
    it('Login form is shown', function() {
        cy.contains('username')
        cy.contains('password')
        cy.contains('login').click()
    })

    describe('Login',function() {

        it('succeeds with correct credentials', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
            cy.contains('Matti Luukkainen logged in')
            cy.contains('logout').click()
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('username')
            cy.get('#password').type('password')
            cy.get('#login-button').click()
        })
    })
    

  })
