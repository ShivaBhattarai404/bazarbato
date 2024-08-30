import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

// react icons
import { FaEdit } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";
import {
  IoBagHandle,
  IoCheckmarkDoneSharp,
  IoHeartSharp,
} from "react-icons/io5";

// components
import Path from "@/components/_customer/Path/Path";
import RadioButton from "@/components/RadioButton/RadioButton";

// styles sheets
import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";

import userImage from "@/public/images/testimonial-1.jpg";

export default function ProfilePage({ searchParams: { editing } }) {
  const editingMode = editing === "true";
  return (
    <Fragment>
      <Path
        paths={[
          { name: "Home", url: "/" },
          { name: "Profile", url: "/profile" },
        ]}
      />
      <section className={styles.links}>
        <div className={styles.header}>
          <h1 className={styles.title}>Links</h1>
          <Link href="/orders" className={styles.link}>
            <FaLayerGroup />
            My orders
          </Link>
          <Link href="/wishlist" className={styles.link}>
            <IoHeartSharp />
            Wishlist
          </Link>
          <Link href="/bag" className={styles.link}>
            <IoBagHandle />
            My bag
          </Link>
        </div>
      </section>

      <section className={styles.personalInfo}>
        <div className={styles.header}>
          <h2 className={styles.title}>Personal Information</h2>
          <Link href="/me?editing=true" className={styles.edit}>
            <FaEdit />
            Edit profile
          </Link>
        </div>
        <form className={styles.form}>
          <Fragment>
            <div className={styles.userProfile}>
              <Image
                src={userImage}
                alt="user profile"
                width={200}
                height={200}
              />
              <label htmlFor="profile" className={styles.edit}>
                <FaEdit />
              </label>
              <input type="file" id="profile" hidden />
            </div>
            <label htmlFor="name">Name</label>
            <input
              className={formStyles.input}
              type="text"
              id="name"
              disabled={!editingMode}
              defaultValue="Sapana Bhandari"
            />
          </Fragment>
          <Fragment>
            <label htmlFor="phone">
              Phone number{" "}
              <span className={styles.verified}>
                (<IoCheckmarkDoneSharp />
                verified)
              </span>
            </label>
            <input
              className={formStyles.input}
              type="text"
              id="phone"
              disabled={!editingMode}
              defaultValue="9841234567"
            />
          </Fragment>
          <Fragment>
            <label htmlFor="email">
              Email{" "}
              <span className={styles.verified}>
                (<IoCheckmarkDoneSharp />
                verified)
              </span>
            </label>
            <input
              className={formStyles.input}
              type="text"
              id="email"
              disabled={!editingMode}
              defaultValue="sapanabhandari@gmail.com"
            />
          </Fragment>
          <Fragment>
            <label className={styles.genderLabel}>gender</label>
            <RadioButton className={styles.gender} name="gender">
              Male
            </RadioButton>
            <RadioButton className={styles.gender} name="gender">
              Female
            </RadioButton>
            <RadioButton className={styles.gender} name="gender">
              Other
            </RadioButton>
          </Fragment>
        </form>
      </section>
    </Fragment>
  );
}
