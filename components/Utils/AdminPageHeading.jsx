import { FaArrowLeft } from "react-icons/fa6";

import styles from "./AdminPageHeading.module.css";
import Link from "next/link";

const AdminPageHeading = (props) => {
  return (
    <div className={`${styles.title} ${props.className}`}>
      {props.back && (
        <Link href={String(props.back)}>
          <FaArrowLeft className={styles.backIcon} />
        </Link>
      )}
      <h1>{props.children}</h1>
    </div>
  );
};

export default AdminPageHeading;
