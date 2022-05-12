/// <reference types="cypress" />
context('Walk through Creating a Part Bounty', () => {
  

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
        // cy.contains('Username').type('GenericUser')
        // cy.contains('Password').type('Password123*')
      })
  
  
  })