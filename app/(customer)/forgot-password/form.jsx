"use client";

import styles from "../login/page.module.css";
import formStyles from "@/public/styles/form.module.css";

export default function PasswordResetForm({ handleSubmit }) {
  return (
    <form className={styles.form} action={handleSubmit}>
      <h1>Reset Password</h1>
      <label className={styles.label} htmlFor="customer-reset-email">
        Enter your registered email address
      </label>
      <input
        className={formStyles.input}
        id="customer-reset-email"
        type="email"
        name="email"
      />
      <button>Continue</button>
    </form>
  );
}
