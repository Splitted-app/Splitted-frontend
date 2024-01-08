describe('goals page content test', () => {

    beforeEach(() => {
        cy.cleanSlate('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");
        cy.addGoal("user@example.com", "User123!", true);
        cy.login('user@example.com', 'User123!');
        cy.visit('http://localhost:3000/goals');

    })

    it('checks whether content of goals page shows correctly', () => {
        cy.viewport(1550, 890);

        //checking content of header

        //checking title
        cy.get('[data-testid="goals-page-header-title"]').should('exist').should('contain' , 'Goals');

        //checking 'Select Main Goal' button
        cy.get('[data-testid="goals-page-select-main-goal-button"]').should('exist').should('contain' , 'Select Main Goal');
                
        //checking 'Add new goal' button
        cy.get('[data-testid="goals-page-add-new-goal-button"]').should('exist').should('contain' , 'Add new goal');

        //checking main goal section
        cy.get('[data-testid="goals-page-main-goal-container"]').should('exist');
        cy.get('[data-testid="goals-page-main-goal-container-text"]').should('exist').should('contain', 'Your main goal');
        cy.get('[data-testid="goals-page-main-goal"]').should('exist');

        //checking current goals section
        cy.get('[data-testid="goals-page-current-goals-section"]').should('exist');
        cy.get('[data-testid="goals-page-current-goals-section-title"]').should('exist').should('contain', 'Your current goals');
        cy.get('[data-testid="goals-page-current-goals"]').should('exist');

        //goal panel content
        cy.get('[data-testid="goal-name"]').should('exist');
        cy.get('[data-testid="goal-amount"]').should('exist');
        cy.get('[data-testid="goal-deadline"]').should('exist');
        cy.get('[data-testid="goal-progress"]').should('exist');
        cy.get('[data-testid="goal-edit-icon"]').should('exist');
        cy.get('[data-testid="goal-delete-icon"]').should('exist');
        //main goal icon?
        cy.get('[data-testid="main-goal-icon"]').should('exist');

        cy.get('[data-testid="goal-icon"]').should('exist');
        cy.get('[data-testid="goal"]').should('exist').invoke('attr','style').should('contain','linear-gradient');


      });
})

describe('add new goal functionality test', () => {

    beforeEach(() => {
        cy.cleanSlate('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");
        cy.login('user@example.com', 'User123!');
        cy.visit('http://localhost:3000/goals');

    })

    it('checks whether add new goal functionality work properly', () => {
        cy.viewport(1550, 890);

        //checking 'Add new goal' button
        cy.get('[data-testid="goals-page-add-new-goal-button"]').should('exist').should('contain' , 'Add new goal').click();
        cy.get('[data-testid="add-goal-panel"]').should('exist');

        //checking content of add goal panel

        //header
        cy.get('[data-testid="add-goal-panel-main-title"]').should('exist').should('contain' , 'Add Goal');
        cy.get('[data-testid="add-goal-panel-subtitle"]').should('exist');

        //form
        //goal type select
        cy.get('[data-testid="add-goal-panel-goal-type-select-field"]').should('exist');

        cy.get('[data-testid="add-goal-panel-goal-type-select-field"]').select('AccountBalance').should('have.value','AccountBalance');
        cy.get('[data-testid="add-goal-panel-category-input-field"]').should('not.exist');
        cy.get('[data-testid="add-goal-panel-category-label"]').should('not.exist');

        cy.get('[data-testid="add-goal-panel-goal-type-select-field"]').select('ExpensesLimit').should('have.value','ExpensesLimit');
        cy.get('[data-testid="add-goal-panel-category-input-field"]').should('not.exist');
        cy.get('[data-testid="add-goal-panel-category-label"]').should('not.exist');

        cy.get('[data-testid="add-goal-panel-goal-type-select-field"]').select('AverageExpenses').should('have.value','AverageExpenses');
        cy.get('[data-testid="add-goal-panel-category-input-field"]').should('not.exist');
        cy.get('[data-testid="add-goal-panel-category-label"]').should('not.exist');

        cy.get('[data-testid="add-goal-panel-goal-type-select-field"]').select('ExpensesLimitInCategory').should('have.value','ExpensesLimitInCategory');
        cy.get('[data-testid="add-goal-panel-category-input-field"]').should('exist');
        cy.get('[data-testid="add-goal-panel-category-label"]').should('exist');

        cy.get('[data-testid="add-goal-panel-goal-type-select-field"]').select('AverageExpensesInCategory').should('have.value','AverageExpensesInCategory');
        cy.get('[data-testid="add-goal-panel-category-input-field"]').should('exist');
        cy.get('[data-testid="add-goal-panel-category-label"]').should('exist');


        cy.get('[data-testid="add-goal-panel-category-input-field"]').type('Groceries');

        //amount input field
        cy.get('[data-testid="add-goal-panel-amount-label"]').should('exist');
        cy.get('[data-testid="add-goal-panel-amount-input-field"]').should('exist').type('100');

        //deadline input field
        cy.get('[data-testid="add-goal-panel-date-label"]').should('exist');
        cy.get('[data-testid="add-goal-panel-date-input-field"]').should('exist').type('2024-06-17');

        //checking add button functionality
        cy.get('[data-testid="add-goal-panel-add-button"]').should('exist').should('contain','Add').click();

        cy.get('[data-testid="add-goal-panel"]').should('not.exist');

        cy.get('[data-testid="goal"]').
            get('[data-testid="goal-name"]').should('contain','Average expenses in Groceries').
            parent().get('[data-testid="goal-amount"]').
            should('contain','100').
            parent().get('[data-testid="goal-deadline"]').
            should('contain','17.06.2024').should('exist');
    })
})


describe('select main goal test', () => {

    beforeEach(() => {
        cy.cleanSlate('user@example.com', 'User123!', "user", "0", "Pekao", "PLN");
        cy.addGoal("user@example.com", "User123!", false);
        cy.login('user@example.com', 'User123!');
        cy.visit('http://localhost:3000/goals');

    })

    it('checks whether select main goal functionality work properly', () => {
        cy.viewport(1550, 890);

        // select main goal button
        cy.get('[data-testid="select-main-goal-icon"]').should('not.exist');

        cy.get('[data-testid="goals-page-select-main-goal-button"]').should('exist').should('contain' , 'Select Main Goal').click();

        cy.get('[data-testid="select-main-goal-icon"]').should('exist')
        cy.get('[data-testid="main-goal-icon"]').should('not.exist');

        //select main goal
        cy.get('[data-testid="select-main-goal-icon"]').click();
        cy.get('[data-testid="main-goal-icon"]').should('exist');
        cy.get('[data-testid="select-main-goal-icon"]').should('not.exist');

        //deselect main goal
        cy.get('[data-testid="goals-page-main-goal"]').within(()=>{
            cy.get('[data-testid="main-goal-icon"]').click();
        })
        cy.get('[data-testid="main-goal-icon"]').should('not.exist');
        cy.get('[data-testid="select-main-goal-icon"]').should('exist')

        //select main goal and confirm choice
        cy.get('[data-testid="select-main-goal-icon"]').click();
        cy.get('[data-testid="main-goal-icon"]').should('exist');
        cy.get('[data-testid="select-main-goal-icon"]').should('not.exist');
        cy.get('[data-testid="goals-page-select-main-goal-button"]').click();
        cy.get('[data-testid="main-goal-icon"]').should('exist');
        cy.get('[data-testid="select-main-goal-icon"]').should('not.exist');

        //check if clicking on main goal icon while not in select main goal mode doesn't deselect main goal 
        cy.get('[data-testid="goals-page-main-goal"]').within(()=>{
            cy.get('[data-testid="main-goal-icon"]').click();
        })
        cy.get('[data-testid="main-goal-icon"]').should('exist');

    })
})