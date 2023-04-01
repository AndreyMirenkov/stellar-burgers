import '@4tw/cypress-drag-drop';

describe('Test',() => {
    beforeEach(() => {
        cy.visit('/');
        const email = 'email2@ya.ru';
        const password = '12345678';
        cy.contains('Личный кабинет');
        cy.get('[data-testid = button_personal_account]').click();
        cy.get('[data-testid = email_input').type(`${email}{enter}`);
        cy.get('[data-testid = password_input').type(`${password}{enter}`);
        cy.get('[data-testid = button_constructor]').click()
    })
    it('should contain title Соберите бургер',() => {
        cy.contains('Соберите бургер');
    });
    it('should open popup with info about ingredient',() => {
        cy.get('[class^=burger-ingredients_ingredients_list]').as('ingredient');
        cy.get('[id^=react-modals]').as('modals');
        cy.get('@ingredient').find('[class^=ingredients_element__]').first().as('firstBun');
        cy.get('@ingredient').find('[class^=ingredients_element__]').last().as('lastBun');
    
        cy.get('@firstBun').click();
        cy.contains('Детали ингредиента');
        cy.get('@modals').find('[class^=modal_button_close__]').first().as('closeButton');
        cy.get('@closeButton').click();

        cy.get('@lastBun').click();
        cy.contains('Детали ингредиента');
        cy.get('@modals').find('[class^=modal_button_close__]').first().as('closeButton');
        cy.get('@closeButton').click();
    
      });
    it('test drag abd drop and get order', () => {
        cy.get('[class^=drag_element]').first().as('dragBun');
        cy.get('[class^=drag_element]').last().as('dragMain');
        cy.get('@dragBun').drag('[id^=dropBunTop]');
        cy.get('@dragMain').drag('[id^=dropMain]');
        cy.get('@dragMain').drag('[id^=dropMain]');
        cy.contains('Оформить заказ').click();
        cy.contains('Ваш заказ начали готовить');
    })
})