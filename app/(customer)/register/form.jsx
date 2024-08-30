"use client";
import Link from "next/link";

import styles from "../login/page.module.css";
import formStyles from "@/public/styles/form.module.css";

export default function RegisterForm({ handleSubmit }) {
  return (
    <form className={styles.form} action={handleSubmit}>
      <h1>Register</h1>
      <label className={styles.label} htmlFor="customer-register-name">
        Full name
      </label>
      <input
        className={formStyles.input}
        id="customer-register-name"
        name="name"
      />
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
