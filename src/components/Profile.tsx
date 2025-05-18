"use client";

import { useSession } from "next-auth/react";
import LogoutButton from "./LogoutButton";
import styles from "./Profile.module.css";
import Image from "next/image";
import { useState } from "react"; // Import useState

const Profile = () => {
  const { data: session, status } = useSession();
  const [showOptions, setShowOptions] = useState(false); // State to toggle options

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return null; // Don't render anything if unauthenticated
  }

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className={styles.profileContainer}> {/* Use a new container class */}
      {session?.user?.image && (
        <Image
          src={session.user.image}
          alt="Profile Picture"
          width={40} // Smaller size for navbar
          height={40} // Smaller size for navbar
          className={styles.profileImage} // Keep profileImage class
          unoptimized
          onClick={toggleOptions} // Make image clickable
          style={{ cursor: 'pointer' }} // Indicate clickable
        />
      )}
      {!session?.user?.image && session?.user?.name && (
         <span className={styles.profileName} onClick={toggleOptions} style={{ cursor: 'pointer' }}>
           {session.user.name}
         </span>
      )}
       {!session?.user?.image && !session?.user?.name && session?.user?.email && (
         <span className={styles.profileName} onClick={toggleOptions} style={{ cursor: 'pointer' }}>
           {session.user.email}
         </span>
      )}

      {showOptions && (
        <div className={styles.profileOptions}> {/* Dropdown for options */}
          <a href="/profile" className={styles.profileOptionLink}>Profile Details</a>
          <LogoutButton className={styles.logoutButton} />
        </div>
      )}
    </div>
  );
};

export default Profile;
