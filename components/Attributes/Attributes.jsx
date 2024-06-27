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
            name="size"
          >
            <option value="s">S</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
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
            name="color"
          >
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="orange">Orange</option>
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
            name="weight"
          >
            <option value="120">120</option>
            <option value="125">125</option>
            <option value="130">130</option>
            <option value="140">140</option>
          </select>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Attributes;
