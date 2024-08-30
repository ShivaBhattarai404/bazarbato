import Link from "next/link";
import { Fragment } from "react";

import { IoIosArrowForward } from "react-icons/io";
import styles from "./Path.module.css";

export default function Path(props) {
  const { className, paths } = props;
  // format of paths prop
  // paths={[
  //   { name: "name1", href: "#" },
  //   { name: "name2", href: "#" },
  //   { name: "name3", href: "#" },
  // ]}
  return (
    <div className={[styles.path, className].join(" ")}>
      {paths &&
        paths.length > 0 &&
        paths.map(({ name, href }, i) => (
          <Fragment key={i}>
            <Link
              className={i === paths.length - 1 ? styles.active : ""}
              href={href || "#"}
            >
              {name || `Path-${i + 1}`}
            </Link>
            {i < paths.length - 1 && <IoIosArrowForward />}
          </Fragment>
        ))}
    </div>
  );
}
