"use client";

import { Fragment, useReducer, useState } from "react";

import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";

import Card from "@/components/Card/Card";
import RadioButton from "@/components/RadioButton/RadioButton";
import InputError from "@/components/InputError/InputError";

// Null erros
// these errors are shown initially when the the page is in edit mode
const NULL_ERRORS = {
  name: { message: "", touched: true },
  code: { message: "", touched: true },
};

// default errors
const DEFAULT_ERRORS = {
  name: { message: "Name should be 3 characters long", touched: false },
  code: { message: "Code should be 3 characters long", touched: false },
};

// reducer function to manage errors
function reducer(state, action) {
  const payload = action.payload;
  const error = { message: "", touched: true };
  // switch case to check the type of action
  switch (action.type) {
    case "NAME":
      error.message = payload.length < 3 ? DEFAULT_ERRORS.name.message : "";
      return { ...state, name: error };
    case "CODE":
      error.message = payload;
      return { ...state, code: error };
    case "RESET":
      return { ...DEFAULT_ERRORS };
    case "SET_ERRORS":
      return { ...payload };
    default:
      return { ...state };
  }
}

export default function CategoryForm({ handleSubmit, checkIfAttributeExists }) {
  const [attributeType, setAttributeType] = useState("TEXT");
  const [attributeCode, setAttributeCode] = useState("");
  const [attributeSelectOptions, setAttributeSelectOptions] = useState([]);
  const [errors, dispatch] = useReducer(reducer, NULL_ERRORS);

  // function to handle the change of the attribute code
  async function attributeCodeChangeHandler(e) {
    const code = e.target.value.replace(" ", "_").trim().toUpperCase();
    setAttributeCode(code);
    if (code.length < 3) {
      dispatch({
        type: "CODE",
        payload: "CODE must be at least 3 characters",
      });
    } else {
      const attributeStatus = await checkIfAttributeExists({ code: code });
      if (attributeStatus.ack && attributeStatus.exists) {
        dispatch({ type: "CODE", payload: "This CODE already exists" });
      } else if (attributeStatus.ack) {
        dispatch({ type: "CODE", payload: "" });
      } else {
        dispatch({ type: "CODE", payload: "Server Error, Refresh the page" });
      }
    }
  }
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
        <Fragment key="attribute name">
          <label className={formStyles.label} htmlFor="new-attribute-name">
            Name
          </label>
          <input
            className={formStyles.input}
            type="text"
            id="new-attribute-name"
            name="name"
            placeholder="Enter the name of the attribute"
            onChange={(e) =>
              dispatch({ type: "NAME", payload: e.target.value })
            }
          />
          <InputError errors={errors} name="name" />
        </Fragment>

        <Fragment key="attribute code">
          <label className={formStyles.label} htmlFor="new-attribute-code">
            Attribute Code
          </label>
          <input
            className={formStyles.input}
            type="text"
            id="new-attribute-code"
            name="code"
            placeholder="Code"
            value={attributeCode}
            onChange={attributeCodeChangeHandler}
          />
          <InputError errors={errors} name="code" />
        </Fragment>

        <Fragment key="attribute type">
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
        </Fragment>

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
