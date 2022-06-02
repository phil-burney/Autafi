context('Walk through Viewing a Car Sale', () => {
  before(() => {
    cy.task('connect')
    cy.task('clearDatabase')
  })
  it('Navigate to website', () => {

    cy.visit('http://localhost:8080')
  })
  it('Create new Post', () => {
    const carSaleContent = {
      title: "New Parts",
      year: "1979",
      make: "Ford",
      model: "Mustang",
      description: "I need a new mustang.  Mine blew up",
      salePrice: 600,
      email: "peburney@gmail.com"
    }
    cy.request('POST', "/api/sale/car", carSaleContent)
  })
  it('Navigate to the page', () => {
    cy.contains('View Listings').click()
    cy.contains('Car Sale Posts').click()
  })
  it('Verify that the post exists', () => {
    cy.get('div').should('contain', 'Ford')
  })
})