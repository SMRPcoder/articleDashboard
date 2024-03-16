import React from "react";

interface NavLinkProps {
  active: boolean;
  index: number;
  onClick: (index: number) => void;
  iconClass: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ active, index, onClick, iconClass, label }) => {
  return (
    <a
      href='#'
      className={`nav_link ${active ? "active" : ""}`}
      onClick={() => onClick(index)}
    >
      <i className={iconClass}></i>
      <span className='nav_name'>{label}</span>
    </a>
  );
};

interface NavLinksProps {
  activeLink: number | null;
  handleLinkClick: (index: number) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ activeLink, handleLinkClick }) => {
  const navLinks = [
    { label: "Dashboard", iconClass: "bx bx-grid-alt" },
    { label: "Users", iconClass: "bx bx-user" },
    { label: "Messages", iconClass: "bx bx-message-square-detail" },
    { label: "Bookmark", iconClass: "bx bx-bookmark" },
    { label: "Files", iconClass: "bx bx-folder" },
    { label: "Stats", iconClass: "bx bx-bar-chart-alt-2" }
  ];

  return (
    <div className='nav_list'>
      {navLinks.map((link, index) => (
        <NavLink
          key={index}
          active={activeLink === index}
          index={index}
          onClick={handleLinkClick}
          iconClass={link.iconClass}
          label={link.label}
        />
      ))}
      <a href='#' className='nav_link'>
        <i className='bx bx-log-out nav_icon'></i>
        <span className='nav_name'>SignOut</span>
      </a>
    </div>
  );
};

export default NavLinks;