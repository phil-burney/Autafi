context('Walk through Viewing a Part Bounty', () => {
  before(() => {
    cy.task('connect')
    cy.task('clearDatabase')
    cy.task('seedUser')
  })
  it('Navigate to website', () => {

    cy.visit('http://localhost:8080')
  })
  it('Create new Post', () => {
    const partBountyContent = {
      title: "New Parts",
      year: "1979",
      make: "Ford",
      model: "Mustang",
      description: "I need a new mustang.  Mine blew up",
      bounty: 600,
      part: "Engine",
      email: "peburney@gmail.com"
    }
    cy.setCookie('token', 'token')
    cy.setCookie('name', 'GenericUser')
    cy.request('POST', "/api/bounty/part", partBountyContent)
  })
  it('Navigate to the page', () => {
    cy.contains('View Listings').click()
    cy.contains('Part Bounties').click()
  })
  it('Verify that the post exists', () => {
    cy.get('div').should('contain', 'Ford')
  })
})