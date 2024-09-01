"use client";
import { Fragment, useEffect, useState } from "react";

import { FaChevronDown } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

import styles from "./MultiSelect.module.css";

export default function MultiSelect({
  label,
  className,
  CapsuleComponent,
  capsules: propsCapsules,
  options: optionFromProps,
  name,
  ...rest
}) {
  const [dropDownVisisbility, setDropDownVisisbility] = useState(false);
  const [capsules, setCapsules] = useState(propsCapsules || []);
  const [propsOptions, setPropsOptions] = useState(optionFromProps || []);
  const [options, setOptions] = useState(optionFromProps || []);

  useEffect(() => {
    setOptions(propsOptions);
  }, [propsOptions]);

  // function to search through options
  const searchOption = (key, options) => {
    return options.filter((option) =>
      option.name.toLowerCase().includes(key.toLowerCase())
    );
  };

  // function to handle input change
  // this function will execute when user starts to type something in the input field
  const inputChangeHandler = (e) => {
    const value = e.target.value;
    setOptions(searchOption(value, propsOptions));
  };

  // this function will execute when user clicks on an option
  const optionClickHandler = (option) => {
    setCapsules((prevCapsules) => [...prevCapsules, option]);
    setPropsOptions((prevOptions) => [
      ...prevOptions.filter((prevOption) => prevOption.code !== option.code),
    ]);
  };

  // this function will execute when user clicks on a capsule
  const removeCapsule = (capsule) => {
    setCapsules((prevCapsules) =>
      prevCapsules.filter((prevCapsule) => prevCapsule.code !== capsule.code)
    );
    setPropsOptions((prevOptions) => [...prevOptions, capsule]);
  };

  return (
    <div className={[styles.container, className].join(" ")} {...rest}>
      {label && (
        <label className={styles.label} htmlFor="multiselect-input">
          {label}
        </label>
      )}
      {CapsuleComponent ? (
        <CapsuleComponent capsules={capsules} removeCapsule={removeCapsule} />
      ) : (
        capsules.map((capsule, i) => (
          <Fragment key={i}>
            <input
              type="hidden"
              name={name || "capsules"}
              value={capsule._id}
            />
            <button
              className={styles.capsule}
              type="button"
              onClick={() => removeCapsule(capsule)}
            >
              <span>{capsule.name}</span>
              <FaTimes />
            </button>
          </Fragment>
        ))
      )}
      <div className={styles.wrapper}>
        <input
          id="multiselect-input"
          placeholder="Select..."
          onChange={inputChangeHandler}
          onFocus={() => setDropDownVisisbility(true)}
        />
        <label
          className={styles.icon}
          htmlFor={dropDownVisisbility ? "multiselect-input" : ""}
          onClick={() => setDropDownVisisbility((i) => !i)}
        >
          {dropDownVisisbility ? (
            <FaTimes size={15} />
          ) : (
            <FaChevronDown size={15} />
          )}
        </label>
        {dropDownVisisbility && (
          <ul className={styles.options}>
            {options &&
              options.length > 0 &&
              options.map((option, i) => (
                <li
                  key={i}
                  className={styles.option}
                  onClick={optionClickHandler.bind(null, option)}
                >
                  {option.name}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
