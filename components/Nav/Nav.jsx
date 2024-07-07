import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav_menu}>
        <ul className={styles.links}>
          <li className={styles.link}>
            <Link href="#">Home</Link>
          </li>
          <li className={styles.link}>
            <Link href="#">Categories</Link>
          </li>
          <li className={styles.link}>
            <Link href="#">Frames</Link>
          </li>
          <li className={styles.link}>
            <Link href="#">Prints</Link>
          </li>
          <li className={styles.link}>
            <Link href="#">Photo Services</Link>
          </li>
          <li className={styles.link}>
            <Link href="#">Video Services</Link>
          </li>
          <li className={styles.link}>
            <Link href="#">Gift Items</Link>
          </li>
          <li className={styles.link}>
            <Link href="#">Accessories</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
