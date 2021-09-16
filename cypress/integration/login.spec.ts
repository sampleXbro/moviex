// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
describe('login', () => {
  it('should visit login page', () => {
    cy.visit('http://localhost:3000/')

    cy.get('#username').type('sergeyzhabskiy')
    cy.get('#password').type('kolorifer')
    cy.contains('SIGN IN').click()
    cy.reload()
    cy.url().should('include', 'movies/now-playing')
  })

  it('should redirect to single movie page', () => {
    cy.get('a').first().click()
    cy.contains(/official videos/i)
  })

  it('should logout properly', () => {
    cy.get('[aria-label="account of current user"]')
      .first()
      .click()
      .get('li')
      .last()
      .click()
    cy.contains(/login to moviex/i)
  })
})
