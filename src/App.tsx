import { useAuth } from "./context/AuthProvider"
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";

const App = () => {
    const { login, isAuthenticated } = useAuth();
    return (
        <div className="w-full min-h-screen bg-dark-color">
            {isAuthenticated ? (
                <MainLayout />
            ) : (
                <AuthLayout handleSignIn={login}/>
            )}
        </div>
    )
}

export default App