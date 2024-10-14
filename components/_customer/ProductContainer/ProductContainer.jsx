"use client";
import Link from "next/link";
import Image from "next/image";

import styles from "./ProductContainer.module.css";
import { FaStar, FaStarHalf } from "react-icons/fa";

import ProductItem from "../ProductItem/ProductItem";
import CategorySidebar from "./CatgorySidebar";

export default function ProductContainer({
  products,
  bestSellerProducts,
  featuredCategories,
  dealOfTheDay,
}) {
  return (
    <div className={styles.product_container}>
      <CategorySidebar
        className={styles.sidebar}
        featuredCategories={featuredCategories}
        bestSellerProducts={bestSellerProducts}
      />
      {/* NEW ARRIVAL PRODUCT LIST */}
      <div className={styles.product_showcase}>
        <h2 className={styles.showcase_title}>New Arrivals</h2>
        <ul className={styles.showcase_products}>
          {products.slice(0, 4).map((product) => (
            <li key={product._id} className={styles.showcase_product}>
              <Link href={product.url_key}>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={70}
                  height={70}
                />
                <p className={styles.name}>{product.name}</p>
              </Link>
              <Link href={`/search?category=${product.category.code}`}>
                <p className={styles.category_name}>{product.category.name}</p>
              </Link>
              <span className={styles.price}>
                <b>Rs {product.price}</b>
                <del>Rs {product.price * 1.46}</del>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* TRENDING PRODUCT LIST */}
      <div className={styles.product_showcase}>
        <h2 className={styles.showcase_title}>Trending</h2>
        <ul className={styles.showcase_products}>
          {products.slice(4, 8).map((product) => (
            <li key={product._id} className={styles.showcase_product}>
              <Link href={product.url_key}>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={70}
                  height={70}
                />
                <p className={styles.name}>{product.name}</p>
              </Link>
              <Link href={`/search?category=${product.category.code}`}>
                <p className={styles.category_name}>{product.category.name}</p>
              </Link>
              <span className={styles.price}>
                <b>Rs {product.price}</b>
                <del>Rs {product.price * 1.46}</del>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* TOP RATED PRODUCT LIST */}
      <div className={styles.product_showcase}>
        <h2 className={styles.showcase_title}>Top rated</h2>
        <ul className={styles.showcase_products}>
          {products.slice(8, 12).map((product) => (
            <li key={product._id} className={styles.showcase_product}>
              <Link href={product.url_key}>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={70}
                  height={70}
                />
                <p className={styles.name}>{product.name}</p>
              </Link>
              <Link href={`/search?category=${product.category.code}`}>
                <p className={styles.category_name}>{product.category.name}</p>
              </Link>
              <span className={styles.price}>
                <b>Rs {product.price}</b>
                <del>Rs {Math.floor(product.price * 1.46)}</del>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* DEAL OF THE DAY */}
      <div className={styles.deal_of_the_day}>
        <h2 className={styles.title}>Deal of the Day</h2>
        <div className={styles.product}>
          <Link href={"/product/" + dealOfTheDay.url_key}>
            <Image
              className={styles.image}
              alt="shoes"
              src={dealOfTheDay.images[0]}
              width={400}
              height={400}
            />
          </Link>
          <div className={styles.product_info}>
            <div className={styles.rating}>
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <Link href={"/product/" + dealOfTheDay.url_key}>
              <h3 className={styles.name}>{dealOfTheDay.name}</h3>
            </Link>
            <p className={styles.description}>{dealOfTheDay.description}</p>
            <span className={styles.price}>
              <b>Rs {dealOfTheDay.price}</b>
              <del>Rs {Math.floor(dealOfTheDay.price * 1.46)}</del>
            </span>
            <Link href={"/product/" + dealOfTheDay.url_key}>
              <button className={styles.cta}>go to product</button>
            </Link>
            <div className={styles.item_sold}>
              <div className={styles.item_count}>
                <span>
                  Already Sold: <b>16</b>
                </span>
                <span>
                  Available: <b>40</b>
                </span>
              </div>
              <div className={styles.progress} />
            </div>
            <div className={styles.timer}>
              <p className={styles.timer_title}>HURRY UP! OFFER ENDS IN:</p>
              <span className={styles.timer_box}>
                <b>360</b>days
              </span>
              <span className={styles.timer_box}>
                <b>24</b>hours
              </span>
              <span className={styles.timer_box}>
                <b>59</b>min
              </span>
              <span className={styles.timer_box}>
                <b>00</b>sec
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RECOMMENDED PRODUCTS */}
      <div className={styles.recommended_products}>
        <h2 className={styles.title}>Suggested For you</h2>
        <div className={styles.product_wrapper}>
          {products.length > 0 &&
            products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
