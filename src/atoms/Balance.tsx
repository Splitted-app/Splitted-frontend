import {atom} from 'recoil';

export const BalanceState = atom({
    key: 'bankBalance',
    default: 0,
  });