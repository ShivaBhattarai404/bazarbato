import { Fragment } from "react";
import styles from "./CheckBox.module.css";
import { FaCheckSquare } from "react-icons/fa";

const CheckBox = (props) => {
  const { className, type, styles: style, children, ...rest } = props;
  return (
    <Fragment>
      <label
        style={style}
        htmlFor={props.id || "checkbox-component"}
        className={`${props.className} ${styles.checkbox}`}
      >
        <input
          {...rest}
          className={styles.input}
          type="checkbox"
          id={props.id || "checkbox-component"}
          name={props.name}
          hidden
        />
        <span className={styles.icon}>
          <FaCheckSquare className={styles.tickBox} />
        </span>
        <span>{children}</span>
      </label>
    </Fragment>
  );
};

export default CheckBox;
