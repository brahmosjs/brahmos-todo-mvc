describe('Test that whole App works', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should give focus to input on page load', () => {
    cy.get('input.new-todo').should('have.focus');
  });

  it('checks that first item in list is Brahmos TodoMVC', () => {
    cy.get('label').should('contain', 'Brahmos TodoMVC');
  });

  it('should add items to list', () => {
    cy.get('input.new-todo').as('inputNew');

    cy.get('@inputNew').type('Add first item{enter}');
    cy.get('@inputNew').type('Add second item{enter}');
    cy.get('@inputNew').type('Add third item{enter}');

    cy.get('label').eq(0).should('contain', 'Add third item');
    cy.get('label').eq(1).should('contain', 'Add second item');
    cy.get('label').eq(2).should('contain', 'Add first item');
  });

  it('should allow updating a list item', () => {
    cy.get('label').dblclick();

    cy.get('input.edit').as('inputEdit');

    cy.get('@inputEdit').click();
    cy.get('@inputEdit').clear();
    cy.get('@inputEdit').type('Edited the first item');
    cy.get('@inputEdit').blur();
    cy.get('label').should('contain', 'Edited the first item');
  });

  it('should delete the item whose Cross icon button is clicked', () => {
    cy.get('input.new-todo').type('Add first item{enter}');
    cy.get('label').should('have.length', 2);

    cy.get('button.destroy').eq(0).click({ force: true });
    cy.get('label').should('have.length', 1);
    cy.get('label').should('contain', 'Brahmos TodoMVC');
  });

  it('should mark an item complete when it is checked', () => {
    cy.get('label').should('have.length', 1);
    cy.get('.completed label').should('have.length', 0);


    cy.get('input[type="checkbox"].toggle').click();
    cy.get('.completed label').should('have.length', 1);
    cy.get('.completed label').should('contain', 'Brahmos TodoMVC');
  });

  it('should toggle all items complete when Toggle All checkbox is clicked', () => {
    cy.get('input.new-todo').as('inputNew');

    // add two more items and ensure we have 3 Active items.
    cy.get('@inputNew').type('Add first item{enter}');
    cy.get('@inputNew').type('Add second item{enter}');
    cy.get('label').should('have.length', 3);
    cy.get('.completed label').should('have.length', 0);

    // Click the Toggle All checkbox and assert that we now have 3 Completed items.
    cy.get('input[type="checkbox"].toggle-all').click();
    cy.get('.completed label').should('have.length', 3);

    // Click the Toggle All checkbox again and assert that we now have 3 Active items.
    cy.get('input[type="checkbox"].toggle-all').click();
    cy.get('.completed label').should('have.length', 0);
    cy.get('label').should('have.length', 3);
  });

  it('should count the number of remaining items correctly', () => {
    cy.get('input.new-todo').as('inputNew');

    // initially 1 item is Active.
    cy.get('.todo-count').should('contain', '1item left');

    // now 3 item will be Active.
    cy.get('@inputNew').type('Add first item{enter}');
    cy.get('@inputNew').type('Add second item{enter}');
    cy.get('.todo-count').should('contain', '3items left');

    // on removing an item, 2 items will be Active.
    cy.get('button.destroy').eq(0).click({ force: true });
    cy.get('.todo-count').should('contain', '2items left');

    // on checking Toggle All checkbox, No items will be Active.
    cy.get('input[type="checkbox"].toggle-all').click();
    cy.get('.todo-count').should('contain', 'Noitems left');

    // on unchecking an item, only 1 item will be Active.
    cy.get('input[type="checkbox"].toggle').eq(0).click();
    cy.get('.todo-count').should('contain', '1item left');
  });

  it('should remove Completed items when Clear Completed button is clicked', () => {
    cy.get('input.new-todo').as('inputNew');

    // add 2 more items.
    cy.get('@inputNew').type('Add first item{enter}');
    cy.get('@inputNew').type('Add second item{enter}');

    // check all items and then uncheck the top-most item.
    cy.get('input[type="checkbox"].toggle-all').click();
    cy.get('input[type="checkbox"].toggle').eq(0).click();

    // assert that the top-most item which we previously unchecked is the only one remaining.
    cy.get('button.clear-completed').click();
    cy.get('label').should('have.length', 1);
    cy.get('label').eq(0).should('contain', 'Add second item');
  });

  it('should show items based on the applied filter', () => {
    cy.get('input.new-todo').as('inputNew');

    cy.get('@inputNew').type('Add first item{enter}');
    cy.get('input[type="checkbox"].toggle').eq(0).click();

    cy.get('a').contains('Active').click();
    cy.get('label').should('have.length', 1);
    cy.get('label').eq(0).should('contain', 'Brahmos TodoMVC');

    cy.get('a').contains('Completed').click();
    cy.get('label').should('have.length', 1);
    cy.get('.completed label').eq(0).should('contain', 'Add first item');

    cy.get('a').contains('All').click();
    cy.get('label').should('have.length', 2);
  });
});
