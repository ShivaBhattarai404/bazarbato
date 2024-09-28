import ProductItem from "@/components/_customer/ProductItem/ProductItem";
import styles from "./page.module.css";
import dbConnect from "@/helpers/dbConnect";
import Product from "@/models/Product";
import { deepCopy } from "@/helpers/utils";
import Image from "next/image";
import noResultsFound from "@/public/no-results-found.png";
import SearchFilter from "./search-filter";

async function getProducts(query = "", alphabet_sort, price_sort, min, max) {
  query = query.trim();
  if (query.length === 0) return [];
  alphabet_sort = +alphabet_sort === 2 ? -1 : 1;
  price_sort = +price_sort === 2 ? 1 : -1;
  min = isNaN(min) ? 0 : +min;
  max = isNaN(max) ? Infinity : +max;

  try {
    await dbConnect();

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { meta_keywords: { $regex: query, $options: "i" } },
        { meta_title: { $regex: query, $options: "i" } },
        { url_key: { $regex: query, $options: "i" } },
      ],
      price: { $gte: min, $lte: max },
    })
      .sort({ name: alphabet_sort, price: price_sort })
      .populate("category", "name")
      .select("name price images category url_key rating")
      .limit(6)
      .lean();

    return deepCopy(products);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Search({
  searchParams: { query, alphabet_sort, price_sort, min, max },
}) {
  query = query.trim();
  alphabet_sort = +alphabet_sort === 2 ? 2 : 1;
  price_sort = +price_sort === 2 ? 2 : 1;
  min = isNaN(min) ? 0 : +min;
  max = isNaN(max) || max == 0 ? Infinity : +max;

  const products = await getProducts(
    query,
    alphabet_sort,
    price_sort,
    min,
    max
  );

  return (
    <section className={styles.section}>
      {products?.length > 0 && (
        <h1 className={styles.heading}>
          {products?.length} results for &apos;{query}&apos;
        </h1>
      )}
      <SearchFilter
        className={styles.filter}
        query={query}
        alphabet_sort={alphabet_sort}
        price_sort={price_sort}
        min={min}
        max={max}
      />
      {products?.length > 0 ? (
        <div className={styles.results}>
          {products.map((product) => (
            <ProductItem
              key={product._id}
              className={styles.product}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <h1 className={styles.heading}>
            No results found for &apos;{query}&apos;
          </h1>
          <Image src={noResultsFound} alt="No results found" />
        </div>
      )}
    </section>
  );
}
