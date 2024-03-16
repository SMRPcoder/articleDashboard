import React, { useState, useEffect, useRef } from "react";

interface IHeaderProps {}

const Navbar: React.FC<IHeaderProps> = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (index: number) => {
    setActiveLink(index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className={`header ${isNavOpen ? "body-pd" : ""} my-3`} id='header'>
        <div className='container-fluid'>
          <div className='card'>
            <div className='card-body' style={{ padding: "0.5rem 1.5rem" }}>
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-row align-items-center">
                <i className='bx bx-stats'></i>
                  {/* <input className="form-control me-2 search_input" style={{ border: 'none' }} type="search" placeholder="Search" aria-label="Search" /> */}
                </div>

               

                {isOpen && (
                  <div className='dropdown-content'>
                    <a className='user_menu_item'>
                      <i className='bx bxs-user fs-5'></i>
                      <span>Users</span>
                    </a>
                    <a className='user_menu_item'>
                      <i className='bx bx-log-in fs-5'></i>
                      <span>Logout</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`l-navbar ${isNavOpen ? "show" : ""}`} id='nav-bar'>
        <nav className='nav'>
          {/* <div>
            <a href='#' className='nav_logo' onClick={toggleNavbar}>
              <i className='bx bx-menu nav_icon' id='header-toggle'></i>
              <span className='nav_name'>Menu</span>
            </a>
           
          </div> */}
          
        </nav>
      </div>
    </>
  );
};

export default Navbar;