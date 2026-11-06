import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const portfolioLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  // আপনার দেওয়া সিরিয়াল অনুযায়ী মেনু
  const systemLinks = [
    { label: "Register", path: "/register" },
    { label: "Login", path: "/login" },
    { label: "Forgot Password", path: "/forgotpassword" },
    { label: "Profile", path: "/profile" },
    { label: "Admin Panel", path: "/adminpanel" },
    { label: "Chat with Owner", path: "/chat" },
    { label: "Booking", path: "/booking" },
    { label: "Payment", path: "/payment" },
  ];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setIsMenuOpen(false);
    navigate("/login");
  };

  const handleScroll = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-xl font-bold text-gray-900 shrink-0 group"
          >
            <span className="relative">
              <svg
                viewBox="0 0 40 40"
                className="w-10 h-10 transition-transform duration-300 group-hover:rotate-[8deg]"
                aria-hidden="true"
              >
                <defs>
                  {/* এখানে গ্রেডিয়েন্ট সবুজ করা হয়েছে */}
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                </defs>
                <rect width="40" height="40" rx="12" fill="url(#logoGrad)" />
                <path
                  d="M 26 14 
                     C 25 13, 22 12, 19 12 
                     C 14 12, 11 15, 11 20 
                     C 11 25, 14 28, 19 28 
                     C 23 28, 26 26, 26 23 
                     L 26 20 
                     L 20 20"
                  stroke="white"
                  strokeWidth="2.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>
              install_<span className="text-emerald-600">Gazi</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {portfolioLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                isMenuOpen
                  ? "bg-emerald-50 border-emerald-600 text-emerald-600"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="text-sm font-semibold">
                {isMenuOpen ? "Close" : "Menu"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>

            {/* Dropdown Menu (Scrollable) */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl overflow-y-auto max-h-[70vh] py-2">
                <div className="md:hidden flex flex-col border-b border-gray-100 pb-2 mb-2">
                  <p className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Navigation
                  </p>
                  {portfolioLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleScroll(e, item.href)}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <p className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Account & Services
                </p>
                {systemLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;