const { func } = require('prop-types')

describe('Blog app', function() {
  beforeEach(function() {
    window.localStorage.removeItem('loggedIn')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'password',
    })
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
        title: 'first and first',
        author: 'author of first and...',
        url: 'www.ibm.com',
      })
      cy.contains('create new blog').click()
      cy.get('#title').type('testing one ')
      cy.get('#author').type('mluukkai')
      cy.get('#url').type('www.testing.com')
      cy.get('#submit-blog').click()

      cy.contains('testing one')
      cy.contains('first and first')
    })
  })

  describe('Changing blogs', function() {
    beforeEach(function() {
      cy.createUser({
        name: 'Sami ullut',
        username: 'samisami',
        password: 'password',
      })

      cy.login({ username: 'mluukkai', password: 'password' })

      cy.createBlog({
        title: 'second second test',
        author: 'mluukkai',
        url: 'www.ibm.com',
        likes: 2,
      })
    })

    it('user can like their blog', function() {
      cy.contains('view').click()

      cy.contains('like')
        .parent()
        .as('likes')

      cy.contains('like').as('likesButton')
      cy.get('@likes').should('contain', 2)

      cy.get('@likesButton').click()
      cy.get('@likes').should('contain', 3)
    })

    it('user can deltete their own  blog', function() {
      cy.login({ username: 'mluukkai', password: 'password' })
      cy.contains('view').click()
      cy.contains('delete').click()
      // cy.get('.blogList').should('not.visible', 'second second test')
      cy.contains('second second test').should('not.exist')
    })

    it("user can not deltete someone else's blog", function() {
      cy.login({ username: 'samisami', password: 'password' })
      cy.contains('view').click()
      cy.contains('delete').click()
      //cy.get('.blogList').should('visible', 'sssecond second test')
      cy.contains('second second test').should('exist')
    })

    it('blogs are ordered from most likes to least', function() {
      cy.createBlog({
        title: 'last spot',
        author: 'mluukkai',
        url: 'www.ibm.com',
        likes: 0,
      })
      cy.createBlog({
        title: 'top spot',
        author: 'mluukkai',
        url: 'www.ibm.com',
        likes: 100,
      })

      cy.get('.blog').as('blog')

      cy.get('@blog')
        .first()
        .should('contain', 'top spot')

      cy.get('@blog')
        .first()
        .next()
        .should('contain', 'second')

      cy.get('@blog')
        .last()
        .should('contain', 'last spot')
    })
  })
})
