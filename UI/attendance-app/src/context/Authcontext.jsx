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
        const payload = JSON.parse(atob(data.token.split('.')[1]))
        const role = payload.role
        const name = payload.sub  // sub = email usually, check the console log

        settoken(data.token)
        setrole(role)
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', role)
        localStorage.setItem('name', name)
    }

    function logout(){
        settoken(null)
        setrole(null)
        localStorage.removeItem('token')
        localStorage.removeItem('role')
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