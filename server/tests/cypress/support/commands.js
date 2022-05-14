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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import helper from "./helper"
const User = require('../../../models/user')
const MongoClient = require("`mongodb`").MongoClient;
let user = {
  username: "GenericUser",
  email: "philburney@ymail.com",
  password: "Password123*"
}


// Cypress.Commands.add('addUser', helper.addNewUser());
Cypress.Commands.add('login', () => {
  const newUser = new User(
    user);
  console.log(newUser)
  return
})