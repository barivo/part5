const { func } = require('prop-types')

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('login').click()
    cy.contains('username')

    cy.get('.showTogglableContent').should('have.attr', 'style', '')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'mluukkai', password: 'password' })
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.uiLogin({ username: 'mluukkai', password: 'wrong' })

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'border', '5px solid rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'password' })
    })
    it('a new blog entry can be created', function() {
      cy.createBlog({
        title: 'first and only',
        author: 'author of first and...',
        url: 'www.ibm.com',
      })
      cy.contains('create new blog').click()
      cy.get('#title').type('testing one ')
      cy.get('#author').type('mluukkai')
      cy.get('#url').type('www.testing.com')
      cy.get('#submit-blog').click()

      cy.contains('testing one')
      cy.contains('first and only')
    })

    it.only('user can like a blog', function() {
      cy.createBlog({
        title: 'first and only',
        author: 'author of first and...',
        url: 'www.ibm.com',
      })
      cy.contains('view').click()

      cy.contains('like')
        .parent()
        .as('likes')

      cy.contains('like').as('likesButton')
      cy.get('@likes').should('contain', '0')

      cy.get('@likesButton').click()
      cy.get('@likes').should('contain', '1')
    })
  })
})
