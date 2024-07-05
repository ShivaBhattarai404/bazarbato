"use client";
import { FaChevronDown } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import styles from "./MultiSelect.module.css";
import { useState } from "react";

export default function MultiSelect(props) {
  const [dropDownVisisbility, setDropDownVisisbility] = useState(false);
  const [capsules, setCapsules] = useState([]);
  const [options, setOptions] = useState([]);

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="multiselect-input">
        {props.label}
      </label>
      {new Array(5).fill("").map((_, i) => (
        <button className={styles.capsule} type="button" key={i}>
          <span>capsule</span>
          <FaTimes />
        </button>
      ))}
      <div className={styles.wrapper}>
        <input
          id="multiselect-input"
          placeholder="Select..."
          onFocus={() => setDropDownVisisbility(true)}
          onBlur={() => setDropDownVisisbility(false)}
        />
        <label htmlFor="multiselect-input" className={styles.icon}>
          <FaChevronDown />
        </label>
        {dropDownVisisbility && (
          <ul className={styles.options}>
            {new Array(60).fill("").map((option, i) => (
              <li key={i} className={styles.option}>
                category {i}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
