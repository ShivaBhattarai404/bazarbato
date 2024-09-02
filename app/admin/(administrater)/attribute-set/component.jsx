"use client";

import Link from "next/link";
import { useState } from "react";

import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";
import Card from "@/components/Card/Card";
import CheckBox from "@/components/CheckBox/CheckBox";
import Modal from "@/components/_admin/Modal/Modal";
import Spinner from "@/components/_admin/Spinner/Spinner";
import { useRouter } from "next/navigation";

export default function AttributeSetClientPage({
  attributeSets,
  deleteAttributeSet,
}) {
  const [selectedAttributeSets, setSelectedSets] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const attributeSetSelectHandler = (e) => {
    const attributeSetId = e.target.value;
    if (selectedAttributeSets.includes(attributeSetId)) {
      setSelectedSets((prev) => prev.filter((item) => item !== attributeSetId));
    } else {
      setSelectedSets((prev) => [...prev, attributeSetId]);
    }
  };

  const attributeSetDeleteHandler = async (IDs) => {
    try {
      setModal(false);
      setSelectedSets([]);
      setLoading(true);
      const response = await deleteAttributeSet(IDs);
      if (response.error) {
        setLoading(false);
        setError(response.error);
      } else {
        setLoading(false);
        router.refresh();
      }
    } catch (error) {
      setError("Some error occured. Try refreshing the page");
    }
  };

  const btn1Text = error ? "Okay" : "Delete";
  const bgColor1 = error ? "#0070f3" : "#d72c0d";
  const word = selectedAttributeSets.length > 1 ? "sets" : "set";
  const grammar = selectedAttributeSets.length > 1 ? "these" : "this";
  const title = error
    ? "Error Occured!!"
    : `Delete ${selectedAttributeSets.length} ${word}`;
  const paragraph =
    error || `Are you sure you want to delete ${grammar} attribute ${word}?`;
  const onOk = () => {
    if (error) {
      setError("");
      setModal(false);
    } else attributeSetDeleteHandler(selectedAttributeSets);
  };

  if (loading) return <Spinner />;
  return (
    <div className={styles.container}>
      {(error || modal) && (
        <Modal
          btn1Text={btn1Text}
          btn2Text="Cancel"
          bgColor2={bgColor1}
          onOk={onOk}
          onCancel={() => setModal(false)}
          title={title}
          paragraph={paragraph}
        />
      )}

      <div className={styles.title}>
        <h1>Attribute Set</h1>
        <Link
          className={styles.newCategoryLink}
          href="/admin/new-attribute-set"
        >
          New Attribute Set
        </Link>
      </div>
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
        </select>
        <select className={`${formStyles.select} ${styles.sort}`}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
          <option value="productsAsc">No. of products: Low to High</option>
          <option value="productsDesc">No. of products: High to Low</option>
        </select>

        {selectedAttributeSets.length > 0 && (
          <div className={styles.controls}>
            <div className={styles.no_of_selected_items}>
              {selectedAttributeSets.length} selected
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
              <th className={styles.name}>Attribute Name</th>
              <th className={styles.code}>Code</th>
              <th className={styles.attributeCount}>Associated Attributes</th>
            </tr>
          </thead>
          <tbody>
            {attributeSets.map((attributeSet, i) => (
              <tr key={attributeSet.name}>
                <td className={styles.checkbox}>
                  <CheckBox
                    id={`attributeSets-${i}`}
                    value={attributeSet._id}
                    onClick={attributeSetSelectHandler}
                  />
                </td>
                <td className={styles.name}>
                  <Link
                    href={`/admin/new-attribute-set?set=${attributeSet.code}`}
                  >
                    {attributeSet.name}
                  </Link>
                </td>
                <td className={styles.code}>{attributeSet.code}</td>
                <td className={styles.attributeCount}>
                  {attributeSet.attributeCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
