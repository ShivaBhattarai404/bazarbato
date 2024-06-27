"use client";

import { Fragment } from "react";
import styles from "./Toggle.module.css";

const Toggle = (props) => {
  const { className, ...rest } = props;
  return (
    <Fragment>
      <input
        id={props.id || "toggle"}
        className={styles.input}
        type="checkbox"
        {...rest}
        defaultChecked
        hidden
      />
      <label
        className={`${props.className} ${styles.toggle}`}
        htmlFor={props.id || "toggle"}
      />
    </Fragment>
  );
};

export default Toggle;
