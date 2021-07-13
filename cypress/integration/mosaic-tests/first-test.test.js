/// <reference types="cypress" />

describe('mosaic grid application', () => {
	beforeEach(() => {
		cy.visit('https://data-grid-qa-challenge-prod.herokuapp.com/')
	})

	it('sorts in ascending', () => {
		cy.get('table').get('thead > tr > :nth-child(1)').click().contains('A-Z')
		cy.get('table > tbody > tr > :nth-child(1)').then($col => {
			const names = $col.toArray().map($el => $el.innerText)
			expect(names).to.be.sorted({ ascending: true })
		})
	})

	it('sorts in descending on second click', () => {
		cy.get('table')
			.get('thead > tr > :nth-child(1)')
			.click()
			.click()
			.contains('Z-A')
		cy.get('table > tbody > tr > :nth-child(1)').then($col => {
			const names = $col.toArray().map($el => $el.innerText)
			expect(names).to.be.sorted({ descending: true })
		})
	})

	// store the original order, don't want to assume it's sorted alphabetically by default, just in case
	it('returns to original order on third click', () => {
		const original = []
		cy.get('table > tbody > tr > :nth-child(1)').then($col => {
			$col.toArray().map($el => original.push($el.innerText))
		})
		cy.log(original)
		cy.get('table').get('thead > tr > :nth-child(1)').click().click().click()
		cy.get('table > tbody > tr > :nth-child(1)').each(($el, i) => {
			// iterate over each element
			expect($el.text()).to.equal(original[i]) // compare each element text to the original text at the same index
		})
	})
})
