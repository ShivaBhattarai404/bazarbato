import Link from "next/link";
import styles from "./Footer.module.css";

import { FaRegCopyright } from "react-icons/fa";

const DUMMY_LINKS = ["Fashion", "Footwear", "Wedding", "Photo soot"];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.category}>
        <h2 className={styles.category_title}>Brand Directory</h2>
        {DUMMY_LINKS.map((link) => (
          <div key={link} className={styles.category_box}>
            <h3 className={styles.category_box_title}>{link} :</h3>
            {new Array(Math.ceil(Math.random() * 20))
              .fill("")
              .map((_, index) => (
                <Link key={index} href="#">
                  T-shirt
                </Link>
              ))}
          </div>
        ))}
      </div>

      <div className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.list_item}><h2>Popular items</h2></li>
          <li className={styles.list_item}><Link href="#">Fashion</Link></li>
          <li className={styles.list_item}><Link href="#">Electronic</Link></li>
          <li className={styles.list_item}><Link href="#">Cosmetics</Link></li>
          <li className={styles.list_item}><Link href="#">Health</Link></li>
          <li className={styles.list_item}><Link href="#">Watches</Link></li>
          <li className={styles.list_item}><Link href="#">T-shirt</Link></li>
        </ul>
        <ul className={styles.list}>
          <li className={styles.list_item}><h2>Our services</h2></li>
          <li className={styles.list_item}><Link href="#">Fashion</Link></li>
          <li className={styles.list_item}><Link href="#">Electronic</Link></li>
          <li className={styles.list_item}><Link href="#">Cosmetics</Link></li>
          <li className={styles.list_item}><Link href="#">Health</Link></li>
          <li className={styles.list_item}><Link href="#">Watches</Link></li>
          <li className={styles.list_item}><Link href="#">T-shirt</Link></li>
        </ul>
        <ul className={styles.list}>
          <li className={styles.list_item}><h2>Popular Pages</h2></li>
          <li className={styles.list_item}><Link href="#">Fashion</Link></li>
          <li className={styles.list_item}><Link href="#">Electronic</Link></li>
          <li className={styles.list_item}><Link href="#">Cosmetics</Link></li>
          <li className={styles.list_item}><Link href="#">Health</Link></li>
          <li className={styles.list_item}><Link href="#">Watches</Link></li>
          <li className={styles.list_item}><Link href="#">T-shirt</Link></li>
        </ul>
        <ul className={styles.list}>
          <li className={styles.list_item}><h2>Contact us</h2></li>
          <li className={styles.list_item}><Link href="#">Fashion</Link></li>
          <li className={styles.list_item}><Link href="#">Electronic</Link></li>
          <li className={styles.list_item}><Link href="#">Cosmetics</Link></li>
          <li className={styles.list_item}><Link href="#">Health</Link></li>
          <li className={styles.list_item}><Link href="#">Watches</Link></li>
          <li className={styles.list_item}><Link href="#">T-shirt</Link></li>
        </ul>
      </div>
      
      <div className={styles.footer_bottom}>
        <p>Copyright <FaRegCopyright /> Premps All Rights Reserved.</p>
      </div>
    </footer>
  );
}
