import {atom} from "recoil";

const currentNavLabelState = atom({
    key: 'currentNavLabelState',
    default: 'Create',
});

const userDetailsState = atom({
    key: 'userDetails',
    default: {
        walletAddress: "",
        accountBalance: "",
        isConnected: false
    },
});

export {
    currentNavLabelState, userDetailsState
}