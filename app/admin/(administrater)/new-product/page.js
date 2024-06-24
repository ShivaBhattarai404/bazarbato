import styles from "./page.module.css";
import { FaArrowLeft } from "react-icons/fa6";

export const metadata = {
  title: "Create a new product",
};

export default function Dashboard() { 
  return (
    <section className={styles.dashboard}>
      <div className={styles.title}>
        <FaArrowLeft className={styles.backIcon} />
        <h1>Create A New Product</h1>
      </div>
      <div className={styles.wrapper}>
        <area className={styles.general}></area>
        <area className={styles.media}></area>
        <area className={styles.searchEngineOptimization}></area>
        <area className={styles.footer}></area> 
        <area className={styles.productDetails}></area>
        <area className={styles.variants}></area>
        <area className={styles.attributes}></area>
      </div>
    </section>
  );
}
