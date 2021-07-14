/// <reference types="cypress" />

describe('pin columns to left grid', () => {
	it('visits the page', () => {
		cy.visit('https://data-grid-qa-challenge-prod.herokuapp.com/')
		cy.wait(500)
	})

	it('gets column', () => {
		// let originalHeaders = []
		cy.get('table > thead > tr').within($header => {
			cy.get('th').then($group => {
				cy.get($group).each(($th, $index) => {
					cy.get($th).click({ metaKey: true })
					// .contains($group[$index - 1].innerText)
					cy.get($group[0])
						.should('contain', $group[$index].innerText) // checks that column properly moved
						.should('have.attr', 'style')
						.and('contain', 'background: yellow') // checks color turned yellow
					cy.get($group[0]).click({ metaKey: true }) // unpins
				})
			})

			// for (let i = 1; i <= 5; i++) {
			// }
		})

		// .then($col => {
		// 	originalHeaders.push($col.toArray()[0].childNodes)
		// })

		// cy.get(`table > thead > tr > :nth-child(${i})`).click({ metaKey: true })

		// .should('have.attr', 'style')
		// .and('contain', 'background: yellow') // checks color change
	})
})

//
