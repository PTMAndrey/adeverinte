import React from "react";
import styles from "./SidebarNavigation.module.scss";
// import { FaHome } from "react-icons/fa";
// import { TbLayoutSidebarRightExpandFilled, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
// import { FaUserCircle, FaBell } from "react-icons/fa";
// import { IoIosPeople } from "react-icons/io";
// import { LiaUsersSolid } from "react-icons/lia";
// import { GiTeamIdea, GiSkills } from "react-icons/gi";
// import { FaFolderOpen } from "react-icons/fa6";
// import { MdOutlineStars } from "react-icons/md";
// import { BiLogOutCircle } from "react-icons/bi";
// import { SiPaperspace } from "react-icons/si";

import useAuthProvider from "../../hooks/useAuthProvider";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useStateProvider from "../../hooks/useStateProvider";
import { Home, ManageAccountsIcon, ContactMail } from "../../assets/icons/iconsMUI";


const SidebarNavigation = ({ toggleSidebar, isSidebarOpen }) => {
  const { logout } = useAuthProvider();
  const { user } = useAuthProvider();

  const navigate = useNavigate();
  const location = useLocation().pathname;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  return (
    <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
      <div className={styles.headerSideBar}>
        <div className={styles.profileContainer}>
          {/* <button onClick={toggleSidebar} className={styles.buttonToggleSideBar}>
            {isSidebarOpen ? <TbLayoutSidebarRightExpandFilled /> : <TbLayoutSidebarLeftExpandFilled />}
          </button> */}
          <Link to="/profile/info" className={(location === "/profile/info" || location === "/profile/skills") ? styles.activeMenuProfile : null}>
            {/* <FaUserCircle className={styles.profileImg} /> */}
            {isSidebarOpen && <span>Profile</span>}
          </Link>
        </div>
      </div>
      <hr />
      <div className={styles.menuItems}>
        <Link to="/" className={location === "/" ? styles.activeMenuItem : styles.menuItem}>
          <Home className={styles.img} />
          {isSidebarOpen && <span>Home</span>}
        </Link>
        <hr />


        <Link to="/users" className={location === "/users" ? styles.activeMenuItem : styles.menuItem} >
          {/* <LiaUsersSolid className={styles.img} /> */}
          {isSidebarOpen && <span>Users</span>}
        </Link>
        <hr />

        <Link to="/secretariat" className={location === "/secretariat" ? styles.activeMenuItem : styles.menuItem}>
          <ManageAccountsIcon className={styles.img} />
          {isSidebarOpen && <span>Secretariat</span>}
        </Link>
        <hr />

        <Link to="/secretariat" className={location === "/secretariat" ? styles.activeMenuItem : styles.menuItem}>
          <ContactMail className={styles.img} />
          {isSidebarOpen && <span>Cereri</span>}
        </Link>
        <hr />

        <Link to="/studenti" className={location === "/studenti" ? styles.activeMenuItem : styles.menuItem}>
          {/* <FaBell className={styles.img} /> */}
          {isSidebarOpen && <span>Studenti</span>}
        </Link>
        <hr />

        {/* <Link to="/notifications" className={location === "/notifications" ? styles.activeMenuItem : styles.menuItem}>
          {isSidebarOpen && <span>Notifications</span>}
        </Link>
        <hr /> */}
      </div>
      <hr />
      <div className={styles.bottomSideBar}>
        <button onClick={handleLogout}>
          {/* <BiLogOutCircle className={styles.notificationBell} /> */}
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
export default SidebarNavigation;
