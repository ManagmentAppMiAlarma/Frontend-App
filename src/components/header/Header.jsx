import React, { useState, useRef, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaClipboardList,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { useAuth } from "../../hooks";

const Header = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { auth } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = {
    admin: [
      {
        id: 1,
        to: "/inicio/clientes",
        title: "Clientes",
        icon: FaUsers,
      },
      {
        id: 2,
        to: "/inicio/ordenes",
        title: "Ordenes de Servicio",
        icon: FaClipboardList,
      },
      {
        id: 3,
        to: "/inicio/empleados",
        title: "Usuarios",
        icon: FaUsers,
      },
    ],
    user: [
      {
        id: 1,
        to: "/inicio/ordenes",
        title: "Ordenes de Servicio",
        icon: FaClipboardList,
      },
    ],
  };

  return (
    <header className="bg-gradient-to-r from-gray-700 to-black shadow-lg">
      {role == "admin" || role == "owner" ? (
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <NavLink to="/" className="text-white text-2xl font-bold">
              <img
                src={Global.images.logo}
                alt="Logo de Mi Alarma"
                className="w-14"
              />
            </NavLink>
            <div className="hidden md:flex space-x-8 items-center text-white">
              {navItems.admin.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link flex items-center text-lg ${
                      isActive ? "nav-link-active" : ""
                    }`
                  }
                >
                  <item.icon className="mr-2 text-xl" />
                  {item.title}
                </NavLink>
              ))}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="nav-link flex items-center text-lg"
                >
                  <FaUserCircle className="mr-2 text-xl" />
                  Mi Cuenta
                  <FaChevronDown className="ml-2" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <NavLink
                      to="perfil"
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                          isActive ? "bg-gray-100" : ""
                        }`
                      }
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaUserCircle className="inline-block mr-2" />
                      Mi Perfil
                    </NavLink>
                    <NavLink
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      to="/inicio/logout"
                    >
                      <FaSignOutAlt className="inline-block mr-2" />
                      Cerrar Sesión
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
            <button className="md:hidden text-white" onClick={toggleMenu}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          {isOpen && (
            <div className="md:hidden mt-4 fade-in">
              {navItems.admin.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  className={({ isActive }) =>
                    `block py-2 nav-link text-lg ${
                      isActive ? "nav-link-active" : ""
                    }`
                  }
                  onClick={toggleMenu}
                >
                  <item.icon className="inline-block mr-2 text-xl" />
                  {item.title}
                </NavLink>
              ))}
              <NavLink
                to="perfil"
                className={({ isActive }) =>
                  `block py-2 nav-link text-lg ${
                    isActive ? "nav-link-active" : ""
                  }`
                }
                onClick={toggleMenu}
              >
                <FaUserCircle className="inline-block mr-2 text-xl" />
                Mi Perfil
              </NavLink>
              <NavLink
                className="block py-2 nav-link text-lg "
                to="/inicio/logout"
              >
                <FaSignOutAlt className="inline-block mr-2" />
                Cerrar Sesión
              </NavLink>
            </div>
          )}
        </nav>
      ) : (
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <NavLink to="/" className="text-white text-2xl font-bold">
              <img
                src={Global.images.logo}
                alt="Logo de Mi Alarma"
                className="w-14"
              />
            </NavLink>
            <div className="hidden md:flex space-x-8 items-center text-white">
              {navItems.user.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link flex items-center text-lg ${
                      isActive ? "nav-link-active" : ""
                    }`
                  }
                >
                  <item.icon className="mr-2 text-xl" />
                  {item.title}
                </NavLink>
              ))}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="nav-link flex items-center text-lg"
                >
                  <FaUserCircle className="mr-2 text-xl" />
                  Mi Cuenta
                  <FaChevronDown className="ml-2" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <NavLink
                      to="perfil"
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                          isActive ? "bg-gray-100" : ""
                        }`
                      }
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaUserCircle className="inline-block mr-2" />
                      Mi Perfil
                    </NavLink>
                    <NavLink
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      to="/inicio/logout"
                    >
                      <FaSignOutAlt className="inline-block mr-2" />
                      Cerrar Sesión
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
            <button className="md:hidden text-white" onClick={toggleMenu}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          {isOpen && (
            <div className="md:hidden mt-4 fade-in">
              {navItems.user.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  className={({ isActive }) =>
                    `block py-2 nav-link text-lg ${
                      isActive ? "nav-link-active" : ""
                    }`
                  }
                  onClick={toggleMenu}
                >
                  <item.icon className="inline-block mr-2 text-xl" />
                  {item.title}
                </NavLink>
              ))}
              <NavLink
                to="perfil"
                className={({ isActive }) =>
                  `block py-2 nav-link text-lg ${
                    isActive ? "nav-link-active" : ""
                  }`
                }
                onClick={toggleMenu}
              >
                <FaUserCircle className="inline-block mr-2 text-xl" />
                Mi Perfil
              </NavLink>
              <NavLink
                className="block py-2 nav-link text-lg "
                to="/inicio/logout"
              >
                <FaSignOutAlt className="inline-block mr-2" />
                Cerrar Sesión
              </NavLink>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
