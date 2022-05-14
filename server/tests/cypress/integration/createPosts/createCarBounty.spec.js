/// <reference types="cypress" />

context('Walk through Creating a Part Bounty', () => {
  before(() => {
    cy.login()
  })
  
  it('Navigate to website', () => {    
    
    cy.visit('http://localhost:8080')
  })
  it('Login', () => {
    cy.visit('http://localhost:8080')
    //GenericUser
    //Password123*
    cy.contains('Login').click()
    cy.get('input').eq(0).click()
    cy.get('input').eq(0).type('GenericUser')
    cy.get('input').eq(1).type('Password123*')
    cy.contains('Log In!').click()
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
  it('Return to the home page', () => {
    cy.contains('Return to the home page').click()
  })



})