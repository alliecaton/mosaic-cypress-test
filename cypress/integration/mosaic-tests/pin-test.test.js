/// <reference types="cypress" />

describe('pin columns to left grid', () => {
	it('visits the page', () => {
		cy.visit('https://data-grid-qa-challenge-prod.herokuapp.com/')
		cy.wait(500)
	})

	for (let i = 1; i <= 5; i++) {
		it('gets column', () => {
			const originalHeaders = []
			cy.get('table > thead > tr').then($col => {
				originalHeaders.push($col.toArray()[0].childNodes)
			})
			cy.get(`table > thead > tr > :nth-child(${i})`)
				.click({ metaKey: true })
				.should('have.attr', 'style')
				.should('contain', 'background: yellow') // checks color change

			// meta click and store inner text on that node
			// fine node with bg color if exists
			// check the next sibling to be the node you just clicked
			// if no bg color yellow is found, check the first header and compare with clicked
			// click a random header and splice array snapshot to compare with header
		})
	}
})

//
