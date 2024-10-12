import { formatISO } from "date-fns";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { useCreateProjectMutation } from "@/state/api";
import { FiLoader, FiPlus, FiCalendar, FiFileText, FiX } from "react-icons/fi";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async () => {
    if (!projectName || !startDate || !endDate) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });

    await createProject({
      name: projectName,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
    onClose(); // Close modal after submission
  };

  const isFormValid = () => {
    return projectName && description && startDate && endDate;
  };

  const inputStyles =
    "w-full rounded-lg border border-gray-300 p-3 shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-dark-tertiary dark:bg-dark-secondary dark:text-white";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-red-500"
        >
          <FiX size={24} />
        </button>
        <form
          className="animate-fade-in mt-6 space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="relative">
            <FiFileText className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              className={`${inputStyles} pl-10`}
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div className="relative">
            <textarea
              className={`${inputStyles} h-28`}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="relative">
              <FiCalendar className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="date"
                className={`${inputStyles} pl-10`}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="relative">
              <FiCalendar className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="date"
                className={`${inputStyles} pl-10`}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-white transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
              !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? (
              <FiLoader className="mr-2 animate-spin" />
            ) : (
              <FiPlus className="mr-2" />
            )}
            {isLoading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalNewProject;
