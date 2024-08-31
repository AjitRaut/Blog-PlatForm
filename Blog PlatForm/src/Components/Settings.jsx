import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

const Settings = () => {
  const [username, setUsername] = useState(auth.currentUser?.displayName || '');
  const [email, setEmail] = useState(auth.currentUser?.email || '');
  const [password, setPassword] = useState('');

  const handleSaveProfile = async () => {
    try {
      if (auth.currentUser) {
        // Update Firebase Auth profile
        await updateProfile(auth.currentUser, { displayName: username });
        const userDoc = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDoc, { username });

        // Update email if changed
        if (email !== auth.currentUser.email) {
          await updateEmail(auth.currentUser, email);
        }

        // Update password if provided
        if (password) {
          await updatePassword(auth.currentUser, password);
        }

        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-black">Settings</h2>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        {/* Profile Settings */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Settings</h3>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 border rounded w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border rounded w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border rounded w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
              placeholder="Leave blank to keep the current password"
            />
          </div>
          <button
            onClick={handleSaveProfile}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
