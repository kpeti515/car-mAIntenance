"use client";
import { useSession } from "next-auth/react";
import LogoutButton from "./LogoutButton";
import styles from "./Profile.module.css"; // Import the CSS module

const Profile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  return (
    <div className={styles.container}> {/* Use the container class */}
      <h1>Welcome, {session?.user?.name}!</h1>
      <p>Email: {session?.user?.email}</p>
      <img src={session?.user?.image || ""} alt="Profile Picture" className={styles.profileImage} /> {/* Use the profileImage class */}
      <LogoutButton className={styles.logoutButton} /> {/* Use the logoutButton class */}
    </div>
  );
};

export default Profile;
