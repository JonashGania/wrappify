interface SignInProps {
  handleSignIn: () => Promise<void>;
}

const AuthLayout = ({ handleSignIn }: SignInProps) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="px-4 sm:px-12 py-12 max-w-[550px] w-full mx-4 border border-zinc-700 rounded-lg sm:rounded-3xl text-center">
        <h1 className="text-white text-3xl sm:text-[45px] font-bold">
          Wrappify
        </h1>
        <p className="text-gray-400 mt-8 mb-16">
          Inspired by Spotify Wrapped, discover and revisit your personal music
          journey anytime!
        </p>
        <button
          onClick={handleSignIn}
          className="bg-primary-color/70 transition duration-300 hover:bg-primary-color text-white max-w-[385px] w-full py-2 font-semibold rounded-lg"
        >
          Continue with Spotify
        </button>
      </div>
    </div>
  );
};

export default AuthLayout;
