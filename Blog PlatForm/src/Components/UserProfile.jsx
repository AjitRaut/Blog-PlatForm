import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("Unknown User");
  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/150"
  );
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.username || "Unknown User");
            setProfilePicture(
              userData.profilePicture || "https://via.placeholder.com/150"
            );
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        setUser(null);
        setUsername("Unknown User");
        setProfilePicture("https://via.placeholder.com/150");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      setUploading(true);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // Update the user's profile picture in Firestore
        await setDoc(
          doc(db, "users", user.uid),
          { profilePicture: downloadURL },
          { merge: true }
        );

        setProfilePicture(downloadURL);
        setUploading(false);
      } catch (err) {
        console.error("Error uploading profile picture:", err);
        setUploading(false);
      }
    }
  };

  if (!user) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold">User Profile</h2>
        <p className="text-gray-600">No user is signed in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-28 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-center">User Profile</h2>
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 rounded-full"
          src={profilePicture}
          alt="Profile"
        />
        <h3 className="mt-4 text-xl font-medium">{username}</h3>
        <p className="mt-2 text-gray-600">{user.email}</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="mt-4"
        />
        {uploading && <p className="mt-2 text-blue-500">Uploading...</p>}
      </div>
    </div>
  );
};

export default UserProfile;
