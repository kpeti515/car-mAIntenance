"use client";
import React from 'react';
import { signIn } from 'next-auth/react';

const SignupPage = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label>Email:</label>
        <input type="email" /><br />
        <label>Password:</label>
        <input type="password" /><br />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={() => {
        console.log("Signing in with Google");
        signIn('google');
      }}>Sign in with Google</button>
    </div>
  );
};

export default SignupPage;
