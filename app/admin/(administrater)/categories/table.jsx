"use client";

import Link from "next/link";
import { Fragment, useState } from "react";

import formStyles from "@/public/styles/form.module.css";
import styles from "./page.module.css";

import Card from "@/components/Card/Card";
import CheckBox from "@/components/CheckBox/CheckBox";
import Modal from "@/components/Modal/Modal";

export default function CategoryTable({ categories }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [modal, setModal] = useState(false);

  const categorySelectHandler = (e) => {
    const { value } = e.target;
    if (selectedCategories.includes(value)) {
      setSelectedCategories((prev) => prev.filter((item) => item !== value));
    } else {
      setSelectedCategories((prev) => [...prev, value]);
    }
  };

  const word = selectedCategories.length > 1 ? "categories" : "category";
  const grammar = selectedCategories.length > 1 ? "these" : "this";

  return (
    <Fragment>
      {modal && (
        <Modal
          btn1Text="Delete"
          btn2Text="Cancel"
          bgColor2="#d72c0d"
          onCancel={() => setModal(false)}
          title={`Delete ${selectedCategories.length} ${word}`}
          paragraph={`Are you sure you want to delete ${grammar} ${word}?`}
        />
      )}
      <Card className={styles.card}>
        <input
          type="text"
          placeholder="Search"
          className={`${formStyles.input} ${styles.search}`}
        />
        <select className={`${formStyles.select}`}>
          <option value="all">All</option>
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
          <option value="parent">Parent Catgory</option>
          <option value="child">Child Category</option>
        </select>
        <select className={`${formStyles.select} ${styles.sort}`}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
          <option value="productsAsc">No. of products: Low to High</option>
          <option value="productsDesc">No. of products: High to Low</option>
        </select>

        {selectedCategories.length > 0 && (
          <div className={styles.controls}>
            <div className={styles.no_of_selected_items}>
              {selectedCategories.length} selected
            </div>
            <div className={styles.delete_btn} onClick={() => setModal(true)}>
              Delete
            </div>
          </div>
        )}

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkbox}></th>
              <th className={styles.name}>Category Name</th>
              <th className={styles.no_of_products}>No. of products</th>
              <th className={styles.type}>Type</th>
              <th className={styles.is_in_menu}>Include in menu</th>
              <th className={styles.status}>Status</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td className={styles.checkbox}>
                  <CheckBox
                    id={`categories-${category._id}`}
                    value={category._id}
                    onClick={categorySelectHandler}
                  />
                </td>
                <td className={styles.name}>
                  <Link href={`/admin/new-category?category=${category.url_key}`}>{category.name}</Link>
                </td>
                <td className={styles.no_of_products}>
                  {category?.products?.length || 0}
                </td>
                <td className={styles.type}>
                  {category.isParent ? "Parent" : "Child"}
                </td>
                <td className={styles.is_in_menu}>{category.visibility}</td>
                <td className={styles.status}>
                  <span
                    className={
                      category.status === "disabled" ? styles.disabled : ""
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Fragment>
  );
}
