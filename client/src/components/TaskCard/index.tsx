import React, { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Task } from "@/state/api";
import { FaFlag, FaUser, FaTags, FaThumbtack } from "react-icons/fa"; // Font Awesome Icons
import {
  CalendarCheck2,
  CalendarPlus,
  ChartNoAxesCombined,
  PenTool,
} from "lucide-react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="mb-6 transform rounded-lg bg-gray-100 p-6 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl dark:bg-dark-secondary dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-4">
          <p className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            Attachments:
          </p>
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
      <div className="space-y-4 text-gray-900 dark:text-white">
        <p className="flex items-center text-lg font-semibold">
          <FaFlag className="mr-2 text-sky-500" />
          <span>ID:</span> <span className="ml-2">{task.id}</span>
        </p>
        <p className="flex items-center text-lg font-semibold">
          <FaTags className="mr-2 text-blue-400" />
          <span>Title:</span> <span className="ml-2">{task.title}</span>
        </p>
        <div className="flex items-start space-x-2 text-base">
          <PenTool className="mt-1 h-4 w-4 flex-shrink-0 text-blue-400" />
          <div className="flex flex-col">
            <div className="flex">
              <span className="whitespace-nowrap font-semibold">
                Description:{" "}
              </span>
              <span
                className={`pl-1 ${isExpanded ? "" : "line-clamp-3"}`}
                title={task.description || "No description provided"}
              >
                {task.description || "No description provided"}
              </span>
            </div>
            {task.description && task.description.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1 self-start text-sm text-blue-500 hover:underline"
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </div>
        <p className="flex items-center">
          <ChartNoAxesCombined className="mr-2 h-5 w-5 text-sky-500" />
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
                      : ""
            } text-white`}
          >
            {task.status}
          </span>
        </p>
        <p className="flex items-center">
          <FaThumbtack className="mr-2 text-sky-500" />
          <strong>Priority:</strong>
          <span
            className={`py -1 ml-2 rounded px-2 pb-1 pt-1 text-xs font-semibold ${
              task.priority === "Urgent"
                ? "bg-red-200 text-red-700"
                : task.priority === "High"
                  ? "bg-yellow-200 text-yellow-700"
                  : task.priority === "Medium"
                    ? "bg-green-200 text-green-700"
                    : task.priority === "Low"
                      ? "bg-blue-200 text-blue-700"
                      : "bg-gray-200 text-gray-700"
            }`}
          >
            {task.priority}
          </span>
        </p>
        <p className="flex items-center">
          <FaTags className="mr-2 text-blue-300" />
          <strong>Tags:</strong>
          {task.tags || "No tags"}
        </p>
        <p className="flex items-center">
          <CalendarPlus className="mr-2 h-4 w-4 text-blue-400" />
          <strong>Start Date:</strong>{" "}
          {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
        </p>
        <p className="flex items-center">
          <CalendarCheck2 className="mr-2 h-4 w-4 text-blue-400" />
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
