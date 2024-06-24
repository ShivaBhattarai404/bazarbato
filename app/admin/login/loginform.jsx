"use client";

import Image from "next/image";
import parrot from "@/public/images/parrot.png";
import styles from "./page.module.css";
import { LuLoader2 } from "react-icons/lu";
import { PiWarningCircleFill } from "react-icons/pi";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginComponent(props) {
  const INITIAL_ERROR = [];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(INITIAL_ERROR);
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(INITIAL_ERROR);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await props.login(email, password);

    if (response && !response.ok) {
      setLoading(false);
      setError(response.error);
    }
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <Image
          src={parrot}
          width="60"
          height="90"
          alt="Logo"
          className={styles.image}
        />
        {error[2] && <div className={styles.error}>{error[2]}</div>}

        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onFocus={() => setError((err) => ["", err[1], ""])}
          />
          {error[0] && (
            <div className={styles.error}>
              <PiWarningCircleFill />
              {error[0]}
            </div>
          )}
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onFocus={() => setError((err) => [err[0], "", ""])}
          />
          {error[1] && (
            <div className={styles.error}>
              <PiWarningCircleFill />
              {error[1]}
            </div>
          )}
        </label>

        <button
          type="submit"
          className={`${styles.submit} ${loading ? styles.loading : ""}`}
          disabled={loading}
        >
          {loading ? <LuLoader2 className={styles.loadingIcon} /> : "SIGN IN"}
        </button>
      </form>
    </section>
  );
}
