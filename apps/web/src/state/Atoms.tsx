import {atom} from "recoil";

const currentNavLabelState = atom({
    key: 'currentNavLabelState',
    default: 'Create',
});

const currentWalletState = atom({
    key: 'currentWalletState',
    default: '',
});

export {
    currentNavLabelState, currentWalletState
}