export {}
declare global {
    namespace Cypress {
        interface Chainable {
            login(email:string, password:string): Chainable<void>;
        }

        interface Chainable {
            cleanSlate(email: string, password: string, username: string, balance: string, bank: string, currency: string): Chainable<void>;
        }
        
        interface Chainable {
            deleteIfExists(email:string, password:string): Chainable<void>;
        }

        interface Chainable {
            createIfNotExists(email: string, password: string, username: string, balance: string, bank: string, currency: string): Chainable<void>;
        }

        interface Chainable {
            addTransactions(email:string, password:string, bank:string): Chainable<void>;
        }

        interface Chainable {
            addGoal(email:string, password:string, isMain:boolean): Chainable<void>;
        }

        interface Chainable {
            addTransaction(
                email: string,
                password: string,
                amount: number,
                category: string,
                date: string,
                notes: string): Chainable<void>;
        }
    }
}