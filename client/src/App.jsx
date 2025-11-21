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
import DashboardPage from './pages/DashboardPage';

function App() {
  const { isSignedIn, isLoaded } = useUser();

  // This will get rid of the flikering effect
  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!isSignedIn ? <HomePage /> : <Navigate to={'/dashboard'} />}
        />
        <Route
          path="/dashboard"
          element={isSignedIn ? <DashboardPage /> : <Navigate to={'/'} />}
        />
        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to={'/'} />}
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
