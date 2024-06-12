import React from 'react'
import styles from "./Profile.module.scss";
import { useLocation,  } from 'react-router-dom';
import Info from './Info';

const Profile = () => {
  const location = useLocation();
  const currentTab = location.pathname.split("/")[2];
  const tabSelector = () => {
    switch (currentTab) {
      case "info":
        return <Info />;
      default:
        break;
    }
  };
  return (
    <section className={styles.pageProfile}>
      <div className={styles.content}>{tabSelector()}</div>
    </section>

  );
};

export default Profile;