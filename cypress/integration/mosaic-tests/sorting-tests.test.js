/// <reference types="cypress" />

describe('mosaic grid application', () => {
	beforeEach(() => {
		cy.visit('https://data-grid-qa-challenge-prod.herokuapp.com/')
		cy.wait(500)
	})

	// check clicking the same column once, twice, three times in a row
	// const headerLength = document.querySelectorAll('td')
	// console.log(headerLength.length)

	for (let i = 1; i <= 5; i++) {
		it('sorts in ascending', () => {
			cy.get(`table > thead > tr > :nth-child(${i})`)
				.click()
				.contains('A-Z') // checks that it contains the sorted label
				.then($col => {
					const names = $col.toArray().map($el =>
						parseInt($el.innerText) // check if string is a number or not for proper sorting
							? parseFloat($el.innerText.replace(/,/g, ''))
							: $el.innerText
					)
					expect(names).to.be.sorted({ ascending: true })
				})
		})

		it('sorts in descending on second click', () => {
			cy.get(`table > thead > tr > :nth-child(${i})`)
				.click()
				.contains('A-Z') // checks that it contains the sorted label
				.then($col => {
					const names = $col.toArray().map($el =>
						parseInt($el.innerText) // check if string is a number or not for proper sorting
							? parseFloat($el.innerText.replace(/,/g, ''))
							: $el.innerText
					)
					expect(names).to.be.sorted({ descending: true })
				})
		})

		// store the original order, don't want to assume it's sorted alphabetically by default, just in case
		it('returns to original order on third click', () => {
			const original = []
			cy.get(`table > tbody > tr > :nth-child(${i}`).then($col => {
				$col.toArray().map($el => original.push($el.innerText))
			})
			cy.log(original)
			cy.get('table').get(`thead > tr > :nth-child(${i}`).click()
			cy.get(`table > tbody > tr > :nth-child(${i})`).each(($el, index) => {
				expect($el.innerText).to.equal(original[index]) // compare each element text to the original text at the same index
			})
		})
	}
	// check clicking a column, then switching to a new column
})
