import { atom } from "recoil";

export const postAtom =atom({
    key:'postAtom',
    default:{title:'',content:'',author:''}
})