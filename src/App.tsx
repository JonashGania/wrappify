import { useAuth } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MainLayout from "./layout/MainLayout";
import PlaylistPage from "./pages/PlaylistPage";

const App = () => {
  const { login, isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <HomePage />
              ) : (
                <LoginPage handleSignIn={login} />
              )
            }
          />
          <Route
            path="/playlists/:playlistId"
            element={isAuthenticated ? <PlaylistPage /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
