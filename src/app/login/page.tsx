"use client";
import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    signIn('google', { callbackUrl: '/' }); // Explicitly set callbackUrl
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>Email:</label>
        <input type="email" /><br />
        <label>Password:</label>
        <input type="password" /><br />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default LoginPage;
