import { atom } from "recoil"
const userAtom=atom({
    key:'userAtom',
    //get default value forouruser formthelocalStorage (we saved in signupcard user-blog)
    default:JSON.parse(localStorage.getItem('user-blog'))
})

export default userAtom