"use client";

import { Fragment, useEffect, useState } from "react";
import styles from "./Overlay.module.css";
import { createPortal } from "react-dom";
import Card from "../Card/Card";

export default function Overlay({
  onClick,
  children,
  className,
  backdropClassName,
  style,
  center = true,
  top,
  left,
  right,
  bottom,
  ...rest
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const container = document.getElementById("overlay");
  const component = (
    <Fragment>
      <div
        className={[styles.backdrop, backdropClassName].join(" ")}
        onClick={onClick}
      />
      <Card
        style={{ ...style, top, right, bottom, left }}
        className={[styles.modal, className, center ? styles.center : ""].join(
          " "
        )}
        {...rest}
      >
        {children}
      </Card>
    </Fragment>
  );

  return createPortal(component, container);
}
