import {atom} from 'recoil';

interface PaybackInterface
{
    id: string,
    amount: number,
    transactionPayBackStatus: string,
    inCash: boolean,
    payBackTransaction: any,
    userName: string,
    avatarImage: string
}

export const ApproveSettlePanelState = atom({
    key: 'ApproveSettlePanel',
    default: {
        visible: false,
        payback: null as PaybackInterface | null,
        transactionId: ""
    },
});