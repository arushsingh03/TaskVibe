"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { setIsSidebarCollapsed } from "@/state";
import { useGetAuthUserQuery, useGetProjectsQuery } from "@/state/api";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import { signOut } from "aws-amplify/auth";
import { FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const { data: currentUser } = useGetAuthUserQuery({});
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!currentUser) return null;
  const currentUserDetails = currentUser?.userDetails;

  const sidebarClassName = `fixed flex flex-col h-full justify-between shadow-xl transition-all duration-300 z-40 dark:bg-black overflow-y-auto bg-white ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;

  return (
    <div className={sidebarClassName}>
      <div className="flex flex-col grow">
        {/* Top Logo */}
        <div className="z-50 flex min-h-[56px] items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            DASHBOARD
          </div>
          {!isSidebarCollapsed && (
            <button
              className="py-4"
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>

        {/* Team Section */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image
            src="https://tv-s3-images.s3.eu-north-1.amazonaws.com/sidebaricon.gif"
            alt="logo"
            width={50}
            height={50}
          />
          <div>
            <h3 className="text-[15px] font-semibold tracking-wide dark:text-gray-200">
              Sections
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>

        {/* Navbar Links */}
        <nav className="z-10 w-full">
          <SidebarLink href="/" icon={Home} label="Home" />
          <SidebarLink href="/timeline" icon={Briefcase} label="Timeline" />
          <SidebarLink href="/search" icon={Search} label="Search" />
          <SidebarLink href="/settings" icon={Settings} label="Settings" />
          <SidebarLink href="/users" icon={User} label="Users" />
          <SidebarLink href="/teams" icon={Users} label="Team" />
        </nav>

        {/* Projects Section */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span>Projects</span>
          {showProjects ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={Briefcase}
              label={project.name}
              href={`/projects/${project.id}`}
            />
          ))}

        {/* Priority Section */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span>Priority</span>
          {showPriority ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {showPriority && (
          <>
            <SidebarLink href="/priority/urgent" icon={AlertCircle} label="Urgent" />
            <SidebarLink href="/priority/high" icon={ShieldAlert} label="High" />
            <SidebarLink href="/priority/medium" icon={AlertTriangle} label="Medium" />
            <SidebarLink href="/priority/low" icon={AlertOctagon} label="Low" />
            <SidebarLink href="/priority/backlog" icon={Layers3} label="Backlog" />
          </>
        )}
      </div>

      {/* Sign Out Section */}
      <div className="flex items-center gap-4 bg-white px-8 py-4 dark:bg-black">
        <div className="flex items-center">
          {currentUserDetails?.profilePictureUrl ? (
            <Image
              src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${currentUserDetails.profilePictureUrl}`}
              alt={currentUserDetails.username || "User Profile Picture"}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <User className="h-10 w-10 rounded-full text-gray-500 dark:text-white" />
          )}
          <span className="ml-3 text-gray-800 dark:text-white">
            {currentUserDetails?.username}
          </span>
        </div>
        <button
          className="ml-auto flex items-center gap-2 rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500"
          onClick={handleSignOut}
        >
          <FaSignOutAlt />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex items-center gap-3 px-8 py-3 transition-colors ${
          isActive
            ? "bg-gray-100 text-white dark:bg-gray-600"
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        {isActive && <div className="absolute left-0 top-0 h-full w-1 bg-blue-500" />}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className="text-gray-800 dark:text-gray-100">{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
