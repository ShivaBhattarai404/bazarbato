"use client";

// core modules
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetError, setError } from "@/app/reducers/utils";

// constants
import { EMAIL_REGEX } from "@/Constants/validation";

// react icons
import { ImSpinner9 } from "react-icons/im";

// styles
import styles from "../login/page.module.css";
import formStyles from "@/public/styles/form.module.css";

export default function EmailForm({
  handleSubmit,
  title,
  description,
  btnText = "Continue",
  inputFor = "Email",
  inputName = "input",
  inputType = "text",
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const input = e.target[inputName].value;
    dispatch(resetError());
    if (!input) {
      dispatch(setError(`${inputFor} is required`));
      return;
    }
    try {
      setLoading(true);
      const response = await handleSubmit(String(input).toLowerCase().trim());
      if (response?.error) {
        dispatch(setError(response.error));
        return;
      }
    } catch (error) {
      dispatch(setError("Something went wrong. Reload the page and try again"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className={styles.form} onSubmit={formSubmitHandler} noValidate>
      <h1>{title}</h1>
      <label className={styles.label} htmlFor="input">
        {description}
      </label>
      <input
        className={formStyles.input}
        id="input"
        type={inputType}
        name={inputName}
      />
      <button disabled={loading}>
        {loading && (
          <span className={styles.loader}>
            <ImSpinner9 />
          </span>
        )}
        <span>{btnText}</span>
      </button>
    </form>
  );
}
