"use client";
import { Fragment, useEffect, useState } from "react";

import { FaChevronDown } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

import styles from "./MultiSelect.module.css";

const filterCapsules = (capsules = [], options = []) => {
  const returnedArray = capsules
    .map((capsule) => {
      return options.find((option) => option.code === capsule.code);
    })
    .filter((capsule) => capsule);

  console.log(options);
  return returnedArray;
};

// MultiSelect component
export default function MultiSelect({
  label,
  className,
  CapsuleComponent,
  OptionComponent,
  capsules = [],
  options: optionFromProps,
  name,
  ...rest
}) {
  const [dropDownVisisbility, setDropDownVisisbility] = useState(false);
  const [currentCapsules, setCurrentCapsules] = useState(
    filterCapsules(capsules, optionFromProps) || []
  );
  const [options, setOptions] = useState(optionFromProps || []);
  const [currentOptions, setCurrentOptions] = useState(optionFromProps || []);

  useEffect(() => {
    const formattedCapusles = capsules
      .map((capsule) => {
        return options.find((option) => option.code === capsule);
      })
      .filter((capsule) => capsule);
    setCurrentCapsules(formattedCapusles);

    const formattedOptions = options.filter(
      (option) => !capsules.includes(option.code)
    );
    setCurrentOptions(formattedOptions);
  }, [options, capsules]);

  // function to search through options
  const searchOptions = (key, options) => {
    return options.filter((option) =>
      option.name.toLowerCase().includes(key.toLowerCase())
    );
  };

  // function to handle input change
  // this function will execute when user starts to type something in the input field
  const inputChangeHandler = (e) => {
    const value = e.target.value;
    setCurrentOptions(searchOptions(value, options));
  };

  // this function will execute when user clicks on an option
  const optionClickHandler = (option) => {
    setCurrentCapsules((prevCapsules) => [...prevCapsules, option]);
    setOptions((prevOptions) => [
      ...prevOptions.filter((prevOption) => prevOption.code !== option.code),
    ]);
  };

  // this function will execute when user clicks on a capsule
  const removeCapsule = (capsule) => {
    setCurrentCapsules((prevCapsules) =>
      prevCapsules.filter((prevCapsule) => prevCapsule.code !== capsule.code)
    );
    setOptions((prevOptions) => [...prevOptions, capsule]);
  };

  return (
    <div className={[styles.container, className].join(" ")} {...rest}>
      {label && (
        <label className={styles.label} htmlFor="multiselect-input">
          {label}
        </label>
      )}
      {CapsuleComponent ? (
        <CapsuleComponent
          capsules={currentCapsules}
          removeCapsule={removeCapsule}
        />
      ) : (
        currentCapsules.map((capsule, i) => (
          <Fragment key={i}>
            <input name={name || "capsules"} value={capsule.code} hidden />
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
            {currentOptions.map?.((option, i) => (
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
