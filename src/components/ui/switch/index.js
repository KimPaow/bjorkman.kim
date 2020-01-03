import React from "react";
import styles from "./switch.module.scss";

const Switch = ({ id, isOn, handleToggle }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className={styles.react_switch_checkbox}
        id={id}
        type="checkbox"
      />
      <label
        style={{ background: isOn && "#06D6A0" }}
        className={styles.react_switch_label}
        htmlFor={id}
      >
        <span className={styles.react_switch_button} />
      </label>
    </>
  );
};

export default Switch;
