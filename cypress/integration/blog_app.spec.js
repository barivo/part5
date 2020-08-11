const { func } = require('prop-types')

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('login').click()
    cy.contains('username')

    cy.get('.showTogglableContent').should('have.attr', 'style', '')
    cy.contains('password')
  })

  it('valid user can log in', function () {
    cy.login({ username: 'mluukkai', password: 'password' })
    cy.contains('Matti Luukkainen logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'password' })
    })
    it('a new blog entry can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('testing one ')
      cy.get('#author').type('mluukkai')
      cy.get('#url').type('www.testing.com')
      cy.get('#submit-blog').click()

      cy.contains('testing one')
    })
  })
})
