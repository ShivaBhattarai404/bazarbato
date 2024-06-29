"use client";

import { Fragment, useEffect, useState } from "react";
import styles from "./Overlay.module.css";
import { createPortal } from "react-dom";
import Card from "../Card/Card";

export default function Overlay(props) {
  const { onClick, children, className, ...rest } = props;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const container = document.getElementById("overlay");
  const component = (
    <Fragment>
      <div className={styles.backdrop} onClick={onClick}></div>
      <Card className={`${styles.modal} ${className}`} {...rest}>
        {children}
      </Card>
    </Fragment>
  );

  return createPortal(component, container);
}
