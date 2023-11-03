import {atom} from 'recoil';

export const TransactionUpdaterState = atom({
    key: 'ManualTransactionUpdater',
    default: false,
  });