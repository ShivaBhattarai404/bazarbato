"use client";

import { Fragment } from "react";
import styles from "./Toggle.module.css";

const Toggle = ({ className, id, defaultChecked, ...rest }) => {
  return (
    <Fragment>
      <input
        id={id || "toggle"}
        className={styles.input}
        type="checkbox"
        {...rest}
        defaultChecked={defaultChecked === undefined ? true : defaultChecked}
        hidden
      />
      <label
        className={`${className} ${styles.toggle}`}
        htmlFor={id || "toggle"}
      />
    </Fragment>
  );
};

export default Toggle;
