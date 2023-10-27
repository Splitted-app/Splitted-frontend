import {atom} from 'recoil';

export const TransactionsDateRangeState = atom({
    key: 'TransactionsDateRange',
    default: [{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }]
  });