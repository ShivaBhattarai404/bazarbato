"use client";

import { Fragment, useState } from "react";

import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";

import Card from "@/components/Card/Card";
import RadioButton from "@/components/RadioButton/RadioButton";
import InputError from "@/components/InputError/InputError";
import Spinner from "@/components/_admin/Spinner/Spinner";

const DEFAULT_ERRORS = {
  name: { message: "Name should be 3 characters long", touched: false },
  code: { message: "Code should be 3 characters long", touched: false },
};
export default function AttributeForm({
  handleSubmit,
  checkIfAttributeExists,
  attribute,
}) {
  const [attributeType, setAttributeType] = useState("TEXT");
  const [attributeCode, setAttributeCode] = useState("");
  const [errors, setErrors] = useState(DEFAULT_ERRORS);
  const [attributeSelectOptions, setAttributeSelectOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  // function to handle the change of the attribute type
  const attributeTypeChangeHandler = (e) => {
    setAttributeType(e.target.value);
  };

  const attributeCodeChangeHandler = async (e) => {
    let value = e.target.value;
    value = value.toUpperCase().replace(" ", "_").trim();
    if (value.length > 0 && !/^[A-Z_0-9]+$/.test(value)) return;
    setAttributeCode(value);
    // setting the error message for the code field
    const error = { message: "", touched: true };
    if (value.length < 3) {
      error.message = "Code should be 3 characters long";
    } else {
      try {
        const { ack, exists } = await checkIfAttributeExists(value);
        if (!ack) throw "Network error occurred. Refresh the page";
        if (exists) error.message = "Attribute with this code already exists";
      } catch {
        error.message = "Network error occurred. Refresh the page";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, code: error }));
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

  // function to handle the form submission
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    // checking if the form is valid and all the fields are filled correctly
    const isFormValid = Object.values(errors).every((error) => !error.message);
    // if the form is not touched, then set the default errors
    // it means that the user has not interacted with the form
    if (isFormValid) {
      // creating a new form data object
      const formData = new FormData(e.target);
      // append the product id to the form data if the product is in edit mode
      formData.append("_id", attribute?._id ? attribute._id : "");
      // calling the handleSubmit function
      try {
        setLoading(true);
        const response = await handleSubmit(formData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    } else {
      setErrors((prevErrors) => {
        for (const key in prevErrors) {
          prevErrors[key].touched = true;
        }
        return { ...prevErrors };
      });
    }
  };

  if (loading) return <Spinner />;

  return (
    <form
      className={styles.cardWrapper}
      onSubmit={formSubmitHandler}
      noValidate
    >
      <Card className={`${styles.card} ${styles.general}`}>
        <span className={styles.cardTitle}>General</span>
        <Fragment key="attribute-name">
          <label className={formStyles.label} htmlFor="new-attribute-name">
            Name
          </label>
          <input
            className={formStyles.input}
            type="text"
            id="new-attribute-name"
            name="name"
            onChange={({ target: { value: name } }) => {
              setErrors((prevErrors) => ({
                ...prevErrors,
                name: {
                  message:
                    name.length < 3 ? "Name should be 3 characters long" : "",
                  touched: true,
                },
              }));
            }}
            placeholder="Enter the name of the attribute"
            required
          />
          <InputError errors={errors} name="name" />
        </Fragment>

        <Fragment key="attribute-code">
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
            required
          />
          <InputError errors={errors} name="code" />
        </Fragment>

        <Fragment key="select-type">
          <label className={formStyles.label} htmlFor="new-attribute-type">
            Type
          </label>
          <RadioButton
            className={styles.attributeTypeRadioBtn}
            name="type"
            value="TEXT"
            checked={attributeType === "TEXT"}
            onChange={attributeTypeChangeHandler}
          >
            Text
          </RadioButton>
          <RadioButton
            className={styles.attributeTypeRadioBtn}
            name="type"
            value="SELECT"
            checked={attributeType === "SELECT"}
            onChange={attributeTypeChangeHandler}
          >
            Select
          </RadioButton>
          <RadioButton
            className={styles.attributeTypeRadioBtn}
            name="type"
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
                  name="options"
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
      </Card>

      <Card className={`${styles.card} ${styles.advanced}`}>
        <span className={styles.cardTitle}>Advanced</span>
        <label className={formStyles.label}>Is Required?</label>
        <RadioButton
          className={styles.radio}
          value="no"
          name="is-required"
          defaultChecked
        >
          Not Required
        </RadioButton>
        <RadioButton className={styles.radio} value="yes" name="is-required">
          Required
        </RadioButton>
        <hr />
        <label className={formStyles.label}>Show to customers?</label>
        <RadioButton
          value="no"
          defaultChecked
          name="show-to-customer"
          className={styles.radio}
        >
          No
        </RadioButton>
        <RadioButton
          value="yes"
          name="show-to-customer"
          className={styles.radio}
        >
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
