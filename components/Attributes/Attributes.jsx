"use client";

import { Fragment, useState } from "react";
import formStyles from "@/public/styles/form.module.css";
import styles from "./Attributes.module.css";

const Attributes = () => {
  const [attributeSet, setAttributeSet] = useState("none");

  const selectChangeHandler = (e) => {
    setAttributeSet(e.target.value);
  };
  return (
    <Fragment>
      <label htmlFor="new-product-attribute-set" className={formStyles.label}>
        Select Attribute Set
      </label>
      <select
        id="new-product-attribute-set"
        className={formStyles.select}
        name="attribute-set"
        onChange={selectChangeHandler}
      >
        <option value="none">None</option>
        <option value="sw">Size and Weight</option>
        <option value="swc">Shoes</option>
        <option value="sc">Clothes</option>
      </select>

      <hr />
      <label htmlFor="new-product-attribute" className={formStyles.label}>
        Attributes
      </label>

      {attributeSet.includes("s") && (
        <Fragment>
          <label htmlFor="new-product-size" className={formStyles.label}>
            Size
          </label>
          <select
            id="new-product-size"
            className={formStyles.select}
            name="attribute-set"
          >
            <option value="none">S</option>
            <option value="Size_and_Weight">L</option>
            <option value="Shoes">XL</option>
            <option value="clothes">XXL</option>
          </select>
        </Fragment>
      )}

      {attributeSet.includes("c") && (
        <Fragment>
          <label htmlFor="new-product-color" className={formStyles.label}>
            Color
          </label>
          <select
            id="new-product-color"
            className={formStyles.select}
            name="attribute-set"
          >
            <option value="none">Red</option>
            <option value="Size_and_Weight">Green</option>
            <option value="Shoes">Yellow</option>
            <option value="clothes">Orange</option>
          </select>
        </Fragment>
      )}

      {attributeSet.includes("w") && (
        <Fragment>
          <label htmlFor="new-product-color" className={formStyles.label}>
            Weight (in grams)
          </label>
          <select
            style={{ display: "inline-block" }}
            id="new-product-color"
            className={formStyles.select}
            name="attribute-set"
          >
            <option value="none">120</option>
            <option value="Size_and_Weight">125</option>
            <option value="Shoes">130</option>
            <option value="clothes">140</option>
          </select>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Attributes;
