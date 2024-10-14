"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notFound, useRouter } from "next/navigation";

// react icons
import { FaEdit } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

// components
import RadioButton from "@/components/RadioButton/RadioButton";

// styles sheets
import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";
import Modal from "@/components/_admin/Modal/Modal";
import { setError } from "@/app/reducers/utils";
import { removeUser } from "@/app/reducers/user";

export default function UserDetails({ logout }) {
  const editingMode = false;
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const response = await logout();
      if (response.error) {
        dispatch(setError(response.error));
      } else {
        dispatch(removeUser());
        router.replace("/");
      }
    } catch (error) {
      dispatch(setError(response.error));
    } finally {
      setIsLogoutModalOpen(false);
    }
  };

  if (!user) {
    router.replace("/");
    return <></>;
  }

  return (
    <section className={styles.personalInfo}>
      {isLogoutModalOpen && (
        <Modal
          title="Do you want to logout?"
          paragraph="Are you sure you want to logout?"
          btn1Text="Yes"
          bgColor1="red"
          color1="white"
          btn2Text="No"
          bgColor2="green"
          color2="white"
          onCancel={() => setIsLogoutModalOpen(false)}
          onOk={logoutHandler}
        />
      )}
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
              src={user?.avatar}
              alt="user profile"
              width={200}
              height={200}
            />
            <label htmlFor="profile" className={styles.edit}>
              <FaEdit />
            </label>
            <input type="file" id="profile" hidden />
          </div>
          <label htmlFor="first_name">First Name</label>
          <input
            className={formStyles.input}
            type="text"
            id="first_name"
            disabled={!editingMode}
            defaultValue={user?.firstName}
          />
          <label htmlFor="last_name">Name</label>
          <input
            className={formStyles.input}
            type="text"
            id="last_name"
            disabled={!editingMode}
            defaultValue={user?.lastName}
          />
        </Fragment>
        <Fragment>
          <label htmlFor="phone">Phone number</label>
          <input
            className={formStyles.input}
            type="text"
            id="phone"
            disabled={!editingMode}
            defaultValue={user?.phone}
          />
        </Fragment>
        <Fragment>
          <label htmlFor="email">
            Email{" "}
            {user?.verified && (
              <span className={styles.verified}>
                (<IoCheckmarkDoneSharp />
                verified)
              </span>
            )}
          </label>
          <input
            className={formStyles.input}
            type="text"
            id="email"
            disabled={!editingMode}
            defaultValue={user?.email}
          />
        </Fragment>
        <Fragment>
          <label className={styles.genderLabel}>
            gender<label className={formStyles.label}>{user?.gender}</label>
          </label>

          {/* <RadioButton className={styles.gender} name="gender">
            Male
          </RadioButton>
          <RadioButton className={styles.gender} name="gender">
            Female
          </RadioButton>
          <RadioButton className={styles.gender} name="gender">
            Other
          </RadioButton> */}
        </Fragment>
      </form>
      <button
        className={styles.logout}
        onClick={() => setIsLogoutModalOpen(true)}
      >
        Logout
      </button>
    </section>
  );
}
