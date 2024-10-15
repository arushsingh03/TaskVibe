"use client";

import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  UsersIcon,
  BriefcaseIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

const Settings = () => {
  const initialState = {
    username: "",
    email: "",
    teamName: "",
    roleName: "",
  };

  const [userSettings, setUserSettings] = useState(initialState);
  const [formValues, setFormValues] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings");
    const defaultSettings = savedSettings
      ? JSON.parse(savedSettings)
      : {
          username: "Username:",
          email: "Email",
          teamName: "Your Team:",
          roleName: "Your Role:",
        };

    setUserSettings(defaultSettings);
    setFormValues(defaultSettings);
    setIsLoading(false);
  }, []);

  const handleEditDetails = () => {
    setIsModalOpen(true);
  };

  const handleFormChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setUserSettings(formValues);
    localStorage.setItem("userSettings", JSON.stringify(formValues));
    setIsModalOpen(false);
  };

  const iconStyle = "h-6 w-6 text-blue-500 dark:text-blue-400";
  const cardStyle =
    "relative flex items-center gap-4 p-5 rounded-xl shadow-md bg-white/70 dark:bg-dark-secondary/70 backdrop-blur-lg hover:scale-105 transition-transform duration-300";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 to-gray-800 p-8 dark:from-gray-900 dark:to-cyan-900">
      <Header name="Settings" />

      {isLoading ? (
        <p className="mt-8 text-center text-white">Loading...</p>
      ) : (
        <div className="mx-auto mt-8 max-w-3xl space-y-6">
          {/* Username */}
          <div className={cardStyle}>
            <UserIcon className={iconStyle} />
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Username
              </label>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                {userSettings.username}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className={cardStyle}>
            <EnvelopeIcon className={iconStyle} />
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                {userSettings.email}
              </div>
            </div>
          </div>

          {/* Team */}
          <div className={cardStyle}>
            <UsersIcon className={iconStyle} />
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Team
              </label>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                {userSettings.teamName}
              </div>
            </div>
          </div>

          {/* Role */}
          <div className={cardStyle}>
            <BriefcaseIcon className={iconStyle} />
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Role
              </label>
              <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                {userSettings.roleName}
              </div>
            </div>
          </div>

          {/* Add/Edit Details Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleEditDetails}
              className="w-45 flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-lg font-semibold text-white transition-colors hover:bg-blue-500"
            >
              <PencilIcon className="h-6 w-6" />
              Add/Edit Details
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Edit Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formValues.username}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border p-2"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formValues.email}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border p-2"
                />
                <input
                  type="text"
                  name="teamName"
                  placeholder="Team Name"
                  value={formValues.teamName}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border p-2"
                />
                <input
                  type="text"
                  name="roleName"
                  placeholder="Role"
                  value={formValues.roleName}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border p-2"
                />
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg bg-gray-300 px-4 py-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
