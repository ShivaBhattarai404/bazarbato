"use client";

// core react and nextjs imports
import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// styles - CSS modules
import styles from "./MenuNav.module.css";

// react icons
import { FaFacebook, FaInstagram, FaTimes, FaTwitter } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";

// extra
import profile from "@/public/images/user.png";
import { useSelector } from "react-redux";

const DUMMY_DATA = [
  {
    name: "Men's",
    items: ["Tshirt", "Cloths", "Jacket"],
  },
  {
    name: "Sports",
    items: ["Football", "Basketball", "Tennis"],
  },
  {
    name: "Electronics",
    items: ["Mobile", "Laptop", "Tablet"],
  },
  {
    name: "Services",
    items: ["Cleaning", "Plumbing", "Electrical"],
  },
];

export default function MenuNav({ close, navParentCategories }) {
  const [active, setActive] = useState(null);
  const user = useSelector((state) => state.user.user);

  const checkActive = (categoryId) => {
    return active === categoryId;
  };
  return (
    <Fragment>
      <div className={styles.menuTop}>
        <h1>Menu</h1>
        <button className={styles.close} onClick={close}>
          <FaTimes size={20} />
        </button>
      </div>
      <div className={styles.userProfile}>
        <Link href={user ? "/me" : "/login"}>
          <Image
            className={styles.userProfilePic}
            src={(user && user.avatar) || profile}
            alt="user"
            width={50}
            height={50}
          />
          <h3 className={styles.username}>
            {user ? `Hello ${user.firstName}` : "Log in"}
          </h3>
        </Link>
      </div>
      <div className={styles.menuItems}>
        {navParentCategories?.map((category) => (
          <ul key={category._id} className={styles.menuItem}>
            <li>
              <div
                className={styles.menuTitle}
                onClick={() =>
                  setActive(checkActive(category._id) ? null : category._id)
                }
              >
                <h3>{category.name}</h3>
                <button className={styles.menuButton}>
                  {checkActive(category._id) ? (
                    <FaMinus size={15} />
                  ) : (
                    <FaPlus size={15} />
                  )}
                </button>
              </div>
              <ul
                className={[
                  styles.menuList,
                  checkActive(category._id) ? styles.active : "",
                ].join(" ")}
              >
                {category.subCategories?.map((subCategory) => (
                  <li className={styles.listItem} key={subCategory._id}>
                    <Link href={`/search?category=${subCategory.code}`}>
                      {subCategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        ))}
      </div>

      <ul className={styles.menuBottom}>
        <li>
          <FaFacebook size={20} />
        </li>
        <li>
          <FaTwitter size={20} />
        </li>
        <li>
          <FaInstagram size={20} />
        </li>
      </ul>
    </Fragment>
  );
}
