/// <reference types="cypress" />

context('Walk through Creating a Car Bounty', () => {
  before(() => {
  //  cy.exec("npm run test:server:connect && npm run test:server:clear && npm run test:server:seed:user")
  cy.task('connect')
  cy.task('clearDatabase')
  cy.task('seedUser')
  
  })
  
  it('Navigate to website', () => {    
    
    cy.visit('http://localhost:8080')
  })
  it('Login', () => {
    cy.request('POST', "localhost:3030/api/user/login", {username: "GenericUser", password:"Password123*"})
    cy.visit('http://localhost:8080')
  })
  it('Navigate to Bounty Creation Page', () => {
    cy.contains('Create Listing').click()
    cy.contains('Create Car Bounty Post').click()
  })
  it('Input Data', () => {
    cy.get('input').eq(0).type("Want new Bronco")
    cy.get('select').eq(0).select('1979')
    cy.get('select').eq(1).select('Ford')
    cy.get('select').eq(2).select('Bronco')
    cy.get('textarea').eq(0).type('Ford Bronco needed.  Will pay $600')
    cy.get('input').eq(2).type(600)
    cy.contains('Place Bounty').click()
  })
  it('Ensure that data exists', () => {
    cy.request("localhost:3030/api/bounty/car").as('car')
    cy.get('@car').should((response) => {
      expect(response.body[0]).to.have.property("title", "Want new Bronco")
    })
  })
  it('Return to the home page', () => {
    cy.contains('Return to the home page').click()
  })



})