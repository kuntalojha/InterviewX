import './App.css';
import React from 'react';
import {
  SignedOut,
  SignInButton,
  SignedIn,
  SignOutButton,
  UserButton,
} from '@clerk/clerk-react';
function App() {
  return (
    <>
      <h1>Welcome to the app</h1>
      <SignedOut>
        <SignInButton mode="modal">Sign In Please</SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <UserButton />
    </>
  );
}

export default App;
