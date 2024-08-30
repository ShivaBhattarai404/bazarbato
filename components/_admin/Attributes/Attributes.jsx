"use client";

import { Fragment, useEffect, useState } from "react";
import formStyles from "@/public/styles/form.module.css";
import styles from "./Attributes.module.css";

// default set
const DEFAULT_SET = {
  name: "none",
  type: "none",
  attributes: [],
};

const Attributes = ({ attributeSet, defaultSet, attributes }) => {
  // function to get attributes of a set
  function getAttributesOfSet(setName) {
    const set = attributeSet.find((item) => item.name === setName);
    return set ? set : DEFAULT_SET;
  }

  // state to store current set
  const [currentSet, setCurrentSet] = useState(DEFAULT_SET);

  // set current set on initial render and value of each attribute
  useEffect(() => {
    const set = getAttributesOfSet(defaultSet);
    if (attributes && attributes.length) {
      set.attributes.forEach((attribute) => {
        const { code } = attribute;
        const attr = attributes.find((attr) => attr.code === code);
        if (attr) {
          attribute.value = attr.value;
        }
      });
    }
    setCurrentSet(set);
  }, [attributes, defaultSet]);

  // function to handle select change
  const selectChangeHandler = (e) => {
    const selectedSet = getAttributesOfSet(e.target.value);
    setCurrentSet(selectedSet);
  };
  return (
    <Fragment>
      <label htmlFor="new-product-attribute-set" className={formStyles.label}>
        Select Attribute Set
      </label>
      <select
        id="new-product-attribute-set"
        className={formStyles.select}
        name="attribute_set"
        value={currentSet.name}
        onChange={selectChangeHandler}
      >
        <option value="none">None</option>
        {attributeSet.map((attributeSet) => (
          <option key={attributeSet.name} value={attributeSet.name}>
            {attributeSet.name}
          </option>
        ))}
      </select>

      <hr />
      <label htmlFor="new-product-attribute" className={formStyles.label}>
        Attributes
      </label>

      {currentSet.attributes.map((attribute) => (
        <div key={attribute.code} className={styles.attribute}>
          <label htmlFor={attribute.code} className={formStyles.label}>
            {attribute.name}
          </label>
          {attribute.type.toLowerCase() === "select" ? (
            <select
              className={formStyles.select}
              name={attribute.name}
              id={attribute.code}
              defaultValue={attribute.value || ""}
            >
              {attribute.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              id={attribute.code}
              name={attribute.name}
              className={formStyles.input}
              defaultValue={attribute.value || ""}
            />
          )}
        </div>
      ))}
    </Fragment>
  );
};

export default Attributes;
