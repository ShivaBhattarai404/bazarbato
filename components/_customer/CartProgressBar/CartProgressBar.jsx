import styles from "./CartProgressBar.module.css";

export default function CartProgressBar({
  steps,
  active,
  className = "",
  labelPosition,
  ...rest
}) {
  active = active < 0 ? 0 : active - 1;
  const position = labelPosition === "bottom" ? styles.bottom : "";

  return (
    <ol className={[className, styles.progressBar].join(" ")} {...rest}>
      {steps &&
        steps.map((step, index) => {
          let status = styles.todo;
          if (active > index) {
            status = styles.done;
          } else if (active === index) {
            status = styles.active;
          }
          return (
            <li key={index} className={[position, status].join(" ")}>
              {step}
            </li>
          );
        })}
    </ol>
  );
}
