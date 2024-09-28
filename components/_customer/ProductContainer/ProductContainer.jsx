"use client";
import Link from "next/link";
import Image from "next/image";

import styles from "./ProductContainer.module.css";
import { FaStar, FaStarHalf } from "react-icons/fa";

import shoes from "@/public/images/products/1.jpg";
import cloth1 from "@/public/images/products/clothes-1.jpg";
import ProductItem from "../ProductItem/ProductItem";
import CategorySidebar from "./CatgorySidebar";

const DUMMY_NEW_ARRIVALS = [
  {
    name: "Relaxed short full sleeves",
    image: cloth1,
    category: "Clothes",
    price: { before: 1200, after: 450 },
  },
  {
    name: "Relaxed short full sleeves",
    image: cloth1,
    category: "Clothes",
    price: { before: 1200, after: 450 },
  },
  {
    name: "Relaxed short full sleeves",
    image: cloth1,
    category: "Clothes",
    price: { before: 1200, after: 450 },
  },
  {
    name: "Relaxed short full sleeves",
    image: cloth1,
    category: "Clothes",
    price: { before: 1200, after: 450 },
  },
];

export default function ProductContainer({ products }) {
  return (
    <div className={styles.product_container}>
      <CategorySidebar className={styles.sidebar} />
      {/* NEW ARRIVAL PRODUCT LIST */}
      <div className={styles.product_showcase}>
        <h2 className={styles.showcase_title}>New Arrivals</h2>
        <ul className={styles.showcase_products}>
          {DUMMY_NEW_ARRIVALS.map((product, index) => (
            <li key={index} className={styles.showcase_product}>
              <Link href="/product/shoe">
                <Image src={cloth1} alt="shoes" width={70} height={70} />
                <p className={styles.name}>{product.name}</p>
              </Link>
              <Link href="/product/shoe">
                <p className={styles.category_name}>{product.category}</p>
              </Link>
              <span className={styles.price}>
                <b>Rs {product.price.after}</b>
                <del>Rs {product.price.before}</del>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* TRENDING PRODUCT LIST */}
      <div className={styles.product_showcase}>
        <h2 className={styles.showcase_title}>Trending</h2>
        <ul className={styles.showcase_products}>
          {DUMMY_NEW_ARRIVALS.map((product, index) => (
            <li key={index} className={styles.showcase_product}>
              <Link href="/product/shoe">
                <Image src={cloth1} alt="shoes" width={70} height={70} />
                <p className={styles.name}>{product.name}</p>
              </Link>
              <Link href="/product/shoe">
                <p className={styles.category_name}>{product.category}</p>
              </Link>
              <span className={styles.price}>
                <b>Rs {product.price.after}</b>
                <del>Rs {product.price.before}</del>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* TOP RATED PRODUCT LIST */}
      <div className={styles.product_showcase}>
        <h2 className={styles.showcase_title}>Top rated</h2>
        <ul className={styles.showcase_products}>
          {DUMMY_NEW_ARRIVALS.map((product, index) => (
            <li key={index} className={styles.showcase_product}>
              <Link href="/product/shoe">
                <Image src={cloth1} alt="shoes" width={70} height={70} />
                <p className={styles.name}>{product.name}</p>
              </Link>
              <Link href="/product/shoe">
                <p className={styles.category_name}>{product.category}</p>
              </Link>
              <span className={styles.price}>
                <b>Rs {product.price.after}</b>
                <del>Rs {product.price.before}</del>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* DEAL OF THE DAY */}
      <div className={styles.deal_of_the_day}>
        <h2 className={styles.title}>Deal of the Day</h2>
        <div className={styles.product}>
          <Link href="/product/shoe">
            <Image
              className={styles.image}
              alt="shoes"
              src={shoes}
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
            <Link href="/product/shoe">
              <h3 className={styles.name}>
                SHAMPOO, CONDITIONER & FACEWASH PACKS
              </h3>
            </Link>
            <p className={styles.description}>
              Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit
              amet consectetur Lorem ipsum dolor
            </p>
            <span className={styles.price}>
              <b>Rs 1500</b>
              <del>Rs 2000</del>
            </span>
            <button className={styles.cta}>Add to Cart</button>
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
