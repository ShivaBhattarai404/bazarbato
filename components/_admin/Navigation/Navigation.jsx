"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { IoMdHome, IoIosGift, IoMdSettings } from "react-icons/io";
import { FaArchive, FaLayerGroup } from "react-icons/fa";
import { LuLink } from "react-icons/lu";
import { RiBox3Fill } from "react-icons/ri";
import { IoPeopleSharp } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa6";

import styles from "./Navigation.module.css";
import logo from "@/public/images/logo.png";

const Navigation = ({ children }) => {
  const pathname = usePathname();

  const checkActive = (path) => {
    return pathname === `/admin${path}` ? styles.active : "";
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link href="/admin/dashboard">
          <Image src={logo} alt="logo" width={120} height={35} />
        </Link>
        <div className={styles.profilePic}>D</div>
      </header>
      <nav className={styles.nav}>
        <div className={styles.links}>
          <span>Quick Links</span>
          <ul>
            <li className={checkActive("/dashboard")}>
              <Link href="/admin/dashboard">
                <IoMdHome />
                Dashboard
              </Link>
            </li>
            <li className={checkActive("/new-product")}>
              <Link href="/admin/new-product">
                <FaArchive />
                New Product
              </Link>
            </li>
            <li className={checkActive("/new-coupon")}>
              <Link href="/admin/new-coupon">
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
              <Link href="/admin/products">
                <FaArchive />
                Products
              </Link>
            </li>
            <li className={checkActive("/categories")}>
              <Link href="/admin/categories">
                <LuLink />
                Categories
              </Link>
            </li>
            <li className={checkActive("/attributes")}>
              <Link href="/admin/attributes">
                <FaHashtag />
                Attributes
              </Link>
            </li>
            <li className={checkActive("/attribute-set")}>
              <Link href="/admin/attribute-set">
                <FaLayerGroup />
                Attribute Set
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.links}>
          <span>Sale</span>
          <ul>
            <li className={checkActive("/orders")}>
              <Link href="/admin/orders">
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
              <Link href="/admin/customers">
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
              <Link href="/admin/coupons">
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
              <Link href="/admin/setting">
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
