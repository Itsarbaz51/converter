"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Compress", href: "/compress" },
    { label: "Convert", href: "/convert" },
    { label: "Merge", href: "/merge" },
    { label: "Edit", href: "/edit" },
    { label: "Sign", href: "/sign" },
    { label: "AI PDF", href: "/ai-pdf" },
  ];

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <>
      <nav className="border-b border-gray-200  bg-white px-4 py-3 shadow-sm">

        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">Small</span>
                <span className="text-2xl font-bold text-gray-800">pdf</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center justify-center space-x-6 md:flex">
            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                <span className="font-medium">Tools</span>
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute left-0 mt-1 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-xl">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Regular Nav Links */}
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Pricing */}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-3 border-t border-gray-200 pt-3 md:hidden">
            <div className="space-y-2">
              {/* Tools in mobile */}
              <div className="px-2">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <span className="font-medium">Tools</span>
                  <svg
                    className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="mt-1 ml-4 space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Nav Links */}
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-gray-200 pt-2"></div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
export default Navbar;
