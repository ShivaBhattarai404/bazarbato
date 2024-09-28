"use client";

import { Fragment, useReducer, useState } from "react";

import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";

import Card from "@/components/Card/Card";
import DND from "@/components/_admin/DND/DND";
import RadioButton from "@/components/RadioButton/RadioButton";
import CheckBox from "@/components/CheckBox/CheckBox";
import InputError from "@/components/InputError/InputError";
import Spinner from "@/components/_admin/Spinner/Spinner";
import Modal from "@/components/_admin/Modal/Modal";
import { useRouter } from "next/navigation";

// Null erros
// these errors are shown initially when the the page is in edit mode
const NULL_ERRORS = {
  name: { message: "", touched: true },
  code: { message: "", touched: true },
  parentCategory: { message: "", touched: true },
  description: { message: "", touched: true },
  image: { message: "", touched: true },
  "url-key": { message: "", touched: true },
  "meta-title": { message: "", touched: true },
  "meta-keywords": { message: "", touched: true },
  "meta-description": {
    message: "",
    touched: true,
  },
};

// validation errors
// these errors are shown when the user has not interacted with the form
// the errors has a message and a touched property
// the touched property is used to check if the user has interacted with the input field
// if the user has not interacted with the input field, then the error message is not shown
const VALIDATION_ERRORS = {
  name: { message: "Name must be at least 3 characters", touched: false },
  code: { message: "Code is required", touched: false },
  parentCategory: { message: "Select a parent category", touched: false },
  description: { message: "Description is required", touched: false },
  image: { message: "Banner is required", touched: false },
  "url-key": { message: "Url key is required", touched: false },
  "meta-title": { message: "Meta title is required", touched: false },
  "meta-keywords": { message: "Meta keywords is required", touched: false },
  "meta-description": {
    message: "Meta description is required",
    touched: false,
  },
};

// reducer function
function reducer(state, action) {
  const payload = action.payload;
  const error = { message: "", touched: true };
  // switch case to check the type of action
  switch (action.type) {
    case "NAME":
      error.message = payload.length < 3 ? VALIDATION_ERRORS.name.message : "";
      return { ...state, name: error };
    case "CODE":
      error.message = payload;
      return { ...state, code: error };
    case "CATEGORY":
      error.message =
        !payload.length || payload.toLowerCase() === "none"
          ? VALIDATION_ERRORS.parentCategory.message
          : "";
      return { ...state, parentCategory: error };
    case "DESCRIPTION":
      error.message = !payload.length
        ? VALIDATION_ERRORS.description.message
        : "";
      return { ...state, description: error };
    case "IMAGE":
      // checking if there is an image
      // the payload is the boolean value of the image
      // if the image is present, then the payload is true or else false
      error.message = payload ? "" : VALIDATION_ERRORS.image.message;
      return { ...state, image: error };
    case "URL-KEY":
      error.message = payload;
      return { ...state, "url-key": error };
    case "META-TITLE":
      error.message = !payload.length
        ? VALIDATION_ERRORS["meta-title"].message
        : "";
      return { ...state, "meta-title": error };
    case "META-KEYWORDS":
      error.message = !payload.length
        ? VALIDATION_ERRORS["meta-keywords"].message
        : "";
      return { ...state, "meta-keywords": error };
    case "META-DESCRIPTION":
      error.message = !payload.length
        ? VALIDATION_ERRORS["meta-description"].message
        : "";
      return { ...state, "meta-description": error };
    case "RESET":
      return { ...VALIDATION_ERRORS };
    case "SET_ERRORS":
      return { ...payload };
    default:
      return { ...state };
  }
}

export default function CategoryForm({
  handleSubmit,
  checkIfCategoryExists,
  category,
  parentCategories,
}) {
  const [isParentCategory, setIsParentCategory] = useState(
    category ? category.isParent : false
  );
  const [errors, dispatch] = useReducer(
    reducer,
    category ? NULL_ERRORS : VALIDATION_ERRORS
  );
  const [responseError, setResponseError] = useState(null);
  const router = useRouter();
  const [urlKey, setUrlKey] = useState(category?.url_key);
  const [categoryCode, setCategoryCode] = useState(category?.code);
  const [banner, setBanner] = useState(category?.banner || null);
  const [loading, setLoading] = useState(false);

  // function to handle form submission
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    // setting the parent category error to null if the category is a parent category
    // if the category is a parent category, then the parent category is not required
    errors.parentCategory = isParentCategory
      ? NULL_ERRORS.parentCategory
      : errors.parentCategory;
    // checking if the form is valid and all the fields are filled correctly
    const isFormValid = Object.values(errors).every((error) => !error.message);
    // if the form is not touched, then set the default errors
    // it means that the user has not interacted with the form
    if (isFormValid) {
      // creating a new form data object
      const formData = new FormData(e.target);
      // append the product id to the form data if the product is in edit mode
      formData.append("_id", category?._id ? category._id : "");
      // append the product isParent status to the form data if the product is in edit mode
      formData.append("is-parent-category", isParentCategory);
      // appending the banner image to the form data
      formData.append("banner", banner);
      // calling the handleSubmit function
      try {
        setLoading(true);
        const response = await handleSubmit(formData);
        if (response.error) {
          setResponseError(response.error);
          setLoading(false);
        } else {
          router.push("/admin/categories");
          setUrlKey("");
          setCategoryCode("");
          setBanner(null);
          dispatch({ type: "RESET" });
        }
      } catch (error) {
        setLoading(false);
      }
    } else {
      for (const key in errors) {
        errors[key].touched = true;
      }
      dispatch({ type: "SET_ERRORS", payload: errors });
    }
  };

  // this function gets executes every time the Category Code changes
  async function codeChangeHandler(e) {
    const value = e.target.value.replace(" ", "_").trim().toUpperCase();
    setCategoryCode(value);

    if (value.length < 3) {
      dispatch({
        type: "CODE",
        payload: "CODE must be at least 3 characters",
      });
    } else {
      const productStatus = await checkIfCategoryExists({ code: value });
      if (productStatus.ack && productStatus.exists) {
        dispatch({ type: "CODE", payload: "CODE must be unique" });
      } else {
        dispatch({ type: "CODE", payload: "" });
      }
      dispatch({ type: "CODE", payload: "" });
    }
  }

  // this function gets executes every time the URL Key changes
  async function urlKeyChangeHandler(e) {
    const value = e.target.value.replace(" ", "_").trim();
    setUrlKey(value);

    if (value.length < 3) {
      dispatch({
        type: "URL-KEY",
        payload: "Url key must be at least 3 characters",
      });
    } else {
      const productStatus = await checkIfCategoryExists({ "url-key": value });
      if (productStatus.ack && productStatus.exists) {
        dispatch({ type: "URL-KEY", payload: "Url key already exists" });
      } else {
        dispatch({ type: "URL-KEY", payload: "" });
      }
    }
  }

  if (loading) return <Spinner />;

  return (
    <Fragment>
      {responseError && (
        <Modal
          btn1Text="Okay"
          btn2Text="Cancel"
          onOk={() => setResponseError("")}
          onCancel={setResponseError.bind(null, "")}
          title="Some Error Occured!!"
          paragraph={responseError}
        />
      )}
      <form
        className={styles.cardWrapper}
        onSubmit={formSubmitHandler}
        method="post"
        noValidate
      >
        <Card className={`${styles.card} ${styles.general}`}>
          <span className={styles.cardTitle}>General</span>
          {/* pass key to fragments so that I can see the context inside Fragment
            even it is minimized
        */}
          <Fragment key="catgory name">
            <label className={formStyles.label} htmlFor="new-category-name">
              Name
            </label>
            <input
              className={formStyles.input}
              type="text"
              id="new-category-name"
              name="name"
              defaultValue={category?.name}
              placeholder="Enter the name of the category"
              required
              onChange={(e) =>
                dispatch({ type: "NAME", payload: e.target.value })
              }
            />
            <InputError className={styles.error} errors={errors} name="name" />
          </Fragment>

          <Fragment key="catgory code">
            <label className={formStyles.label} htmlFor="new-category-code">
              Code
            </label>
            <input
              required
              name="code"
              type="text"
              disabled={category}
              value={categoryCode}
              id="new-category-code"
              onChange={codeChangeHandler}
              className={formStyles.input}
              placeholder="Enter the unique code for the category"
            />
            <InputError className={styles.error} errors={errors} name="code" />
          </Fragment>

          <Fragment key="isParentCategory and select">
            {!category && (
              <CheckBox
                value={isParentCategory}
                defaultChecked={isParentCategory}
                className={styles.checkbox}
                onClick={() => setIsParentCategory((prev) => !prev)}
              >
                Is a parent category?
              </CheckBox>
            )}

            {!isParentCategory && (
              <Fragment>
                <label
                  className={[formStyles.label, styles.parentCategory].join(
                    " "
                  )}
                  htmlFor="new-category-parent"
                >
                  Parent Category
                </label>
                <select
                  className={formStyles.select}
                  id="new-category-parent"
                  name="parent"
                  defaultValue={category?.parent || "none"}
                  required
                  onChange={(e) =>
                    dispatch({
                      type: "CATEGORY",
                      payload: e.target.value,
                    })
                  }
                >
                  <option value={isParentCategory ? "parent" : "none"}>
                    Select a category
                  </option>
                  {parentCategories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <InputError
                  className={styles.error}
                  errors={errors}
                  name="parentCategory"
                />
              </Fragment>
            )}
          </Fragment>

          <Fragment>
            <label
              className={formStyles.label}
              htmlFor="new-category-description"
            >
              Description
            </label>
            <textarea
              className={formStyles.textarea}
              id="new-category-description"
              name="description"
              required
              defaultValue={category?.description}
              onChange={(e) =>
                dispatch({ type: "DESCRIPTION", payload: e.target.value })
              }
            />
            <InputError
              className={styles.error}
              errors={errors}
              name="description"
            />
          </Fragment>
        </Card>

        <Card className={`${styles.card} ${styles.banner}`}>
          <span className={styles.cardTitle}>Category Banner</span>
          <InputError className={styles.error} errors={errors} name="image" />
          <DND
            name="banner"
            className={styles.dnd}
            height={10}
            defaultimage={category?.banner}
            onUpload={(img) => {
              setBanner(img);
              dispatch({ type: "IMAGE", payload: Boolean(img) });
            }}
          />
        </Card>

        <Card className={`${styles.card} ${styles.status}`}>
          <span className={styles.cardTitle}>Status</span>
          <Fragment>
            <RadioButton
              name="status"
              className={styles.radio}
              value="disabled"
              defaultChecked
            >
              Disabled
            </RadioButton>
            <RadioButton
              name="status"
              className={styles.radio}
              defaultChecked={!category || category.status === "enabled"}
              value="enabled"
            >
              Enabled
            </RadioButton>
          </Fragment>
          <hr />

          <Fragment>
            <span className={styles.cardTitle}>Include in Menu</span>
            <RadioButton
              className={styles.radio}
              name="include-in-menu"
              value="no"
              defaultChecked
            >
              No
            </RadioButton>
            <RadioButton
              name="include-in-menu"
              className={styles.radio}
              defaultChecked={!category || category.visibility === "yes"}
              value="yes"
            >
              Yes
            </RadioButton>
          </Fragment>
        </Card>

        <Card className={`${styles.card} ${styles.seo}`}>
          <span className={styles.cardTitle}>Search Engine Optimization</span>
          <Fragment>
            <label htmlFor="new-category-url-key" className={formStyles.label}>
              Url key
            </label>
            <input
              id="new-category-url-key"
              className={formStyles.input}
              type="text"
              name="url-key"
              value={urlKey}
              disabled={category}
              onChange={urlKeyChangeHandler}
              placeholder="Category key"
            />
            <InputError
              className={styles.error}
              errors={errors}
              name="url-key"
            />
          </Fragment>

          <Fragment>
            <label
              htmlFor="new-category-meta-title"
              className={formStyles.label}
            >
              Meta Title
            </label>
            <input
              id="new-category-meta-title"
              className={formStyles.input}
              type="text"
              name="meta-title"
              placeholder="Title"
              defaultValue={category?.meta_title}
              onChange={(e) =>
                dispatch({ type: "META-TITLE", payload: e.target.value })
              }
            />
            <InputError
              className={styles.error}
              errors={errors}
              name="meta-title"
            />
          </Fragment>

          <Fragment>
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
              defaultValue={category?.meta_keywords}
              placeholder="Keywords"
              onChange={(e) =>
                dispatch({ type: "META-KEYWORDS", payload: e.target.value })
              }
            />
            <InputError
              className={styles.error}
              errors={errors}
              name="meta-keywords"
            />
          </Fragment>

          <Fragment>
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
              defaultValue={category?.meta_description}
              placeholder="Description"
              onChange={(e) =>
                dispatch({ type: "META-DESCRIPTION", payload: e.target.value })
              }
            />
            <InputError
              className={styles.error}
              errors={errors}
              name="meta-description"
            />
          </Fragment>
        </Card>

        {false && (
          <Card className={`${styles.card} ${styles.associatedElements}`}>
            <span className={styles.cardTitle}>
              Associated {category.isParent ? "Sub Categories" : "Products"}
            </span>
          </Card>
        )}

        <Card className={`${styles.footer} ${styles.card}`}>
          <button className={styles.saveButton} type="submit">
            Save
          </button>
          <button className={styles.cancelButton} type="reset">
            Reset
          </button>
        </Card>
      </form>
    </Fragment>
  );
}
