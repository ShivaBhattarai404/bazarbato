import Link from "next/link";

import { FaStar, FaStarHalf } from "react-icons/fa";

import styles from "./ProductItem.module.css";
import shoes from "@/public/images/products/1.jpg";
import Image from "next/image";

export default function ProductItem({className, ...rest}) {
  return (
    <div className={[styles.product, className].join(" ")}>
      <Link href="/product/shoe">
        <Image src={shoes} alt="shoes" width={250} height={250} />
        <p className={styles.category_name}>Clothes</p>
        <p className={styles.name}>Relaxed short full sleeves</p>
        <div className={styles.rating}>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <span className={styles.price}>
          <b>Rs 450</b>
          <del>Rs 1200</del>
        </span>
      </Link>
    </div>
  );
}
