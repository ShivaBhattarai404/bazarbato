"use client";
import Link from "next/link";

import styles from "../login/page.module.css";
import formStyles from "@/public/styles/form.module.css";
import RadioButton from "@/components/RadioButton/RadioButton";
import { Fragment, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { resetError, setError } from "@/app/reducers/utils";
import { EMAIL_REGEX } from "@/Constants/validation";
import InputError from "@/components/InputError/InputError";
import { ImSpinner9 } from "react-icons/im";

const formErrors = {
  firstName: { message: "First name is required", touched: false },
  lastName: { message: "Last name is required", touched: false },
  phone: { message: "Enter a valid phone number", touched: false },
  email: { message: "Enter a valid email", touched: false },
  password: {
    message: "Password must be at least 6 characters long",
    touched: false,
    value: "",
  },
  repeatPassword: {
    message: "Password does not match",
    touched: false,
  },
};

const formReducer = (state, action) => {
  let error = { message: "", touched: true };
  const payload = action?.payload;
  switch (action.type) {
    case "CHECK_FIRST_NAME":
      error.message = payload ? "" : formErrors.firstName.message;
      return {
        ...state,
        firstName: error,
      };
    case "CHECK_LAST_NAME":
      error.message = payload ? "" : formErrors.lastName.message;
      return {
        ...state,
        lastName: error,
      };
    case "CHECK_PHONE_NUMBER":
      error.message =
        isNaN(+payload) || payload?.length !== 10
          ? formErrors.phone.message
          : "";
      return {
        ...state,
        phone: error,
      };
    case "CHECK_EMAIL":
      error.message = !payload.match(EMAIL_REGEX)
        ? formErrors.email.message
        : "";
      return {
        ...state,
        email: error,
      };
    case "CHECK_PASSWORD":
      error.message = payload?.length < 6 ? formErrors.password.message : "";
      return {
        ...state,
        password: { ...error, value: payload },
      };
    case "CHECK_REPEAT_PASSWORD":
      error.message =
        payload !== state.password.value
          ? formErrors.repeatPassword.message
          : "";
      return {
        ...state,
        repeatPassword: error,
      };
    case "RESET_ERROR":
      return initialFormErrorState;
    case "SET_ERROR":
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default function RegisterForm({ handleSubmit }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errors, errorDispatch] = useReducer(formReducer, formErrors);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch(resetError());

    const formIsValid = Object.values(errors).every(
      (error) => error.message === ""
    );
    if (formIsValid) {
      const form = event.target;
      const formData = new FormData(form);

      try {
        setLoading(true);
        const response = await handleSubmit(formData);
        if (response?.error) {
          console.log(response.error);
          return dispatch(setError(response.error));
        }
      } catch (error) {
        dispatch(setError("Something went wrong"));
      } finally {
        setLoading(false);
      }
    } else {
      for (const key in errors) {
        errors[key].touched = true;
      }
      errorDispatch({ type: "SET_ERROR", payload: errors });
    }
  };

  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <h1>Register</h1>
      <label className={styles.label} htmlFor="first_name">
        First Name
      </label>
      <InputError errors={errors} name="firstName" />
      <input
        className={formStyles.input}
        id="first_name"
        name="firstName"
        onChange={(e) => {
          errorDispatch({ type: "CHECK_FIRST_NAME", payload: e.target.value });
        }}
      />
      <label className={styles.label} htmlFor="customer-register-name">
        Last name
      </label>
      <InputError errors={errors} name="lastName" />
      <input
        className={formStyles.input}
        id="customer-register-name"
        name="lastName"
        onChange={(e) => {
          errorDispatch({ type: "CHECK_LAST_NAME", payload: e.target.value });
        }}
      />
      <Fragment key="gender">
        <label className={styles.label}>Gender</label>
        <RadioButton className={styles.gender} name="gender" value="male">
          Male
        </RadioButton>
        <RadioButton
          defaultChecked
          className={styles.gender}
          name="gender"
          value="female"
        >
          Female
        </RadioButton>
        <RadioButton className={styles.gender} name="gender" value="others">
          Others
        </RadioButton>
      </Fragment>
      <label className={styles.label} htmlFor="customer-register-phone">
        Phone number
      </label>
      <InputError errors={errors} name="phone" />
      <input
        className={formStyles.input}
        id="customer-register-phone"
        name="phone"
        onChange={(e) => {
          errorDispatch({
            type: "CHECK_PHONE_NUMBER",
            payload: e.target.value,
          });
        }}
      />
      <label className={styles.label} htmlFor="customer-register-email">
        Email address
      </label>
      <InputError errors={errors} name="email" />
      <input
        className={formStyles.input}
        id="customer-register-email"
        type="email"
        name="email"
        onChange={(e) => {
          errorDispatch({ type: "CHECK_EMAIL", payload: e.target.value });
        }}
      />
      <label
        className={styles.label}
        htmlFor="customer-register-password"
        name="password"
      >
        Password
      </label>
      <InputError errors={errors} name="password" />
      <input
        className={formStyles.input}
        id="customer-register-password"
        type="password"
        name="password"
        onChange={(e) => {
          errorDispatch({ type: "CHECK_PASSWORD", payload: e.target.value });
        }}
      />
      <label
        className={styles.label}
        htmlFor="customer-register-repeat-password"
      >
        Repeat Password
      </label>
      <InputError errors={errors} name="repeatPassword" />
      <input
        className={formStyles.input}
        id="customer-register-repeat-password"
        type="password"
        name="repeatPassword"
        onChange={(e) => {
          errorDispatch({
            type: "CHECK_REPEAT_PASSWORD",
            payload: e.target.value,
          });
        }}
      />
      <button className={styles.submitButton} disabled={loading}>
        {loading && (
          <span className={styles.loader}>
            <ImSpinner9 />
          </span>
        )}
        <span>Create Account</span>
      </button>

      <div className={styles.signUp}>
        <p>Already have an account?</p>
        <Link href="/login">Login</Link>
      </div>
    </form>
  );
}
