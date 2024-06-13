import React from "react";
import styles from "./SidebarNavigation.module.scss";
import useAuthProvider from "../../hooks/useAuthProvider";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Home,
  ContactMail,
  GroupsIcon,
  BusinessIcon,
  FullscreenIcon,
  CloseFullscreenIcon,
  LogoutIcon,
  Face2Icon
} from "../../assets/icons/iconsMUI";


const SidebarNavigation = ({ toggleSidebar, isSidebarOpen }) => {
  const { logout, user } = useAuthProvider();

  const navigate = useNavigate();
  const location = useLocation().pathname;

  const handleLogout = () => {
    navigate("/login");
    logout();
  };


  return (
    <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
      <div className={styles.headerSideBar}>
        <div className={styles.profileContainer}>
          <button onClick={toggleSidebar} className={styles.buttonToggleSideBar}>
            {isSidebarOpen ? <CloseFullscreenIcon /> : <FullscreenIcon />}
          </button>
          {/* <Link to="/profil/info" className={(location === "/profil/info" || location === "/profil/skills") ? styles.activeMenuProfile : null}>
            <FaUserCircle className={styles.profileImg} />
            {isSidebarOpen && <span>Profil</span>}
          </Link> */}
        </div>
      </div>
      <hr />
      <div className={styles.menuItems}>
        <Link to="/" className={location === "/" ? styles.activeMenuItem : styles.menuItem}>
          <Home className={styles.img} />
          {isSidebarOpen && <span>Acasă</span>}
        </Link>
        <hr />

        {user?.rol === "ADMIN" &&
          <>
            <Link to="/facultate/info" className={location === "/facultate/info" ? styles.activeMenuItem : styles.menuItem} >
              <BusinessIcon className={styles.img} />
              {isSidebarOpen && <span>Facultate</span>}
            </Link>
            <hr />
          </>
        }

        {(!location.includes("/studenti/") || location === "/studenti/lista") && <>
          <Link to="/studenti/lista" className={location === "/studenti/lista" ? styles.activeMenuItem : styles.menuItem}>
            <GroupsIcon className={styles.img} />
            {isSidebarOpen && <span>Studenti</span>}
          </Link>
          <hr />
        </>}

        {location === "/studenti/adauga" && <>
          <Link to="/studenti/adauga" className={location === "/studenti/adauga" ? styles.activeMenuItem : styles.menuItem}>
            <GroupsIcon className={styles.img} />
            {isSidebarOpen && <span>Studenti</span>}
          </Link>
          <hr />
        </>}

        {user?.rol === "ADMIN" && <>
          {(!location.includes("/secretariat/") || location === "/secretariat/lista") && <>
            <Link to="/secretariat/lista" className={location === "/secretariat/lista" ? styles.activeMenuItem : styles.menuItem}>
              <Face2Icon className={styles.img} />
              {isSidebarOpen && <span>Secretariat</span>}
            </Link>
            <hr />
          </>}

          {location === "/secretariat/adauga" && <>
            <Link to="/secretariat/adauga" className={location === "/secretariat/adauga" ? styles.activeMenuItem : styles.menuItem}>
              <Face2Icon className={styles.img} />
              {isSidebarOpen && <span>Secretariat</span>}
            </Link>
            <hr />
          </>}
        </>}
        {user?.rol === 'SECRETAR' &&
          <>
            {(!location.includes("/adeverinte/") || location === "/adeverinte/cereri") && <>
              <Link to="/adeverinte/cereri" className={location === "/adeverinte/cereri" ? styles.activeMenuItem : styles.menuItem}>
                <ContactMail className={styles.img} />
                {isSidebarOpen && <span>Adeverinte</span>}
              </Link>
              <hr />
            </>}

            {location === "/adeverinte/acceptate" &&
              <>
                <Link to="/adeverinte/acceptate" className={location === "/adeverinte/acceptate" ? styles.activeMenuItem : styles.menuItem}>
                  <ContactMail className={styles.img} />
                  {isSidebarOpen && <span>Adeverinte</span>}
                </Link>
                <hr />
              </>}

            {location === "/adeverinte/respinse" &&
              <>
                <Link to="/adeverinte/respinse" className={location === "/adeverinte/respinse" ? styles.activeMenuItem : styles.menuItem}>
                  <ContactMail className={styles.img} />
                  {isSidebarOpen && <span>Adeverinte</span>}
                </Link>
                <hr />
              </>
            }
          </>
        }
      </div>
      <hr />
      <div className={styles.bottomSideBar}>
        <button onClick={handleLogout}>
          {/* <BiLogOutCircle className={styles.notificationBell} /> */}
          {isSidebarOpen ? <span><LogoutIcon className={styles.img} /> Logout</span> : <LogoutIcon className={styles.img} />}
        </button>
      </div>
    </div>
  );
}
export default SidebarNavigation;
