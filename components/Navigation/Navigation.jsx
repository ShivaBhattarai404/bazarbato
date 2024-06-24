"use client";

import Image from "next/image";

import { IoMdHome, IoIosGift, IoMdSettings } from "react-icons/io";
import { FaArchive } from "react-icons/fa";
import { LuLink } from "react-icons/lu";
import { RiBox3Fill } from "react-icons/ri";
import { IoPeopleSharp } from "react-icons/io5";

import styles from "./Navigation.module.css";
import logo from "@/public/images/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = ({ children }) => {
  const pathname = usePathname();

  const checkActive = (path) => {
    return pathname === `/admin${path}` ? styles.active : "";
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Image src={logo} alt="logo" width={120} height={35} />
        <div className={styles.profilePic}>D</div>
      </header>
      <nav className={styles.nav}>
        <div className={styles.links}>
          <span>Quick Links</span>
          <ul>
            <li className={checkActive("/dashboard")}>
              <Link href="dashboard">
                <IoMdHome />
                Dashboard
              </Link>
            </li>
            <li className={checkActive("/new-product")}>
              <Link href="new-product">
                <FaArchive />
                New Product
              </Link>
            </li>
            <li className={checkActive("/new-coupon")}>
              <Link href="new-coupon">
                <IoIosGift />
                New Coupon
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.links}>
          <span>Catalog</span>
          <ul>
          <li className={checkActive("/products")}>
              <Link href="products">
                <FaArchive />
                Products
              </Link>
            </li>
            <li className={checkActive("/categories")}>
              <Link href="categories">
                <LuLink />
                Categories
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.links}>
          <span>Sale</span>
          <ul>
          <li className={checkActive("/orders")}>
              <Link href="orders">
                <RiBox3Fill />
                Orders
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.links}>
          <span>Customer</span>
          <ul>
          <li className={checkActive("/customers")}>
              <Link href="customers">
                <IoPeopleSharp />
                Customers
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.links}>
          <span>Promotion</span>
          <ul>
          <li className={checkActive("/coupons")}>
              <Link href="coupons">
                <IoIosGift />
                Coupons
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.links}>
          <span>Site</span>
          <ul>
          <li className={checkActive("/setting")}>
              <Link href="setting">
                <IoMdSettings />
                Setting
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default Navigation;
