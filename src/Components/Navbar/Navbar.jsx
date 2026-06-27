import React, { useState, useEffect, useContext, useRef } from "react";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCartArrowDown, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import logos from "../Assets/Logolapy.png";
import { ShopContext } from "../../Context/ShopContext";

function Navigation() {
   
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const location = useLocation();
    const [isNavbarOpen, setNavbarOpen] = useState(false);
    const [hasNewNotification, setHasNewNotification] = useState(false);
    const { getTotalCartItems } = useContext(ShopContext);
    const navbarRef = useRef(null);

    const handleNavbarToggle = () => {      
        setNavbarOpen(!isNavbarOpen);
    };

    const handleLinkClick = () => {
        setNavbarOpen(false);
    };

 


    const handleWelcomeClick = () => {
        navigate("/welcome");
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const updatedUsername = localStorage.getItem('username');
            if (updatedUsername) {
                setUsername(updatedUsername);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [username]);

    useEffect(() => {
        if (location.pathname.includes('/Welcome')) {
            const searchParams = new URLSearchParams(location.search);
            const name = searchParams.get('name');
            if (name) {
                setUsername(name);
            }
        }
    }, [location]);

    useEffect(() => {
        const checkForNewNotifications = () => {
            setTimeout(() => {
                setHasNewNotification(true);
            }, 5000);
        };
        checkForNewNotifications();
    }, []);

    const handleNotificationClick = () => {
        if (username) {
            navigate('/Notifications');
        } else {
            navigate('/Home');
        }
        setHasNewNotification(false);
    };

    const handlePlaceholderClick = () => {
        navigate('/searchitemsdisplay');
    };

    const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setNavbarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

  return (
  <header
    ref={navbarRef}
    className="fixed top-0 left-0 z-50 w-full bg-[#0e1015] shadow-lg"
  >
    <nav className="mx-auto flex h-20 items-center justify-between px-4 lg:px-8">

      {/* Logo */}
      <NavLink to="/" onClick={handleLinkClick}>
        <img
          src={logos}
          alt="SkyLap Logo"
          className="h-16 w-auto brightness-0 invert"
        />
      </NavLink>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Username */}
        {username && (
          <button
            onClick={handleWelcomeClick}
            className="hidden md:block font-bold text-white hover:text-cyan-400"
          >
            Hi {username}
          </button>
        )}

        {/* Notification */}
        {username && (
          <button
            onClick={handleNotificationClick}
            className="relative text-white hover:text-red-500"
          >
            <FontAwesomeIcon
              icon={faBell}
              className={`text-xl ${
                hasNewNotification ? "animate-pulse text-red-500" : ""
              }`}
            />
          </button>
        )}

        {/* Cart */}
        {username && (
          <NavLink
            to="/cart"
            className="relative text-white hover:text-cyan-400"
          >
            <FontAwesomeIcon
              icon={faCartArrowDown}
              className="text-2xl"
            />

            <span className="absolute -top-2 -right-2 rounded-full bg-red-600 px-1 text-[10px] text-white">
              {getTotalCartItems()}
            </span>
          </NavLink>
        )}

        {/* Orders */}
        {username && (
          <div className="group relative">
            <NavLink
              to="/orders"
              className="text-green-500"
            >
              <FontAwesomeIcon
                icon={faTruckFast}
                className="text-2xl"
              />
            </NavLink>

            <span className="absolute left-1/2 top-10 hidden -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
              My Orders
            </span>
          </div>
        )}

        {/* Mobile Button */}
        <button
          onClick={handleNavbarToggle}
          className="text-white lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isNavbarOpen ? (
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

      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex lg:items-center lg:gap-6 ">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm font-medium no-underline ${
              isActive
                ? "text-blue-400"
                : "text-white hover:text-cyan-400"
            }`
          }
        >
          HOME
        </NavLink>

        <NavLink
          to="/Products"
          className={({ isActive }) =>
            `text-sm font-medium no-underline ${
              isActive
                ? "text-blue-400"
                : "text-white hover:text-cyan-400"
            }`
          }
        >
          PRODUCTS
        </NavLink>

        <NavLink
          to="/About"
          className={({ isActive }) =>
            `text-sm font-medium no-underline ${
              isActive
                ? "text-blue-400"
                : "text-white hover:text-cyan-400"
            }`
          }
        >
          ABOUT
        </NavLink>

        <NavLink
          to="/Contact"
          className={({ isActive }) =>
            `text-sm font-medium no-underline ${
              isActive
                ? "text-blue-400"
                : "text-white hover:text-cyan-400"
            }`
          }
        >
          CONTACT
        </NavLink>

        {location.pathname !== "/searchitemsdisplay" && (
          <input
            type="search"
            placeholder="🔍 Search laptop models..."
            onClick={handlePlaceholderClick}
            className="rounded-lg border border-gray-700 bg-[#232427] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
          />
        )}

      </div>
    </nav>

    {/* Mobile Menu */}
    {isNavbarOpen && (
      <div className="bg-[#0e1015] px-6 pb-5 lg:hidden">

        <NavLink
          to="/"
          onClick={handleLinkClick}
          className="block py-3 text-white hover:text-cyan-400"
        >
          HOME
        </NavLink>

        <NavLink
          to="/Products"
          onClick={handleLinkClick}
          className="block py-3 text-white hover:text-cyan-400"
        >
          PRODUCTS
        </NavLink>

        <NavLink
          to="/About"
          onClick={handleLinkClick}
          className="block py-3 text-white hover:text-cyan-400"
        >
          ABOUT
        </NavLink>

        <NavLink
          to="/Contact"
          onClick={handleLinkClick}
          className="block py-3 text-white hover:text-cyan-400"
        >
          CONTACT
        </NavLink>

      </div>
    )}

  </header>
);
}
export default Navigation;
