import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';


let homeCanteenSearchAtom  = atom({
    key: 'homeCanteenSearchAtom',
    default: "",
})



let userNameAtom = atom({
    key: 'userNameAtom',
    default: "",
});


let passwordAtom = atom({
    key: 'passwordAtom',
    default: "",
});

let sIDAtom = atom({
    key: 'sIDAtom',
    default: "",
});


module.exports = {userNameAtom,  passwordAtom, sIDAtom,homeCanteenSearchAtom}
