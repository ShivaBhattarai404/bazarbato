"use client";

import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import styles from "./Quantity.module.css";
import { Fragment, useEffect, useState } from "react";

export default function Quantity({
  quantity = 0,
  className,
  onIncrement,
  onDecrement,
  loading = false,
  LoadingComponent = null,
  max = Infinity,
  min = 0,
  name = "quantity",
  label = "",
}) {
  const decrementHandler = async () => {
    if (quantity > min) {
      await onDecrement?.();
    }
  };

  const incrementHandler = async () => {
    if (quantity < max) {
      await onIncrement?.();
    }
  };

  return (
    <Fragment>
      {label && (
        <label className={styles.label} htmlFor={name}>
          Quantity
        </label>
      )}
      <div className={[className, styles.quantity].join(" ")}>
        <button className={styles.button} onClick={decrementHandler}>
          <FiMinusCircle />
        </button>
        <span>{loading ? <LoadingComponent /> : quantity}</span>
        <input type="hidden" name={name} value={quantity} />
        <button className={styles.button} onClick={incrementHandler}>
          <FiPlusCircle />
        </button>
      </div>
    </Fragment>
  );
}
