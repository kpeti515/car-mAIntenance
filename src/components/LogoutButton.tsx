"use client";
import { signOut } from "next-auth/react";

const LogoutButton = ({ className }: { className: string }) => {
  return <button className={className} onClick={() => signOut()}>Sign Out</button>;
};

export default LogoutButton;
