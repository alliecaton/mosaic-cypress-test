/// <reference types="cypress" />

describe('pin columns to left grid', () => {
	beforeEach(() => {
		cy.visit('https://data-grid-qa-challenge-prod.herokuapp.com/')
		cy.wait(500)
	})

	for (let i = 1; i <= 5; i++) {
		it('gets column', () => {
			cy.get('table > thead > tr').then($col => {
				const originalHeaders = $col.toArray()[0].childNodes
			})
			cy.get(`table > thead > tr > :nth-child(${i})`).click()
			originalHeaders[0].should('have.css', 'background-color', 'rgb(0, 0, 0)')

			// meta click and store inner text on that node
			// fine node with bg color if exists
			// check the next sibling to be the node you just clicked
			// if no bg color yellow is found, check the first header and compare with clicked
			// click a random header and splice array snapshot to compare with header
		})
	}
})

//
