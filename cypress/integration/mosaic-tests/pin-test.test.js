/// <reference types="cypress" />

describe('pin columns to left grid', () => {
	beforeEach(() => {
		cy.visit('https://data-grid-qa-challenge-prod.herokuapp.com/')
		cy.wait(500)
	})

	it('pins and unpins one column at a time', () => {
		cy.get('table > thead > tr').within(() => {
			cy.get('th').then($group => {
				cy.get($group).each(($th, $index) => {
					if ($index != 0) {
						cy.get($th).click({ metaKey: true })
						cy.get($group[0]).should('contain', $group[$index].innerText) // checks that column properly moved
						cy.get($group[$index]).should(
							'contain',
							$group[$index - 1].innerText
						)
						cy.get($group[0]).click({ metaKey: true }) // unpins
					} else {
						cy.get($th).click({ metaKey: true })
						cy.get($group[0]).should('contain', $group[$index].innerText) // checks that column properly moved
						cy.get($group[$index]).should('contain', $group[$index].innerText)
						cy.get($group[0]).click({ metaKey: true }) // unpins
					}
				})
			})
		})
	})

	it('pins columns in clicked order', () => {
		cy.get('table > thead > tr').within(() => {
			let array = []
			for (let i = 0; i <= 2; i++) {
				cy.get('th').then($group => {
					let num = Math.floor(Math.random() * 5) + 1 - 1 // randomly selects a column to pin so it's not always in order
					array.push($group.toArray()[num].innerText) // save the original text of pinned column
					cy.get($group[num]).click({ metaKey: true }) // pin
				})
			}
			cy.log(array)
			cy.get('th').then($group => {
				// check that the original 3 pinned headers equal 0-2 of the groups innerTexts
				cy.get($group[0]).should('contain', array[0])
				cy.get($group[1]).should('contain', array[1])
				cy.get($group[2]).should('contain', array[2])
			})
		})
	})

	it('header turns yellow when pinned', () => {
		cy.get('table > thead > tr').within(() => {
			cy.get('th').then($group => {
				cy.get($group).each($th => {
					cy.get($th)
						.click({ metaKey: true })
						.should('have.attr', 'style')
						.and('contain', 'background: yellow')
				})
			})
		})
	})
})
