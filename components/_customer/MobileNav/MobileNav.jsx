"use client";

// core nextjs and react imports
import Link from "next/link";
import { Fragment, useState } from "react";
import { usePathname } from "next/navigation";

// styles - CSS modules
import styles from "./MobileNav.module.css";

// react icons
import {
  IoBagHandleOutline,
  IoHeartOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { GrAppsRounded } from "react-icons/gr";
import { FiMenu } from "react-icons/fi";

import Overlay from "@/components/Overlay/Overlay";
import MenuNav from "./MenuNav";
import CategorySidebar from "../ProductContainer/CatgorySidebar";

export default function MobileNav() {
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState(pathname);
  const [displayApps, setDisplayApps] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);

  const getClassnames = (path = "") =>
    `${styles.navButton} ${activeButton === path ? styles.active : ""}`;

  return (
    <Fragment>
      <Overlay
        backdropClassName={[
          styles.backdrop,
          displayMenu ? styles.active : "",
        ].join(" ")}
        className={[styles.menu, displayMenu ? styles.active : ""].join(" ")}
        onClick={() => setDisplayMenu(false)}
        center={false}
      >
        <MenuNav close={() => setDisplayMenu(false)} />
      </Overlay>

      <Overlay
        backdropClassName={[
          styles.backdrop,
          displayApps ? styles.active : "",
        ].join(" ")}
        className={[styles.apps, displayApps ? styles.active : ""].join(" ")}
        onClick={() => setDisplayApps(false)}
        center={false}
      >
        <CategorySidebar />
      </Overlay>
      <div className={styles.nav}>
        <div className={styles.navItems}>
          <button
            className={getClassnames("/menu")}
            onClick={() => {
              setDisplayMenu(true);
              setDisplayApps(false);
            }}
          >
            <FiMenu />
          </button>
          <button
            className={getClassnames("/bag")}
            onClick={() => setActiveButton("/bag")}
          >
            <Link href="/bag">
              <IoBagHandleOutline />
            </Link>
          </button>
          <button
            className={getClassnames("/")}
            onClick={() => setActiveButton("/")}
          >
            <Link href="/">
              <IoHomeOutline />
            </Link>
          </button>
          <button
            className={getClassnames("/wishlist")}
            onClick={() => setActiveButton("/wishlist")}
          >
            <Link href="/wishlist">
              <IoHeartOutline />
            </Link>
          </button>
          <button
            className={getClassnames("/apps")}
            onClick={() => {
              setDisplayApps(true);
              setDisplayMenu(false);
            }}
          >
            <GrAppsRounded />
          </button>
        </div>
      </div>
    </Fragment>
  );
}
