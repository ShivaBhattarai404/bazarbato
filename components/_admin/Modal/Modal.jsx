import Overlay from "@/components/Overlay/Overlay";
import styles from "./Modal.module.css";
import { IoClose } from "react-icons/io5";

export default function Modal(props) {
  const {
    onCancel,
    onOk,
    btn1Text,
    color1,
    color2,
    bgColor1,
    bgColor2,
    btn2Text,
    title,
    paragraph,
    ...rest
  } = props;

  return (
    <Overlay {...rest} className={styles.modal}>
      <h1>
        {title}
        <IoClose onClick={onCancel} />
      </h1>
      <p>{paragraph}</p>
      <hr />
      <button
        className={styles.ok}
        onClick={onOk}
        style={{ backgroundColor: bgColor2, color: color2}}
      >
        {btn1Text}
      </button>
      <button
        className={styles.cancel}
        onClick={onCancel}
        style={{ backgroundColor: bgColor1, color: color1}}
      >
        {btn2Text}
      </button>
    </Overlay>
  );
}
