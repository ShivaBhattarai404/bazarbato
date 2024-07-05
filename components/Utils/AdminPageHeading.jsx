"use client";

import { FaArrowLeft } from "react-icons/fa6";

import styles from "./AdminPageHeading.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminPageHeading = (props) => {
  const router = useRouter();

  let backBtn = (
    <Link href={String(props.back)}>
      <FaArrowLeft className={styles.backIcon} />
    </Link>
  );

  if (String(props.back) === "true") {
    backBtn = <FaArrowLeft className={styles.backIcon} onClick={router.back} />;
  }
  return (
    <div className={`${styles.title} ${props.className}`}>
      {props.back && backBtn}
      <h1>{props.children}</h1>
    </div>
  );
};

export default AdminPageHeading;
