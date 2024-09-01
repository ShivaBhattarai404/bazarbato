"use client";

import { Fragment, useState } from "react";

import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";

import Card from "@/components/Card/Card";
import InputError from "@/components/InputError/InputError";
import Spinner from "@/components/_admin/Spinner/Spinner";
import { useRouter } from "next/navigation";
import MultiSelect from "@/components/MultiSelect/MultiSelect";

// Null errors
// these errors are shown initially when the the page is in edit mode
const NULL_ERRORS = {
  name: { message: "", touched: true },
  code: { message: "", touched: true },
};

// default errors for inputs
const DEFAULT_ERRORS = {
  name: { message: "Name should be 3 characters long", touched: false },
  code: { message: "Code should be 3 characters long", touched: false },
};
export default function AttributeSetForm({
  handleSubmit,
  checkIfAttributeSetExists,
  attributeSet,
  attributes,
}) {
  const router = useRouter();
  const [attributeCode, setAttributeCode] = useState(attributeSet?.code || "");
  const [errors, setErrors] = useState(
    attributeSet ? NULL_ERRORS : DEFAULT_ERRORS
  );
  const [loading, setLoading] = useState(false);

  const attributeSetCodeChangeHandler = async (e) => {
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
        const { ack, exists } = await checkIfAttributeSetExists({
          code: value,
        });
        if (!ack) throw "Network error occurred. Refresh the page";
        if (exists) error.message = "Attribute with this code already exists";
      } catch {
        error.message = "Network error occurred. Refresh the page";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, code: error }));
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
      formData.append("_id", attributeSet?._id ? attributeSet._id : "");
      // calling the handleSubmit function
      try {
        setLoading(true);
        const response = await handleSubmit(formData);
        if (!response.ack) throw response.message;
        router.push("/admin/attribute-set");
      } catch (error) {
        setLoading(false);
        setAttributeCode("");
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
    <form onSubmit={formSubmitHandler} className={styles.form} noValidate>
      <Card className={styles.card}>
        <span className={styles.cardTitle}>General</span>
        <Fragment key="attributeSet-name">
          <label className={formStyles.label} htmlFor="new-attributeSet-name">
            Name
          </label>
          <input
            className={formStyles.input}
            type="text"
            id="new-attributeSet-name"
            name="name"
            defaultValue={attributeSet?.name}
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
            placeholder="Enter the name of the attributeSet"
          />
          <InputError errors={errors} name="name" />
        </Fragment>

        <Fragment key="attributeSet-code">
          <label className={formStyles.label} htmlFor="new-attributeSet-code">
            Attribute Code
          </label>
          <input
            className={formStyles.input}
            type="text"
            id="new-attributeSet-code"
            name="code"
            placeholder="Code"
            value={attributeCode}
            disabled={attributeSet?._id}
            onChange={attributeSetCodeChangeHandler}
          />
          <InputError errors={errors} name="code" />
        </Fragment>

        <Fragment key="attributeSet-attributes">
          <MultiSelect
            label="Add Attributes"
            options={attributes.filter(
              ({ _id }) =>
                !attributeSet?.attributes.find(
                  (attribute) => attribute._id === _id
                )
            )}
            className={styles.multiselect}
            name="attributes"
            capsules={attributeSet?.attributes}
          />
        </Fragment>
      </Card>

      <Card className={`${styles.footer} ${styles.card}`}>
        <button className={styles.saveButton} type="submit">
          {attributeSet ? "Update" : "Save"}
        </button>
        <button className={styles.resetButton} type="reset">
          Reset
        </button>
      </Card>
    </form>
  );
}
