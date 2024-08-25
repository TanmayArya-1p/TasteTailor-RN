import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import axios from 'axios';



let homeCanteenSearchAtom  = atom({
    key: 'homeCanteenSearchAtom',
    default: "",
})

let serverUrlAtom = atom({
    key: 'serverUrlAtom',
    default: selector({
        key : "serverUrlAtomSelector",
        get: async ({get}) => {
            let res = await axios.get("https://raw.githubusercontent.com/TanmayArya-1p/TasteTailor-RN/main/default-config.json")
            return res.data.server_url
        }
    })
})

//auth "enrollmentno sessionid"

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


module.exports = {userNameAtom,  passwordAtom, sIDAtom,homeCanteenSearchAtom , serverUrlAtom}
