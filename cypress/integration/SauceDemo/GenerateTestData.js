/// <reference types="cypress" />

describe('Generate Test Data ', () => {
  it('GTD-001 Generate Sauce Demo Test Data', () => {
    cy.task('readExcel', {
      rootPath: 'TestData/Inventory Details.xlsx'

    })
  })
})
