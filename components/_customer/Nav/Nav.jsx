import Link from "next/link";
import styles from "./Nav.module.css";
import menCategory from "@/public/images/mens-banner.jpg";
import Image from "next/image";

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
            <div className={styles.dropdownPanel}>
              {new Array(4).fill(0).map((_, index) => (
                <ul key={index} className={styles.dropdownPanelList}>
                  <li className={styles.menuTitle}>
                    <Link href="#">Electronics</Link>
                  </li>

                  {new Array(5).fill(0).map((_, index) => (
                    <li key={index} className={styles.panelListItem}>
                      <Link href="#">Desktop</Link>
                    </li>
                  ))}

                  <li className={styles.panelListItem}>
                    <Link href="#">
                      <Image
                        src={menCategory}
                        alt="headphone collection"
                        width={250}
                        height={119}
                      />
                    </Link>
                  </li>
                </ul>
              ))}
            </div>
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
            <div className={styles.dropdownPanel}>
              {new Array(4).fill(0).map((_, index) => (
                <ul key={index} className={styles.dropdownPanelList}>
                  <li className={styles.menuTitle}>
                    <Link href="#">Frames</Link>
                  </li>

                  {new Array(5).fill(0).map((_, index) => (
                    <li key={index} className={styles.panelListItem}>
                      <Link href="#">Desktop</Link>
                    </li>
                  ))}

                  <li className={styles.panelListItem}>
                    <Link href="#">
                      <Image
                        src={menCategory}
                        alt="headphone collection"
                        width={250}
                        height={119}
                      />
                    </Link>
                  </li>
                </ul>
              ))}
            </div>
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
