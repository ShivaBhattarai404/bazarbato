import ProductItem from "@/components/_customer/ProductItem/ProductItem";
import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";
import { Fragment } from "react";
import { FaUpLong } from "react-icons/fa6";

export default function Search({ searchParams: { query } }) {
  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>14 results for &apos;{query}&apos;</h1>

      <div className={styles.filter}>
        <h2 className={styles.title}>Filter By</h2>
        <Fragment>
          <label className={formStyles.label} htmlFor="sort">
            Date
          </label>
          <select className={formStyles.select} name="sort" id="sort">
            <option value="relevance">Relevance</option>
            <option value="date">Newest</option>
            <option value="date">Oldest</option>
          </select>
        </Fragment>
        <Fragment>
          <label className={formStyles.label} htmlFor="sort">
            Price
          </label>
          <select className={formStyles.select} name="sort" id="sort">
            <option value="relevance">Relevance</option>
            <option value="date">Highest to Lowest</option>
            <option value="date">Lowest to Highest</option>
          </select>
        </Fragment>
        <label className={formStyles.label} htmlFor="price-range">
          Price range
        </label>
        <input
          type="range"
          id="price-range"
          className={styles.range}
          name="price-range"
          min="0"
          max="100"
        />
      </div>
      <div className={styles.results}>
        {Array.from({ length: 14 }).map((_, i) => (
          <ProductItem key={i} />
        ))}
      </div>
    </section>
  );
}
