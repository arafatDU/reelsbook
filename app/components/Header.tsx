"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <nav className="bg-gray-900 sticky top-0 z-40 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Brand */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-bold text-xl hover:text-blue-400 transition"
              onClick={() =>
                showNotification("Welcome to ImageKit ReelsPro", "info")
              }
            >
              <Home className="w-5 h-5" />
              ReelsBook
            </Link>
          </div>
          {/* Right: User/Login Dropdown */}
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                <User className="w-5 h-5 text-white" />
              </button>
              {menuOpen && (
                <ul
                  className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  {session ? (
                    <>
                      <li className="px-4 py-2 text-gray-700 text-sm border-b border-gray-100">
                        {session.user?.email?.split("@")[0]}
                      </li>
                      <li>
                        <Link
                          href="/upload"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                          onClick={() => {
                            showNotification("Welcome to Admin Dashboard", "info");
                            setMenuOpen(false);
                          }}
                        >
                          Video Upload
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleSignOut();
                            setMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition"
                        >
                          Sign Out
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                        onClick={() => {
                          showNotification("Please sign in to continue", "info");
                          setMenuOpen(false);
                        }}
                      >
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
