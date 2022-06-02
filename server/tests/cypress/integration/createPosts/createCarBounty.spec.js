context('Walk through Creating a Car Bounty', () => {
  before(() => {
  cy.task('connect')
  cy.task('clearDatabase')
  cy.task('seedUser')
  
  })
  beforeEach(() => {
    
    Cypress.Cookies.preserveOnce('token', 'name', 'email', 'connect.sid')
  })
  it('Navigate to website', () => {

    cy.visit('http://localhost:8080')
  })
  it('Login', () => {
    cy.request('POST', "/api/user/login", { username: "GenericUser", password: "Password123*" })
    cy.getCookie('token').should('exist')
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
    cy.get('textarea').eq(0).type('Ford Bronco engine for sale.  Will pay $600')
    cy.get('input').eq(2).type(600)
    cy.intercept('POST',"/api/bounty/car").as("call")
    cy.contains('Place Bounty').click()
    cy.wait("@call")
  })
  it('Ensure that data exists', () => {
    cy.request("/api/bounty/car").as('car')
    cy.get('@car').should((response) => {
      expect(response.body[0]).to.have.property("title", "Want new Bronco")
    })
  })
  it('Return to the home page', () => {
    cy.contains('Return to the home page').click()
  })
})