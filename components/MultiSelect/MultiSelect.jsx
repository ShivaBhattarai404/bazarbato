"use client";
import { Fragment, useEffect, useState } from "react";

import { FaChevronDown } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

import styles from "./MultiSelect.module.css";

// function to sort the options by name
const sortOptions = (options = []) => {
  return options.sort((a, b) => a.name.localeCompare(b.name));
};

// function to filter capsules if they are present in options
const filterCapsules = (capsules = [], options = []) => {
  if (Array.isArray(capsules)) {
    return options.filter((option) => capsules.includes(option._id));
  } else if (typeof capsules === "object") {
    return capsules.filter((capsule) =>
      options.find((option) => option._id === capsule._id)
    );
  } else {
    return [];
  }
};

// function to remove items from options which are already selected(capsules)
const filterOptions = (capsules = [], options = []) => {
  const filteredOptions = options.filter(
    (option) => !capsules.find((capsule) => capsule._id === option._id)
  );
  // sort the options by name
  return sortOptions(filteredOptions);
};

// function to search through options
const searchOptions = (key, options) => {
  return options.filter((option) =>
    option.name.toLowerCase().includes(key.toLowerCase())
  );
};

// MultiSelect component
export default function MultiSelect({
  label,
  className,
  CapsuleComponent,
  OptionComponent,
  capsules: capsuleFromProps = [],
  options: optionFromProps = [],
  name,
  disabled,
  ...rest
}) {
  const [dropDownVisisbility, setDropDownVisisbility] = useState(false);
  const [capsules, setCapsules] = useState(
    filterCapsules(capsuleFromProps, optionFromProps)
  );
  const [options, setOptions] = useState(
    filterOptions(capsules, optionFromProps)
  );

  // function to handle input change
  // this function will execute when user starts to type something in the input field
  const inputChangeHandler = (e) => {
    if (disabled) return;
    const value = e.target.value;
    setOptions(searchOptions(value, filterOptions(capsules, optionFromProps)));
  };

  // this function will execute when user clicks on an option
  const optionClickHandler = (option) => {
    if (disabled) return;
    setCapsules((prevCapsules) => [...prevCapsules, option]);
    setOptions((prevOptions) =>
      sortOptions(prevOptions.filter((o) => o._id !== option._id))
    );
  };

  // this function will execute when user clicks on a capsule
  const removeCapsule = (capsule) => {
    if (disabled) return;
    setCapsules((prevCapsules) =>
      prevCapsules.filter((prevCapsule) => prevCapsule._id !== capsule._id)
    );
    setOptions((prevOptions) => sortOptions([...prevOptions, capsule]));
  };

  return (
    <div className={[styles.container, className].join(" ")} {...rest}>
      {label && (
        <label className={styles.label} htmlFor="multiselect-input">
          {label}
        </label>
      )}
      {capsules.map((capsule, i) => (
        <Fragment key={i}>
          <input name={name || "capsules"} defaultValue={capsule._id} hidden />
          {CapsuleComponent ? (
            <CapsuleComponent
              capsule={capsule}
              removeCapsule={removeCapsule.bind(null, capsule)}
            />
          ) : (
            <button
              className={styles.capsule}
              type="button"
              onClick={() => removeCapsule(capsule)}
            >
              <span>{capsule.name}</span>
              <FaTimes />
            </button>
          )}
        </Fragment>
      ))}
      <div className={styles.wrapper}>
        <input
          disabled={disabled}
          id="multiselect-input"
          placeholder="Select..."
          onChange={inputChangeHandler}
          onFocus={() => setDropDownVisisbility(true)}
        />
        <label
          className={styles.icon}
          htmlFor={dropDownVisisbility ? "multiselect-input" : ""}
          onClick={() => !disabled && setDropDownVisisbility((i) => !i)}
        >
          {dropDownVisisbility ? (
            <FaTimes size={15} />
          ) : (
            <FaChevronDown size={15} />
          )}
        </label>
        {dropDownVisisbility && (
          <ul className={styles.options}>
            {options.map?.((option, i) => (
              <li
                key={i}
                className={styles.option}
                onClick={optionClickHandler.bind(null, option)}
              >
                {OptionComponent ? (
                  <OptionComponent option={option} />
                ) : (
                  option.name
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
