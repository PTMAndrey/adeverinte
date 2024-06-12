import React from 'react'
import styles from "./Adeverinte.module.scss";
import { useLocation, } from 'react-router-dom';
import Cereri from './Cereri';
import Acceptate from './Acceptate';
import Respinse from './Respinse';

const Adeverinte = () => {
  const location = useLocation();
  const currentTab = location.pathname.split("/")[2];
  const tabSelector = () => {
    switch (currentTab) {
      case "cereri":
        return <Cereri />;
      case "acceptate":
        return <Acceptate />;
      case "respinse":
        return <Respinse />;
      default:
        break;
    }
  };
  return (
    <section className={styles.pageAdeverinte}>
      <div className={styles.content}>{tabSelector()}</div>
    </section>

  );
};

export default Adeverinte;