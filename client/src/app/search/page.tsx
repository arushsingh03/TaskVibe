"use client";

import { debounce } from "lodash";
import Header from "@/components/Header";
import { useSearchQuery } from "@/state/api";
import UserCard from "@/components/UserCard";
import TaskCard from "@/components/TaskCard";
import ProjectCard from "@/components/ProjectCard";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: searchResults = { tasks: [], projects: [], users: [] }, // Default fallback to prevent undefined errors
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500
  );

  useEffect(() => {
    return () => {
      handleSearch.cancel(); // Cancel debounced search on unmount
    };
  }, [handleSearch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 to-gray-900 p-8 dark:from-gray-900 dark:to-cyan-900">
      <Header name="Search" />

      {/* Search Input */}
      <div className="relative mt-8 flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded-md border border-gray-300 p-3 pl-12 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
          onChange={handleSearch}
        />
        <MagnifyingGlassIcon className="absolute left-[25%] top-1/2 h-6 w-6 -translate-y-1/2 transform text-blue-500 dark:text-blue-400" />
      </div>

      {/* Search Results */}
      <div className="mx-auto mt-10 max-w-5xl space-y-8">
        {isLoading && (
          <p className="text-center text-lg text-gray-600">Loading...</p>
        )}
        {isError && (
          <p className="text-center text-red-500">
            Error occurred while fetching search results.
          </p>
        )}

        {!isLoading && !isError && (
          <div className="space-y-10">
            {/* Tasks Section */}
            {Array.isArray(searchResults.tasks) &&
              searchResults.tasks.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Tasks
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {searchResults.tasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                </div>
              )}

            {/* Projects Section */}
            {Array.isArray(searchResults.projects) &&
              searchResults.projects.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Projects
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {searchResults.projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>
              )}

            {/* Users Section */}
            {Array.isArray(searchResults.users) &&
              searchResults.users.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Users
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {searchResults.users.map((user) => (
                      <UserCard key={user.userId} user={user} />
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
