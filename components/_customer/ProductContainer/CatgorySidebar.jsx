"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./CatgeorySidebar.module.css";
import { LuPlus, LuMinus } from "react-icons/lu";
import { FaStar, FaStarHalf } from "react-icons/fa";

export default function CategorySidebar({
  className,
  bestSellerProducts,
  featuredCategories,
}) {
  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleCategoryClick = (value) => {
    if (selectedCategory.includes(value)) {
      setSelectedCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSelectedCategory((prev) => [...prev, value]);
    }
  };

  const isCatorySelected = (category) => selectedCategory.includes(category);
  return (
    <div className={[styles.sidebar, className].join(" ")}>
      {/* CATEGORY DROPDOWN */}
      <div className={styles.category}>
        <div className={styles.category_title}>category</div>
        <ul className={styles.category_list}>
          {featuredCategories?.map((category) => (
            <li className={styles.category_item} key={category._id}>
              <div onClick={() => handleCategoryClick(category._id)}>
                <Image
                  src={category.banner}
                  className={styles.category_item_img}
                  alt={category.name}
                  width={18}
                  height={18}
                />
                <span className={styles.category_item_name}>
                  {category.name}
                </span>
                {isCatorySelected(category._id) ? (
                  <LuMinus className={styles.category_item_plus} />
                ) : (
                  <LuPlus className={styles.category_item_plus} />
                )}
              </div>
              <ul
                className={`${styles.subcategory} ${
                  isCatorySelected(category._id) ? styles.active : ""
                }`}
              >
                {category.subCategories?.map((subcategory) => (
                  <li key={subcategory._id} className={styles.subcategory_item}>
                    <Link href={`/search?category=${subcategory.code}`}>
                      <span>{subcategory.name}</span>
                      <span>{subcategory.productCount}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* BEST SELLERS */}
      <div className={styles.best_sellers}>
        <h1 className={styles.best_sellers_title}>Best Sellers</h1>
        <ul className={styles.best_sellers_products}>
          {bestSellerProducts?.map((product) => (
            <li className={styles.best_sellers_product} key={product._id}>
              <Link href={`/product/${product.url_key}`}>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={75}
                  height={75}
                />
                <p className={styles.product_name}>{product.name}</p>
              </Link>
              <div className={styles.product_rating}>
                {new Array(Math.trunc(product.rating)).fill("").map((_, i) => (
                  <FaStar key={i} />
                ))}
                {/* {product.rating % 1 !== 0 && <FaStarHalf />} */}
              </div>
              <div className={styles.product_price}>
                <del>Rs {product.price}</del>
                <b>Rs {product.mrp}</b>
              </div>
              <div />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
