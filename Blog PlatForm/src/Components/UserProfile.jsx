import React, { useEffect, useState } from "react";
import { auth } from "../firebase"; // Import the initialized auth
import { onAuthStateChanged } from "firebase/auth";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold">User Profile</h2>
        <p className="text-gray-600">No user is signed in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-center">User Profile</h2>
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 rounded-full"
          src={user.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
        />
        <h3 className="mt-4 text-xl font-medium">{user.displayName || "Anonymous User"}</h3>
        <p className="mt-2 text-gray-600">{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
