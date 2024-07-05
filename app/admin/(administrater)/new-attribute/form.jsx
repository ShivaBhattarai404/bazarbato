"use client";

import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";

import Card from "@/components/Card/Card";
import RadioButton from "@/components/RadioButton/RadioButton";
import { Fragment, useState } from "react";

export default function CategoryForm({ handleSubmit }) {
  const [attributeType, setAttributeType] = useState("TEXT");
  const [attributeSelectOptions, setAttributeSelectOptions] = useState([]);

  // function to handle the change of the attribute type
  const attributeTypeChangeHandler = (e) => {
    setAttributeType(e.target.value);
  };

  // function to handle the removal of the option
  const handleOptionRemove = (index) => {
    setAttributeSelectOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions.splice(index, 1);
      return newOptions;
    });
  };

  // function to handle the change of the option value
  const optionChangeHandler = (index, e) => {
    setAttributeSelectOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = e.target.value;
      return newOptions;
    });
  };

  return (
    <form className={styles.cardWrapper} action={handleSubmit}>
      <Card className={`${styles.card} ${styles.general}`}>
        <span className={styles.cardTitle}>General</span>
        <label className={formStyles.label} htmlFor="new-attribute-name">
          Name
        </label>
        <input
          className={formStyles.input}
          type="text"
          id="new-attribute-name"
          name="name"
          placeholder="Enter the name of the attribute"
          required
        />
        <label className={formStyles.label} htmlFor="new-attribute-code">
          Attribute Code
        </label>
        <input
          className={formStyles.input}
          type="text"
          id="new-attribute-code"
          name="code"
          placeholder="Code"
          required
        />

        <label className={formStyles.label} htmlFor="new-attribute-type">
          Type
        </label>
        <RadioButton
          className={styles.attributeTypeRadioBtn}
          name="new-attribute-type"
          value="TEXT"
          checked={attributeType === "TEXT"}
          onChange={attributeTypeChangeHandler}
        >
          Text
        </RadioButton>
        <RadioButton
          className={styles.attributeTypeRadioBtn}
          name="new-attribute-type"
          value="SELECT"
          checked={attributeType === "SELECT"}
          onChange={attributeTypeChangeHandler}
        >
          Select
        </RadioButton>
        <RadioButton
          className={styles.attributeTypeRadioBtn}
          name="new-attribute-type"
          value="NUMBER"
          checked={attributeType === "NUMBER"}
          onChange={attributeTypeChangeHandler}
        >
          Number
        </RadioButton>

        {attributeType === "SELECT" && (
          <Fragment>
            <label className={formStyles.label}>Attribute Options</label>
            {attributeSelectOptions.map((option, index) => (
              <div key={index} className={styles.optionWrapper}>
                <input
                  className={formStyles.input}
                  type="text"
                  value={option}
                  name={`attribute_select_option-${index}`}
                  onChange={optionChangeHandler.bind(null, index)}
                  placeholder="Option"
                  required
                />
                <button
                  className={styles.removeOption}
                  type="button"
                  onClick={handleOptionRemove.bind(null, index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className={styles.addOption}
              type="button"
              onClick={() =>
                setAttributeSelectOptions((prevOptions) =>
                  prevOptions.concat("")
                )
              }
            >
              Add Option
            </button>
          </Fragment>
        )}
        {/* <MultiSelect label="Attribute Group" /> */}
      </Card>

      <Card className={`${styles.card} ${styles.advanced}`}>
        <span className={styles.cardTitle}>Advanced</span>
        <label className={formStyles.label}>Is Required?</label>
        <RadioButton className={styles.radio} name="is-required" defaultChecked>
          Not Required
        </RadioButton>
        <RadioButton className={styles.radio} name="is-required">
          Required
        </RadioButton>
        <hr />
        <label className={formStyles.label}>Show to customers?</label>
        <RadioButton
          className={styles.radio}
          name="show-to-customer"
          defaultChecked
        >
          No
        </RadioButton>
        <RadioButton className={styles.radio} name="show-to-customer">
          Yes
        </RadioButton>
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
