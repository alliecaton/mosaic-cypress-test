/// <reference types="cypress" />

describe('mosaic grid application', () => {
	beforeEach(() => {
		cy.wait(500)
	})

	it('loads the page', () => {
		cy.visit('https://data-grid-qa-challenge-prod.herokuapp.com/')
	})

	for (let i = 1; i <= 5; i++) {
		it(`sorts column ${i} in ascending`, () => {
			cy.get(`table > thead > tr > :nth-child(${i})`)
				.click()
				.contains('A-Z') // checks that it contains the sorted label
				.then($col => {
					const names = $col.toArray().map($el =>
						parseInt($el.innerText) // check if string is a number or not for proper sorting
							? parseFloat($el.innerText.replace(/,/g, '')) // remove commas in numbers
							: $el.innerText
					)
					expect(names).to.be.sorted({ ascending: true }) // assertion
				})
		})

		it(`sorts column ${i} in descending on second click`, () => {
			cy.get(`table > thead > tr > :nth-child(${i})`)
				.click()
				.contains('Z-A') // checks that it contains the sorted label
				.then($col => {
					const names = $col.toArray().map($el =>
						parseInt($el.innerText) // check if string is a number or not for proper sorting
							? parseFloat($el.innerText.replace(/,/g, '')) // remove commas in numbers
							: $el.innerText
					)
					expect(names).to.be.sorted({ descending: true }) // assertion
				})
		})
	}

	for (let i = 1; i <= 5; i++) {
		it(`column ${i} returns to original order on third click`, () => {
			const original = []
			cy.get('table > tbody > tr > :nth-child(1)').then($col => {
				$col.toArray().map($el => original.push($el.innerText))
			}) // stores what the original array was on load. don't want to assume original was sorted alphabetically

			cy.get('table').get('thead > tr > :nth-child(1)').click().click().click()
			cy.get('table > tbody > tr > :nth-child(1)').each(($el, index) => {
				expect($el.innerText).to.equal(original[index].innerText) // compare each element text to the original text at the same index
			})
		})
	}
	// check clicking a column, then switching to a new column
})
