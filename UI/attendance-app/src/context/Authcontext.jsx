import{
    createContext,
    useContext,
    useState,
    useEffect
} from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [token, settoken] = useState(localStorage.getItem('token') || null)
    const [role, setrole] = useState(localStorage.getItem('role') || null)
    
    function login(data) {
        settoken(data.token)
        setrole(data.role)
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role)
        localStorage.setItem('name', data.name)
        localStorage.setItem('refreshToken', data.refreshToken)
    }

    function logout(){
        settoken(null)
        setrole(null)
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('refreshToken')
    }
    
    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth() {
    return useContext(AuthContext)
}