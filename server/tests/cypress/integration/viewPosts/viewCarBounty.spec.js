context('Walk through Viewing a Car Bounty', () => {
  before(() => {
    cy.task('connect')
    cy.task('clearDatabase')
  })
  it('Navigate to website', () => {

    cy.visit('http://localhost:8080')
  })
  it('Create new Post', () => {
    const carBountyContent = {
      title: "New Parts",
      year: "1979",
      make: "Ford",
      model: "Mustang",
      description: "I need a new mustang.  Mine blew up",
      bounty: 600,
      email: "peburney@gmail.com"
    }
    cy.request('POST', "/api/bounty/car", carBountyContent)
  })
  it('Navigate to the page', () => {
    cy.contains('View Listings').click()
    cy.contains('Car Bounties').click()
  })
  it('Verify that the post exists', () => {
    cy.get('div').should('contain', 'Ford')
  })
})