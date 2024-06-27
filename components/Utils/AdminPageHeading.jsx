import { FaArrowLeft } from "react-icons/fa6";

import styles from "./AdminPageHeading.module.css";

const AdminPageHeading = (props) => {
  return (
    <div className={`${styles.title} ${props.className}`}>
      {props.back && <FaArrowLeft className={styles.backIcon} />}
      <h1>{props.children}</h1>
    </div>
  );
};

export default AdminPageHeading;
