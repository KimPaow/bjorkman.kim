import React from "react";
import styles from "./switch.module.scss";

const Switch = ({ isOn, handleToggle }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className={styles.react_switch_checkbox}
        id={styles.react_switch_new}
        type="checkbox"
      />
      <label
        className={styles.react_switch_label}
        htmlFor={styles.react_switch_new}
      >
        <span className={styles.react_switch_button} />
      </label>
    </>
  );
};

export default Switch;
