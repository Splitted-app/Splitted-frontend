export const enum TransactionTypes {
    Blik = "Blik",
    Card = "Card",
    Transfer = "Transfer",
    Other = "Other"
  };

export const enum BankNames {
  Pko = "Pko",
  Pekao = "Pekao",
  Mbank = "Mbank",
  Santander = "Santander",
  Ing = "Ing",
  Other = "Other",
}

export const enum GoalType {
  AccountBalance = "AccountBalance",
  ExpensesLimit = "ExpensesLimit",
  AverageExpenses = "AverageExpenses",
  ExpensesLimitInCategory = "ExpensesLimitInCategory",
  AverageExpensesInCategory = "ExpensesLimitInCategory",
}
