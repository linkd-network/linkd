import {atom} from "recoil";

const currentNavLabelState = atom({
    key: 'currentNavLabelState',
    default: 'Create',
});

export {
    currentNavLabelState
}