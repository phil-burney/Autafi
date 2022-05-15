context('Walk through Creating a Part Sale', () => {
  before(() => {
    cy.task('connect')
    cy.task('clearDatabase')
    cy.task('seedUser')
  })

  it('Navigate to website', () => {

    cy.visit('http://localhost:8080')
  })
  it('Login', () => {
    cy.visit('http://localhost:8080')
    cy.contains('Login').click()
    cy.get('input').eq(0).click()
    cy.get('input').eq(0).type('GenericUser')
    cy.get('input').eq(1).type('Password123*')
    cy.contains('Log In!').click()
  })
})
