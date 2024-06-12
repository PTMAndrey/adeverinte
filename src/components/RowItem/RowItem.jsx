import React from "react";
import styles from "./RowItem.module.scss";

const RowItem = ({ icon, active, disabled, title, info, action, onAction, onCancel }) => {
  return (
    <div className={styles.container}>
      <span>
        <h6 className={styles.title}>{icon}{title}</h6>
        <p className={styles.info2}>{info}</p>
      </span>

      {active ? (
        <button className={styles.action} onClick={onCancel}>
          Cancel
        </button>
      ) : (
        <button disabled={disabled} className={disabled ? styles.disabled : styles.action} onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  );
};

export default RowItem;
