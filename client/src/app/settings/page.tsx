import Header from "@/components/Header";
import React from "react";
import { UserIcon, EnvelopeIcon, UsersIcon, BriefcaseIcon } from "@heroicons/react/24/outline";

const Settings = () => {
  const useSettings = {
    username: "Arush Singh",
    email: "sarushmad@gmail.com",
    teamName: "Development Team C2",
    roleName: "Developer",
  };

  const iconStyle = "h-6 w-6 text-blue-500 dark:text-blue-400";
  const cardStyle = 
    "relative flex items-center gap-4 p-5 rounded-xl shadow-md bg-white/70 dark:bg-dark-secondary/70 backdrop-blur-lg hover:scale-105 transition-transform duration-300";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 to-gray-800 dark:from-gray-900 dark:to-cyan-900 p-8">
      <Header name="Settings" />
      
      <div className="mt-8 max-w-3xl mx-auto space-y-6">
        {/* Username */}
        <div className={cardStyle}>
          <UserIcon className={iconStyle} />
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Username</label>
            <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
              {useSettings.username}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className={cardStyle}>
          <EnvelopeIcon className={iconStyle} />
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
            <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
              {useSettings.email}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className={cardStyle}>
          <UsersIcon className={iconStyle} />
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Team</label>
            <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
              {useSettings.teamName}
            </div>
          </div>
        </div>

        {/* Role */}
        <div className={cardStyle}>
          <BriefcaseIcon className={iconStyle} />
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Role</label>
            <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
              {useSettings.roleName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
