import ProductItem from "@/components/_customer/ProductItem/ProductItem";
import styles from "./page.module.css";
import dbConnect from "@/helpers/dbConnect";
import Product from "@/models/Product";
import { deepCopy } from "@/helpers/utils";
import Image from "next/image";
import noResultsFound from "@/public/no-results-found.png";
import SearchFilter from "./search-filter";
import Category from "@/models/Category";

async function getProducts({
  min,
  max,
  price_sort,
  query = "",
  category = "",
  alphabet_sort,
}) {
  query = query?.trim?.();
  alphabet_sort = +alphabet_sort === 2 ? -1 : 1;
  price_sort = +price_sort === 2 ? 1 : -1;
  min = isNaN(min) ? 0 : +min;
  max = isNaN(max) ? Infinity : +max;

  try {
    await dbConnect();
    if (category) {
      category = await Category.findOne({ code: category })
        .lean()
        .select("_id");
      if (!category) return [];
    }
    if (!category && query?.length === 0) return [];

    let filter = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { meta_keywords: { $regex: query, $options: "i" } },
        { meta_title: { $regex: query, $options: "i" } },
        { url_key: { $regex: query, $options: "i" } },
      ],
      price: { $gte: min, $lte: max },
    };
    if (category) {
      filter = { ...filter, category };
    }
    const products = await Product.find(filter)
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
  searchParams: {
    query = "",
    alphabet_sort,
    price_sort,
    min,
    max,
    category = "",
  },
}) {
  query = decodeURI(query)?.trim?.();
  alphabet_sort = +alphabet_sort === 2 ? 2 : 1;
  price_sort = +price_sort === 2 ? 2 : 1;
  min = isNaN(min) ? 0 : +min;
  max = isNaN(max) || max == 0 ? Infinity : +max;

  const products = await getProducts({
    min,
    max,
    query,
    price_sort,
    alphabet_sort,
    category,
  });

  const title = category
    ? `${products?.length} products of ${category}`
    : `${products?.length} results for '${query}'`;
  return (
    <section className={styles.section}>
      {products?.length > 0 && <h1 className={styles.heading}>{title}</h1>}
      <SearchFilter
        className={styles.filter}
        query={query}
        category={category}
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
            {category ? "No products found" : `No results found for '${query}'`}
          </h1>
          <Image src={noResultsFound} alt="No results found" />
        </div>
      )}
    </section>
  );
}
