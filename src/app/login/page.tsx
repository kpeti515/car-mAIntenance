"use client";
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from '../auth.module.css'; // Import the CSS module

const LoginPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push('/');
    }
  }, [status, router]);

  const handleGoogleSignIn = async () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className={styles.container}> {/* Use the container class */}
      <h1 className={styles.heading}>Login</h1>
      <button className={styles.button} onClick={handleGoogleSignIn}>Sign in with Google</button> {/* Use the button class */}
    </div>
  );
};

export default LoginPage;
