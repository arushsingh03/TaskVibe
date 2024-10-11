import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Task } from "@/state/api";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaFlag,
  FaUser,
  FaTags,
  FaThumbtack,
} from "react-icons/fa"; // Font Awesome Icons
import { ChartNoAxesCombined } from "lucide-react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <div className="mb-6 transform rounded-lg bg-gray-950 p-6 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl dark:bg-dark-secondary dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-4">
          <p className="mb-3 text-xl font-semibold text-white">Attachments:</p>
          <div className="flex flex-wrap">
            {task.attachments.length > 0 && (
              <Image
                src={`/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName}
                width={400}
                height={200}
                className="rounded-lg shadow-md"
              />
            )}
          </div>
        </div>
      )}
      <div className="space-y-4 text-gray-100">
        <p className="flex items-center text-lg font-bold">
          <FaFlag className="mr-2 text-sky-500" />
          <span>ID:</span> <span className="ml-2">{task.id}</span>
        </p>
        <p className="flex items-center text-lg font-semibold">
          <FaTags className="mr-2 text-blue-300" />
          <span>Title:</span>{" "}
          <span className="ml-2 underline">{task.title}</span>
        </p>
        <p className="italic">
          <span className="font-semibold">Description:</span>{" "}
          {task.description || "No description Provided"}
        </p>
        <p className="flex items-center">
          <ChartNoAxesCombined className="h-5 w-5 mr-2 text-sky-500" />
          <strong>Status:</strong>
          <span
            className={`ml-2 rounded px-2 py-1 ${
              task.status === "To Do"
              ? "bg-red-500"
              : task.status === "Work In Progress"
                ? "bg-blue-500"
                : task.status === "Under Review"
                  ? "bg-yellow-500"
                  : task.status === "Completed"
                    ? "bg-green-500"
                    : ""} text-white`}
          >
            {task.status}
          </span>
        </p>
        <p className="flex items-center">
          <FaThumbtack className="mr-2 text-sky-500" />
          <strong>Priority:</strong>
          <span className={`rounded ml-2 px-2 py -1 pt-1 pb-1 text-xs font-semibold ${
        task.priority === "Urgent"
          ? "bg-red-200 text-red-700"
          : task.priority === "High"
            ? "bg-yellow-200 text-yellow-700"
            : task.priority === "Medium"
              ? "bg-green-200 text-green-700"
              : task.priority === "Low"
                ? "bg-blue-200 text-blue-700"
                : "bg-gray-200 text-gray-700"
      }`}>
            {task.priority}
          </span>
        </p>
        <p className="flex items-center">
          <FaTags className="mr-2 text-blue-300" />
          <strong>Tags:</strong> {task.tags || "No tags"}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
        </p>
        <p>
          <strong>Due Date:</strong>{" "}
          {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
        </p>
        <p className="flex items-center">
          <FaUser className="mr-2 text-blue-300" />
          <strong>Author:</strong>
          <span className="ml-2">
            {task.author ? task.author.username : "Unknown"}
          </span>
        </p>
        <p className="flex items-center">
          <FaUser className="mr-2 text-blue-300" />
          <strong>Assignee:</strong>
          <span className="ml-2">
            {task.assignee ? task.assignee.username : "Unassigned"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
