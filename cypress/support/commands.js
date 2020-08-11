// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/login',
    failOnStatusCode: false,
    body: {
      username,
      password,
    },
  }).then(({ body }) => {
    localStorage.setItem('loggedIn', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createUser', ({ name, username, password }) => {
  const user = {
    name,
    username,
    password,
  }
  cy.request('POST', 'http://localhost:3001/api/users', user)
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  const currentUser = JSON.parse(localStorage.getItem('loggedIn'))

  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/blogs',
    failOnStatusCode: false,
    body: {
      title,
      author,
      url,
      likes,
      userId: currentUser.id,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedIn')).token
      }`,
    },
  })

  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('uiLogin', ({ username, password }) => {
  cy.visit('http://localhost:3000')
  cy.contains('login').click()
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})
