import React from 'react';
import {
  SignedOut,
  SignInButton,
  SignedIn,
  SignOutButton,
  UserButton,
  useUser,
} from '@clerk/clerk-react';
import { Navigate, Route, Routes } from 'react-router';
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProblemsPage from './pages/ProblemsPage';

function App() {
  const { isSignedIn } = useUser();
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to={'/'} />}
        />
      </Routes>
      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;

// tailwindcss, daisyui,react-router, react-hot-toast
// todo: react-query aka tanstack query, axios