import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { User, Briefcase, LogOut, Menu, X, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div>
      <header className="bg-atlas-gold shadow-sm border-b-black sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-[#3471cb] to-[#000503] rounded-lg p-2 mr-3">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-br from-[#3471cb] to-[#000503] bg-clip-text text-transparent">
                Atlas
              </h1>
            </div>

            {/* Desktop Menu */}
            {user && (
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div
                    className={`p-1 rounded-full ${
                      user.role === "user" ? "bg-atlas-primary-default" : "bg-atlas-primary-default"
                    }`}
                  >
                    {user.role === "user" ? (
                      <User className="h-5 w-5 text-white" />
                    ) : (
                      <Briefcase className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.full_name}
                  </span>
                  <span className="text-xs text-white font-semibold capitalize bg-atlas-primary-default px-2 py-1 rounded-full">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-bold text-atlas-primary-default hover:text-white hover:bg-gradient-to-br from-[#3471cb] to-[#000503] rounded-lg transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger */}
            {user && (
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-700 focus:outline-none"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && user && (
            <div className="md:hidden mt-2 border-t pt-2">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2">
                  <div
                    className={`p-1 rounded-full ${
                      user.role === "user" ? "bg-[#BBFBFF]" : "bg-[#8DD8FF]"
                    }`}
                  >
                    {user.role === "user" ? (
                      <User className="h-4 w-4 text-[#5409DA]" />
                    ) : (
                      <Briefcase className="h-4 w-4 text-[#5409DA]" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.full_name}
                  </span>
                  <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-[#5409DA] hover:bg-[#BBFBFF] rounded-lg transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
