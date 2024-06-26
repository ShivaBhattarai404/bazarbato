"use client";

import { Fragment, useState } from "react";
import Image from "next/image";

import { FaCamera } from "react-icons/fa6";

import styles from "./DND.module.css";
import { RiDeleteBinLine } from "react-icons/ri";

const DND = (props) => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Fragment>
      {!file && (
        <label
          {...props}
          className={`${props.className} ${styles.wrapper} ${
            file && styles.active
          }`}
          style={{ height: props.height + "rem", width: props.width + "rem" }}
        >
          <FaCamera className={styles.cameraIcon} />
          <input
            type="file"
            name={props.name || "image"}
            hidden
            onChange={handleChange}
          />
        </label>
      )}

      {file && (
        <div className={`${props.className} ${styles.imageWrapper}`}>
          <div className={styles.overlay} onClick={() => setFile(null)}>
            <RiDeleteBinLine />
          </div>
          <Image
            src={file}
            alt="product"
            className={`${styles.image}`}
            width={500}
            height={500}
          />
        </div>
      )}
    </Fragment>
  );
};

export default DND;
