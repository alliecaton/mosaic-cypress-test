/// <reference types="cypress" />

describe('mosaic grid application', () => {
	beforeEach(() => {
		cy.visit('https://data-grid-qa-challenge-prod.herokuapp.com/')
	})

	it('displays table', () => {
		cy.get('table > tbody > tr > :nth-child(1)').then(A => {
			const names = A.toArray()
			cy.log(names)
			expect(names).to.be.sorted({ ascending: true })
		})
	})
})
