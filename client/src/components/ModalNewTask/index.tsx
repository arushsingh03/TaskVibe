import { formatISO } from "date-fns";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { Priority, Status, useCreateTaskMutation } from "@/state/api";
import {
  ClipboardDocumentIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
};

const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleSubmit = async () => {
    try {
      if (!isFormValid()) return;

      const formattedStartDate = startDate
        ? formatISO(new Date(startDate))
        : undefined;
      const formattedDueDate = dueDate
        ? formatISO(new Date(dueDate))
        : undefined;

      await createTask({
        title,
        description,
        status,
        priority,
        tags,
        startDate: formattedStartDate,
        dueDate: formattedDueDate,
        authorUserId: parseInt(authorUserId),
        assignedUserId: parseInt(assignedUserId),
        projectId: id !== null ? Number(id) : Number(projectId),
      });

      resetForm();
      onClose();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus(Status.ToDo);
    setPriority(Priority.Backlog);
    setTags("");
    setStartDate(undefined);
    setDueDate(undefined);
    setAuthorUserId("");
    setAssignedUserId("");
    setProjectId("");
  };

  const isFormValid = () => {
    return title && authorUserId && (id !== null || projectId);
  };

  const inputStyles =
    "w-full flex items-center gap-2 rounded border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white";

  const selectStyles =
    "block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className={inputStyles}>
          <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className={inputStyles}>
          <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full resize-none bg-transparent outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) =>
              setStatus(Status[e.target.value as keyof typeof Status])
            }
          >
            <option value="">Select Status</option>
            {Object.keys(Status).map((key) => (
              <option key={key} value={key}>
                {Status[key as keyof typeof Status]}
              </option>
            ))}
          </select>

          <select
            className={selectStyles}
            value={priority}
            onChange={(e) =>
              setPriority(Priority[e.target.value as keyof typeof Priority])
            }
          >
            <option value="">Select Priority</option>
            {Object.keys(Priority).map((key) => (
              <option key={key} value={key}>
                {Priority[key as keyof typeof Priority]}
              </option>
            ))}
          </select>
        </div>

        <div className={inputStyles}>
          <TagIcon className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className={inputStyles}>
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value || undefined)}
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className={inputStyles}>
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={dueDate || ""}
              onChange={(e) => setDueDate(e.target.value || undefined)}
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div className={inputStyles}>
          <UserIcon className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Author User ID"
            value={authorUserId}
            onChange={(e) => setAuthorUserId(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className={inputStyles}>
          <UserIcon className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Assigned User ID"
            value={assignedUserId}
            onChange={(e) => setAssignedUserId(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
        </div>

        {id === null && (
          <div className={inputStyles}>
            <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Project ID"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>
        )}

        <button
          type="submit"
          className={`mt-4 flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
