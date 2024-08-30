import { useRecoilState } from "recoil"
import LoginCard from "../LoginCard.jsx"
import SignupCard from '../SignupCard.jsx'
import authScreenAtom from "../atoms/authScreenAtom.js"

const AuthPage=()=>{
    const [authScreenState]=useRecoilState(authScreenAtom)
   console.log(authScreenState)
    return(
        <>
        {authScreenState==="login"?<LoginCard/>:<SignupCard/>}

        </>

    )

}
export default AuthPage;