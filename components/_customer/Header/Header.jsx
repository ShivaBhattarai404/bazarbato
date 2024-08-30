import Image from "next/image";
import Link from "next/link";

import {
  IoPersonOutline,
  IoHeartOutline,
  IoBagHandleOutline,
  IoSearchOutline,
} from "react-icons/io5";

import logo from "@/public/images/logo/logo.png";
import logoIcon from "@/public/images/icon.png";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          className={styles.logo}
          src={logo}
          alt="Premps"
          width={150}
          height={50}
        />
        <Image
          className={styles.logoIcon}
          src={logoIcon}
          alt="Premps"
          width={45}
        />
      </Link>
      <form className={styles.search_container}>
        <input
          type="text"
          placeholder="Enter your product name..."
          className={styles.search}
        />
        <button className={styles.search_btn}>
          <IoSearchOutline />
        </button>
      </form>

      <div className={styles.icons}>
        <Link href="/login">
          <IoPersonOutline className={styles.icon} />
        </Link>
        <Link href="wishlist">
          <span className={styles.cart_count}>0</span>
          <IoHeartOutline className={styles.icon} />
        </Link>
        <Link href="/bag">
          <span className={styles.cart_count}>0</span>
          <IoBagHandleOutline className={styles.icon} />
        </Link>
      </div>
    </header>
  );
}
