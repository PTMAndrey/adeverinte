import React from 'react'
import styles from "./Secretariat.module.scss";
import { useLocation, } from 'react-router-dom';
import Adauga from './Adauga';
import List from './List';

const Secretariat = () => {
  const location = useLocation();
  const currentTab = location.pathname.split("/")[2];
  const tabSelector = () => {
    switch (currentTab) {
      case "lista":
        return <List/>;
      case "adauga":
        return <Adauga />;
      default:
        break;
    }
  };
  return (
    <section className={styles.pageSecretariat}>
      <div className={styles.content}>{tabSelector()}</div>
    </section>

  );
};

export default Secretariat;