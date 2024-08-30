import styles from "./RadioButton.module.css";

const RadioButton = (props) => {
  const { children, ...rest } = props;

  return (
    <label className={`${props.className} ${styles.label}`}>
      <input
        type="radio"
        {...rest}
        className={styles.input}
        hidden
        style={{ display: "none" }}
      />
      <span className={styles.checkbox} />
      <span className={`${props.labelclassname} ${styles.text}`}>
        {children}
      </span>
    </label>
  );
};

export default RadioButton;
