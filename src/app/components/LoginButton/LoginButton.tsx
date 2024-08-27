// src/components/ClientNavbarButtons.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function ClientNavbarButtons() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div>
          <h2>Welcome, {session.user?.name || "User"}</h2>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      ) : (
        <button onClick={() => signIn("github")}>Login with GitHub</button>
      )}
    </div>
  );
}
