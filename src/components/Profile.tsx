"use client";
import { useSession } from "next-auth/react";
import LogoutButton from "./LogoutButton";

const Profile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <h1>Welcome, {session?.user?.name}!</h1>
      <p>Email: {session?.user?.email}</p>
      <img src={session?.user?.image || ""} alt="Profile Picture" />
      <LogoutButton />
    </div>
  );
};

export default Profile;
