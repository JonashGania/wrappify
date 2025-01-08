interface SignInProps {
    handleSignIn: () => Promise<void>;
}

const AuthLayout = ({ handleSignIn }: SignInProps) => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="px-12 py-12 max-w-[550px] w-full mx-8 border border-zinc-700 rounded-3xl text-center">
                <h1 className="text-white text-[45px] font-bold">Wrappify</h1>
                <p className="text-gray-400 mt-8 mb-16">Spotify Wrapped inspired where you can check your listening journey this 2024 anytime!</p>
                <button 
                    onClick={handleSignIn}
                    className="bg-primary-color transition duration-300 hover:bg-[#3dc76d] hover:text-white text-gray-300 max-w-[385px] w-full py-2 font-semibold rounded-lg"
                >
                    Continue with Spotify
                </button>
            </div>
        </div>
    )
}

export default AuthLayout