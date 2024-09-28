"use client";
import Link from "next/link";

import styles from "../login/page.module.css";
import formStyles from "@/public/styles/form.module.css";
import RadioButton from "@/components/RadioButton/RadioButton";
import { Fragment } from "react";

export default function RegisterForm({ handleSubmit }) {
  return (
    <form className={styles.form} action={handleSubmit}>
      <h1>Register</h1>
      <label className={styles.label} htmlFor="first_name">
        First Name
      </label>
      <input
        className={formStyles.input}
        id="first_name"
        name="firstName"
      />
      <label className={styles.label} htmlFor="customer-register-name">
        Last name
      </label>
      <input
        className={formStyles.input}
        id="customer-register-name"
        name="name"
      />
      <Fragment key="gender">
        <label className={styles.label} htmlFor="gender">
          Gender
        </label>
        <RadioButton className={styles.gender} name="gender" id="gender">
          Male
        </RadioButton>
        <RadioButton
          defaultChecked
          className={styles.gender}
          name="gender"
          id="gender"
        >
          Female
        </RadioButton>
        <RadioButton className={styles.gender} name="gender" id="gender">
          Others
        </RadioButton>
      </Fragment>
      <label className={styles.label} htmlFor="customer-register-phone">
        Phone number
      </label>
      <input
        className={formStyles.input}
        id="customer-register-phone"
        name="number"
      />
      <label className={styles.label} htmlFor="customer-register-email">
        Email address
      </label>
      <input
        className={formStyles.input}
        id="customer-register-email"
        type="email"
        name="email"
      />
      <label
        className={styles.label}
        htmlFor="customer-register-password"
        name="password"
      >
        Password
      </label>
      <input
        className={formStyles.input}
        id="customer-register-password"
        type="password"
      />
      <label
        className={styles.label}
        htmlFor="customer-register-repeat-password"
      >
        Repeat Password
      </label>
      <input
        className={formStyles.input}
        id="customer-register-repeat-password"
        type="password"
      />
      <button>Create account</button>

      <div className={styles.signUp}>
        <p>Already have an account?</p>
        <Link href="/login">Login</Link>
      </div>
    </form>
  );
}
