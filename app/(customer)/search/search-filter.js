"use client";
import { Fragment } from "react";
import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";
import { useRouter } from "next/navigation";

export default function SearchFilter({
  query,
  alphabet_sort,
  price_sort,
  min,
  max,
  ...rest
}) {
  const router = useRouter();

  const onFilter = (e) => {
    e.preventDefault();
    console.log("onFilter");
    const formData = new FormData(e.target);
    const query = formData.get("query");
    const alphabet_sort = formData.get("alphabet_sort");
    const price_sort = formData.get("price_sort");
    const min = formData.get("min");
    const max = formData.get("max");
    router.push(
      `/search?query=${query}&alphabet_sort=${alphabet_sort}&price_sort=${price_sort}&min=${min}&max=${max}`
    );
  };
  return (
    <form className={styles.filterComponent} onSubmit={onFilter} {...rest}>
      <h2 className={styles.title}>Filter By</h2>
      <input type="hidden" name="query" value={query} />
      <Fragment>
        <label className={formStyles.label} htmlFor="sort">
          Name
        </label>
        <select
          className={formStyles.select}
          name="alphabet_sort"
          id="sort"
          defaultValue={alphabet_sort}
        >
          <option value="1">a-z</option>
          <option value="2">z-a</option>
        </select>
      </Fragment>
      <Fragment>
        <label className={formStyles.label} htmlFor="sort">
          Price
        </label>
        <select
          className={formStyles.select}
          name="price_sort"
          id="sort"
          defaultValue={price_sort}
        >
          <option value="1">Highest to Lowest</option>
          <option value="2">Lowest to Highest</option>
        </select>
      </Fragment>
      <label className={formStyles.label} htmlFor="price-range">
        Minimum Price
      </label>
      <input
        className={formStyles.input}
        type="text"
        name="min"
        defaultValue={min}
      />
      <label className={formStyles.label} htmlFor="price-range">
        Maximum Price
      </label>
      <input
        className={formStyles.input}
        type="text"
        name="max"
        defaultValue={max}
      />
      <button className={styles.applyFilterBtn}>Apply</button>
    </form>
  );
}
