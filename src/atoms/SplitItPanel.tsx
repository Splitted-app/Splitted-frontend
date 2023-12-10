import {atom} from 'recoil';

export const SplitItPanelState = atom({
    key: 'SplitItModePanel',
    default: {
        visible: false,
        transactionId: "",
        availableBudgets: []
    },
});