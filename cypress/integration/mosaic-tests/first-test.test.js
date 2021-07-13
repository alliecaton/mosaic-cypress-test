/// <reference types="cypress" />

describe('mosaic grid application', () => {
	beforeEach(() => {
		cy.visit('https://data-grid-qa-challenge-prod.herokuapp.com/')
	})

	it('sorts in ascending', () => {
		// count for the loop
		// get headers and map over them
		// on click o feach header
		// get nth child of count
		cy.get('table').get('thead > tr > :nth-child(1)').click()
		cy.get('table > tbody > tr > :nth-child(1)').then($col => {
			const names = $col.toArray().map($el => $el.innerText)
			expect(names).to.be.sorted({ ascending: true })
		})
	})

	it('sorts in descending on second click', () => {
		cy.get('table').get('thead > tr > :nth-child(1)').click().click()
		cy.get('table > tbody > tr > :nth-child(1)').then($col => {
			const names = $col.toArray().map($el => $el.innerText)
			expect(names).to.be.sorted({ descending: true })
		})
	})
})
