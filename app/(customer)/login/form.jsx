"use client";
// core react and nextjs modules
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// react icons
import { ImSpinner9 } from "react-icons/im";

import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/reducers/user";

export default function LoginForm({ login }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      setLoading(true);
      const response = await login(formData);
      if (response.login) {
        setError("");
        dispatch(setUser(response.user));
        router.push("/");
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
      <h1>Login</h1>
      <div className={[styles.error, styles.active].join(" ")}> {error}</div>
      <label className={styles.label} htmlFor="customer-login-email">
        Email address
      </label>
      <input
        className={formStyles.input}
        id="customer-login-email"
        type="email"
        name="email"
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
        name="password"
      />

      <button className={styles.submitButton} disabled={loading}>
        {loading && (
          <span className={styles.loader}>
            <ImSpinner9 />
          </span>
        )}
        <span>Login</span>
      </button>

      <div className={styles.signUp}>
        <p>Don&apos;t have an account?</p>
        <Link href="/register">Create an account</Link>
      </div>
    </form>
  );
}
