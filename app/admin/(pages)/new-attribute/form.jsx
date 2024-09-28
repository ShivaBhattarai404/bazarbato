"use client";

import { Fragment, useEffect, useState } from "react";

import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";

import Card from "@/components/Card/Card";
import RadioButton from "@/components/RadioButton/RadioButton";
import InputError from "@/components/InputError/InputError";
import Spinner from "@/components/_admin/Spinner/Spinner";
import { useRouter } from "next/navigation";

// Null errors
// these errors are shown initially when the the page is in edit mode
const NULL_ERRORS = {
  name: { message: "", touched: true },
  code: { message: "", touched: true },
};

// validation errors for inputs
const VALIDATION_ERRORS = {
  name: { message: "Name should be 3 characters long", touched: false },
  code: { message: "Code should be 3 characters long", touched: false },
};
export default function AttributeForm({
  handleSubmit,
  checkIfAttributeExists,
  attribute,
}) {
  const router = useRouter();
  const [attributeType, setAttributeType] = useState(
    attribute?.type.toUpperCase() || "TEXT"
  );
  const [attributeCode, setAttributeCode] = useState(attribute?.code || "");
  const [errors, setErrors] = useState(
    attribute ? NULL_ERRORS : VALIDATION_ERRORS
  );
  const [attributeSelectOptions, setAttributeSelectOptions] = useState(
    attribute?.options || []
  );
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
        const { ack, exists } = await checkIfAttributeExists({ code: value });
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
        if (!response.ack) throw response.message;
        router.push("/admin/attributes");
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
            defaultValue={attribute?.name}
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
            disabled={attribute?._id}
            onChange={attributeCodeChangeHandler}
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
            disabled={attribute?._id}
            checked={attributeType.toUpperCase() === "TEXT"}
            onChange={attributeTypeChangeHandler}
          >
            Text
          </RadioButton>
          <RadioButton
            className={styles.attributeTypeRadioBtn}
            name="type"
            disabled={attribute?._id}
            value="SELECT"
            checked={attributeType.toUpperCase() === "SELECT"}
            onChange={attributeTypeChangeHandler}
          >
            Select
          </RadioButton>
          <RadioButton
            className={styles.attributeTypeRadioBtn}
            name="type"
            value="NUMBER"
            disabled={attribute?._id}
            checked={attributeType.toUpperCase() === "NUMBER"}
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
                  disabled={attribute?._id}
                  onChange={optionChangeHandler.bind(null, index)}
                  placeholder="Option"
                  required
                />
                {!attribute?._id && (
                  <button
                    className={styles.removeOption}
                    type="button"
                    onClick={handleOptionRemove.bind(null, index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {!attribute?._id && (
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
            )}
          </Fragment>
        )}
      </Card>

      <Card className={`${styles.card} ${styles.advanced}`}>
        <span className={styles.cardTitle}>Advanced</span>
        {/* <Fragment key="is-required">
          <label className={formStyles.label}>Is Required?</label>
          <RadioButton
            className={styles.radio}
            value="no"
            name="is-required"
            defaultChecked
          >
            Not Required
          </RadioButton>
          <RadioButton
            className={styles.radio}
            value="yes"
            name="is-required"
            defaultChecked={attribute?.isRequired}
          >
            Required
          </RadioButton>
        </Fragment> */}
        {/* <hr /> */}
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
          defaultChecked={!attribute ? true : attribute.showToCustomer}
        >
          Yes
        </RadioButton>
      </Card>

      <Card className={`${styles.footer} ${styles.card}`}>
        <button className={styles.saveButton} type="submit">
          {attribute ? "Update" : "Save"}
        </button>
        <button className={styles.cancelButton} type="reset">
          Reset
        </button>
      </Card>
    </form>
  );
}
