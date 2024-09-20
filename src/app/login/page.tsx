"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem" }}>
      {session ? (
        <div>
          <h2>Welcome, {session.user?.name}!</h2>
          <p>Email: {session.user?.email}</p>
          <button
            onClick={() => signOut()}
            style={{
              padding: "10px 20px",
              backgroundColor: "#FF4136",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <h2>Please sign in</h2>
          <button
            onClick={() => signIn("google")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4285F4",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            Sign in with Google
          </button>
          <br />
          <button
            onClick={() => signIn("github")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Sign in with GitHub
          </button>
        </div>
      )}
    </div>
  );
}
