"use client";

import Link from "next/link";
import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";

export default function LoginForm({ handleSubmit }) {
  return (
    <form className={styles.form} action={handleSubmit}>
      <h1>Login</h1>
      <label className={styles.label} htmlFor="customer-login-email">
        Email address
      </label>
      <input
        className={formStyles.input}
        id="customer-login-email"
        type="email"
      />
      <label className={styles.label} htmlFor="customer-login-password">
        Password
        <Link className={styles.passwordRestLink} href="/forgot-password">
          Forgot password?
        </Link>
      </label>
      <input
        className={formStyles.input}
        id="customer-login-password"
        type="password"
      />

      <button>Login</button>

      <div className={styles.signUp}>
        <p>Don&apos;t have an account?</p>
        <Link href="/register">Create an account</Link>
      </div>
    </form>
  );
}
