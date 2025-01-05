import SignIn from "./SignIn"
import { useAuth } from "../context/AuthProvider"
import Hero from "./Hero";
import WrappedSwiper from "./WrappedSwiper";

const App = () => {
    const { login, isAuthenticated } = useAuth();
    return (
        <div className="w-full min-h-screen bg-dark-color">
            {isAuthenticated ? (
                <div className="w-full px-8 py-8">
                    <Hero />
                    <WrappedSwiper />
                </div>
            ) : (
                <SignIn handleSignIn={login}/>
            )}
        </div>
    )
}

export default App