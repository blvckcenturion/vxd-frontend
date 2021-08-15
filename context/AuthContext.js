import { createContext } from "react"

const AuthContext = createContext({
    //user data
    auth: undefined,
    //jwt on login
    login: () => null,
    //logout func
    logout: () => null,
    setReloadUser: () => null,
})

export default AuthContext;

