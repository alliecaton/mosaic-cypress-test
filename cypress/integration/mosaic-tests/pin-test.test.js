/// <reference types="cypress" />

describe('pin columns to left grid', () => {
	beforeEach(() => {
		cy.visit('https://data-grid-qa-challenge-prod.herokuapp.com/')
	})

	it('gets column', () => {
		cy.get('table > thead > tr').then($col => {
			cy.log($col)
		})
	})
})

//
