"use client";

import { Fragment, useReducer } from "react";

import Card from "@/components/Card/Card";
import DND from "@/components/DND/DND";
import RadioButton from "@/components/RadioButton/RadioButton";
import Attributes from "@/components/Attributes/Attributes";

import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";

import { PiWarningCircleBold } from "react-icons/pi";

// initial errors
const INITIAL_ERRORS = {
  name: "",
  price: "",
  category: "",
  description: "",
  image: "",
  qty: "",
  "url-key": "",
  "meta-title": "",
  "meta-keywords": "",
  "meta-description": "",
};

// reducer function
function reducer(state, action) {
  const payload = action.payload;

  switch (action.type) {
    case "NAME":
      const nameError =
        payload.length < 3 ? "Name must be at least 3 characters" : "";
      return { ...state, name: nameError };
    case "PRICE":
      let priceError = isNaN(payload) ? "Price must be a number" : "";
      priceError = payload < 0 ? "Price must be a positive number" : priceError;
      return { ...state, price: priceError };
    case "CATEGORY":
      return {
        ...state,
        category:
          !payload.length || payload.toLowerCase() === "none"
            ? "Category is required"
            : "",
      };
    case "DESCRIPTION":
      return {
        ...state,
        description: payload ? "" : "Description is required",
      };
    case "IMAGE":
      return { ...state, image: payload ? "" : "Image is required" };
    case "QTY":
      let qtyError = isNaN(payload) ? "Quantity must be a number" : "";
      qtyError = payload < 0 ? "Quantity must be a positive number" : qtyError;
      return { ...state, qty: qtyError };
    case "URL-KEY":
      return {
        ...state,
        "url-key": payload ? "" : "Url key is required",
      };
    case "META-TITLE":
      return {
        ...state,
        "meta-title": payload ? "" : "Meta title is required",
      };
    case "META-KEYWORDS":
      return {
        ...state,
        "meta-keywords": payload ? "" : "Meta keywords is required",
      };
    case "META-DESCRIPTION":
      return {
        ...state,
        "meta-description": payload ? "" : "Meta description is required",
      };
    default:
      return { ...state };
  }
}

// rendering the form
export default function NewProductForm({ handleSubmit }) {
  const [errors, dispatch] = useReducer(reducer, INITIAL_ERRORS);

  return (
    <form className={styles.wrapper} action={handleSubmit} noValidate>
      <Card className={`${styles.general} ${styles.card}`}>
        <span className={styles.cardTitle}>General</span>
        <Fragment>
          <label htmlFor="new-product-name" className={formStyles.label}>
            Name
          </label>
          <input
            id="new-product-name"
            className={formStyles.input}
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) =>
              dispatch({ type: "NAME", payload: e.target.value })
            }
          />
          {errors.name && (
            <span className={formStyles.error}>
              <PiWarningCircleBold />
              {errors.name}
            </span>
          )}
        </Fragment>

        <Fragment>
          <label
            htmlFor="new-product-price"
            className={`${formStyles.label} ${styles.price}`}
          >
            Price (Rs)
          </label>
          <input
            id="new-product-price"
            className={`${formStyles.input} ${styles.price}`}
            type="number"
            name="price"
            placeholder="Price"
            step={0.01}
            min={0}
            onChange={(e) =>
              dispatch({ type: "PRICE", payload: e.target.value })
            }
          />
          {errors.price && (
            <span className={formStyles.error}>
              <PiWarningCircleBold />
              {errors.price}
            </span>
          )}
        </Fragment>

        <Fragment>
          <label htmlFor="new-product-category" className={formStyles.label}>
            Category
          </label>
          <select
            id="new-product-category"
            className={formStyles.select}
            name="category"
            onChange={(e) =>
              dispatch({ type: "CATEGORY", payload: e.target.value })
            }
          >
            <option value="none">None</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="child">Child</option>
          </select>
          {errors.category && (
            <span className={formStyles.error}>
              <PiWarningCircleBold />
              {errors.category}
            </span>
          )}
        </Fragment>

        <Fragment>
          <label htmlFor="new-product-description" className={formStyles.label}>
            Description
          </label>
          <textarea
            name="product-description"
            id="new-product-description"
            className={formStyles.textarea}
          />
        </Fragment>
      </Card>

      <Card className={`${styles.media} ${styles.card}`}>
        <span className={styles.cardTitle}>Media</span>
        <DND className={styles.imagePicker} />
        <DND className={styles.imagePicker} />
        <DND className={styles.imagePicker} />
        <DND className={styles.imagePicker} />
        <DND className={styles.imagePicker} />
      </Card>

      <Card className={`${styles.seo} ${styles.card}`}>
        <span className={styles.cardTitle}>Search Engine Optimization</span>
        <Fragment>
          <label htmlFor="new-product-url-key" className={formStyles.label}>
            Url key
          </label>
          <input
            id="new-product-url-key"
            className={formStyles.input}
            type="text"
            name="url-key"
            placeholder="products/<your-key>"
            onChange={(e) =>
              dispatch({ type: "URL-KEY", payload: e.target.value })
            }
          />
          {errors["url-key"] && (
            <span className={formStyles.error}>
              <PiWarningCircleBold />
              {errors["url-key"]}
            </span>
          )}
        </Fragment>

        <Fragment>
          <label htmlFor="new-product-meta-title" className={formStyles.label}>
            Meta Title
          </label>
          <input
            id="new-product-meta-title"
            className={formStyles.input}
            type="text"
            name="meta-title"
            placeholder="Title"
            onChange={(e) =>
              dispatch({ type: "META-TITLE", payload: e.target.value })
            }
          />
          {errors["meta-title"] && (
            <span className={formStyles.error}>
              <PiWarningCircleBold />
              {errors["meta-title"]}
            </span>
          )}
        </Fragment>

        <Fragment>
          <label
            htmlFor="new-product-meta-keywords"
            className={formStyles.label}
          >
            Meta Keywords
          </label>
          <input
            id="new-product-meta-keywords"
            className={formStyles.input}
            type="text"
            name="meta-keywords"
            placeholder="Keywords"
            onChange={(e) =>
              dispatch({ type: "META-KEYWORDS", payload: e.target.value })
            }
          />
          {errors["meta-keywords"] && (
            <span className={formStyles.error}>
              <PiWarningCircleBold />
              {errors["meta-keywords"]}
            </span>
          )}
        </Fragment>

        <Fragment>
          <label
            htmlFor="new-product-meta-description"
            className={formStyles.label}
          >
            Meta Description
          </label>
          <textarea
            id="new-product-meta-description"
            className={formStyles.textarea}
            type="text"
            name="meta-description"
            placeholder="Description"
            onChange={(e) =>
              dispatch({ type: "META-DESCRIPTION", payload: e.target.value })
            }
          />
          {errors["meta-description"] && (
            <span className={formStyles.error}>
              <PiWarningCircleBold />
              {errors["meta-description"]}
            </span>
          )}
        </Fragment>
      </Card>

      <Card className={`${styles.productStatus} ${styles.card}`}>
        <span className={styles.cardTitle}>Product Status</span>
        <label className={formStyles.label}>Status</label>
        <RadioButton
          name="status"
          value="disabled"
          className={styles.radio}
          labelclassname={styles.radioText}
        >
          Disabled
        </RadioButton>
        <RadioButton
          name="status"
          value="enabled"
          defaultChecked
          className={styles.radio}
          labelclassname={styles.radioText}
        >
          Enabled
        </RadioButton>
        <hr />

        <label className={formStyles.label}>Visibility</label>
        <RadioButton
          name="visibility"
          value="not-visible"
          className={styles.radio}
          labelclassname={styles.radioText}
        >
          Not visible
        </RadioButton>
        <RadioButton
          name="visibility"
          value="visible"
          defaultChecked
          className={styles.radio}
          labelclassname={styles.radioText}
        >
          Visible
        </RadioButton>
      </Card>

      <Card className={`${styles.inventory} ${styles.card}`}>
        <span className={styles.cardTitle}>Inventory</span>
        <label className={formStyles.label}>Stock Avaibility</label>
        <RadioButton
          name="stock-availability"
          value="no"
          className={styles.radio}
          labelclassname={styles.radioText}
        >
          No
        </RadioButton>
        <RadioButton
          name="stock-availability"
          value="yes"
          defaultChecked
          className={styles.radio}
          labelclassname={styles.radioText}
        >
          Yes
        </RadioButton>
        <hr />
        <label htmlFor="new-product-quantity" className={formStyles.label}>
          Quantity
        </label>
        <input
          id="new-product-quantity"
          className={formStyles.input}
          type="number"
          name="quantity"
          placeholder="Quantity"
        />
      </Card>

      <Card className={`${styles.variants} ${styles.card}`}>Variants</Card>

      <Card className={`${styles.attributes} ${styles.card}`}>
        <span className={styles.cardTitle}>Attributes</span>
        <Attributes />
      </Card>

      <Card className={`${styles.footer} ${styles.card}`}>
        <button className={styles.saveButton} type="submit">
          Save
        </button>
        <button className={styles.cancelButton} type="reset">
          Reset
        </button>
      </Card>
    </form>
  );
}
