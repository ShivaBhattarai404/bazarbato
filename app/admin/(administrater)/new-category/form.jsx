"use client";

import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";

import Card from "@/components/Card/Card";
import DND from "@/components/DND/DND";
import RadioButton from "@/components/RadioButton/RadioButton";
import CheckBox from "@/components/CheckBox/CheckBox";
import { Fragment, useState } from "react";

export default function CategoryForm({ handleSubmit }) {
  const [isParentCategory, setIsParentCategory] = useState(false);

  return (
    <form className={styles.cardWrapper} action={handleSubmit}>
      <Card className={`${styles.card} ${styles.general}`}>
        <span className={styles.cardTitle}>General</span>
        <label className={formStyles.label} htmlFor="new-category-name">
          Name
        </label>
        <input
          className={formStyles.input}
          type="text"
          id="new-category-name"
          name="name"
          placeholder="Enter the name of the category"
          required
        />

        <CheckBox
          name="is-parent-category"
          className={styles.checkbox}
          onClick={() => setIsParentCategory((prev) => !prev)}
        >
          Is a parent category?
        </CheckBox>

        {!isParentCategory && (
          <Fragment>
            <label className={formStyles.label} htmlFor="new-category-parent">
              Parent Category
            </label>
            <select
              className={formStyles.select}
              id="new-category-parent"
              name="parent"
              required
            >
              <option value="">Select a category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kid">Kid</option>
            </select>
          </Fragment>
        )}

        <label className={formStyles.label} htmlFor="new-category-description">
          Description
        </label>
        <textarea
          className={formStyles.textarea}
          id="new-category-description"
          name="description"
          required
        />
      </Card>

      <Card className={`${styles.card} ${styles.banner}`}>
        <span className={styles.cardTitle}>Category Banner</span>
        <DND name="banner" className={styles.dnd} />
      </Card>

      <Card className={`${styles.card} ${styles.status}`}>
        <span className={styles.cardTitle}>Status</span>
        <RadioButton name="status" className={styles.radio}>
          Disabled
        </RadioButton>
        <RadioButton name="status" className={styles.radio} defaultChecked>
          Enabled
        </RadioButton>
        <hr />

        <span className={styles.cardTitle}>Include in Menu</span>
        <RadioButton name="include-in-menu" className={styles.radio}>
          No
        </RadioButton>
        <RadioButton
          name="include-in-menu"
          className={styles.radio}
          defaultChecked
        >
          Yes
        </RadioButton>
      </Card>

      {/* <Card className={`${styles.card} ${styles.products}`}>
      <span className={styles.cardTitle}>Products</span>
    </Card> */}

      <Card className={`${styles.card} ${styles.seo}`}>
        <span className={styles.cardTitle}>Search Engine Optimization</span>
        <label htmlFor="new-category-url-key" className={formStyles.label}>
          Url key
        </label>
        <input
          id="new-category-url-key"
          className={formStyles.input}
          type="text"
          name="url-key"
          placeholder="Category key"
        />
        <label htmlFor="new-category-meta-title" className={formStyles.label}>
          Meta Title
        </label>
        <input
          id="new-category-meta-title"
          className={formStyles.input}
          type="text"
          name="meta-title"
          placeholder="Title"
        />
        <label
          htmlFor="new-category-meta-keywords"
          className={formStyles.label}
        >
          Meta Keywords
        </label>
        <input
          id="new-category-meta-keywords"
          className={formStyles.input}
          type="text"
          name="meta-keywords"
          placeholder="Keywords"
        />
        <label
          htmlFor="new-category-meta-description"
          className={formStyles.label}
        >
          Meta Description
        </label>
        <textarea
          id="new-category-meta-description"
          className={formStyles.textarea}
          type="text"
          name="meta-description"
          placeholder="Description"
        />
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
