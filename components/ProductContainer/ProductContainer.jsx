"use client";

import { useState } from "react";
import Link from "next/link";

import Image from "next/image";
import styles from "./ProductContainer.module.css";
import { LuPlus, LuMinus } from "react-icons/lu";
import { FaStar, FaStarHalf } from "react-icons/fa";

import dress from "@/public/images/icons/dress.svg";
import footwear from "@/public/images/icons/shoes.svg";
import jewelry from "@/public/images/icons/jewelry.svg";
import perfume from "@/public/images/icons/perfume.svg";
import cosmetics from "@/public/images/icons/cosmetics.svg";
import glasses from "@/public/images/icons/glasses.svg";
import bag from "@/public/images/icons/bag.svg";

import shoes from "@/public/images/products/1.jpg";
import hoodie from "@/public/images/products/2.jpg";
import tshirt from "@/public/images/products/3.jpg";
import hat from "@/public/images/products/4.jpg";

import cloth1 from "@/public/images/products/clothes-1.jpg";

const DUMMY_CATEGORIES = [
  {
    name: "Clothes",
    banner: dress,
    subcategories: [
      { name: "Shirts", qty: 300 },
      { name: "Jeans", qty: 200 },
      { name: "Jackets", qty: 100 },
      { name: "Track Suit", qty: 50 },
      { name: "Trousers", qty: 50 },
    ],
  },
  {
    name: "Footwear",
    banner: footwear,
    subcategories: [
      { name: "Sneakers", qty: 300 },
      { name: "Boots", qty: 200 },
      { name: "Sandals", qty: 100 },
      { name: "Loafers", qty: 50 },
      { name: "Slippers", qty: 50 },
    ],
  },
  {
    name: "Jewelry",
    banner: jewelry,
    subcategories: [
      { name: "Rings", qty: 300 },
      { name: "Necklaces", qty: 200 },
      { name: "Bracelets", qty: 100 },
      { name: "Earrings", qty: 50 },
      { name: "Pendants", qty: 50 },
    ],
  },
  {
    name: "Perfume",
    banner: perfume,
    subcategories: [
      { name: "Clothes Perfume", qty: 300 },
      { name: "Body Perfume", qty: 200 },
      { name: "Hair Perfume", qty: 100 },
      { name: "Car Perfume", qty: 50 },
      { name: "Room Perfume", qty: 50 },
    ],
  },
  {
    name: "Cosmetics",
    banner: cosmetics,
    subcategories: [
      { name: "Lipsticks", qty: 300 },
      { name: "Eyeliners", qty: 200 },
      { name: "Foundations", qty: 100 },
      { name: "Mascara", qty: 50 },
      { name: "Blushes", qty: 50 },
    ],
  },
  {
    name: "Glasses",
    banner: glasses,
    subcategories: [
      { name: "Sunglasses", qty: 300 },
      { name: "Reading Glasses", qty: 200 },
      { name: "Prescription Glasses", qty: 100 },
      { name: "Computer Glasses", qty: 50 },
      { name: "Safety Glasses", qty: 50 },
    ],
  },
  {
    name: "Bags",
    banner: bag,
    subcategories: [
      { name: "Handbags", qty: 300 },
      { name: "Backpacks", qty: 200 },
      { name: "Shoulder Bags", qty: 100 },
      { name: "Tote Bags", qty: 50 },
      { name: "Clutches", qty: 50 },
    ],
  },
];

const DUMMY_BEST_SALES = [
  {
    name: "Baby Fabric Shoes",
    image: shoes,
    rating: 5,
    price: { before: 500, after: 400 },
  },
  {
    name: "Men's Hoodies T-Shirt",
    image: hoodie,
    rating: 4.5,
    price: { before: 1700, after: 700 },
  },
  {
    name: "Girls T-Shirt",
    image: tshirt,
    rating: 4,
    price: { before: 500, after: 300 },
  },
  {
    name: "Woolen Hat For Men",
    image: hat,
    rating: 2,
    price: { before: 1500, after: 1200 },
  },
];

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

export default function ProductContainer() {
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
    <div className={styles.product_container}>
      <div className={styles.sidebar}>
        {/* CATEGORY DROPDOWN */}
        <div className={styles.category}>
          <div className={styles.category_title}>category</div>
          <ul className={styles.category_list}>
            {DUMMY_CATEGORIES.map((category, index) => (
              <li className={styles.category_item} key={index}>
                <div onClick={() => handleCategoryClick(category.name)}>
                  <Image
                    src={category.banner}
                    className={styles.category_item_img}
                    alt="dress"
                    width={18}
                    height={18}
                  />
                  <span className={styles.category_item_name}>
                    {category.name}
                  </span>
                  {isCatorySelected(category.name) ? (
                    <LuMinus className={styles.category_item_plus} />
                  ) : (
                    <LuPlus className={styles.category_item_plus} />
                  )}
                </div>
                <ul
                  className={`${styles.subcategory} ${
                    isCatorySelected(category.name) ? styles.active : ""
                  }`}
                >
                  {category.subcategories.map((subcategory, index) => (
                    <li className={styles.subcategory_item} key={index}>
                      <span>{subcategory.name}</span>
                      <span>{subcategory.qty}</span>
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
            {DUMMY_BEST_SALES.map((product, index) => (
              <li className={styles.best_sellers_product} key={index}>
                <Link href="#">
                  <Image
                    src={product.image}
                    alt="shoes"
                    width={75}
                    height={75}
                  />
                  <p className={styles.product_name}>{product.name}</p>
                </Link>
                <div className={styles.product_rating}>
                  {new Array(Math.trunc(product.rating))
                    .fill("")
                    .map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  {product.rating % 1 !== 0 && <FaStarHalf />}
                </div>
                <div className={styles.product_price}>
                  <del>Rs {product.price.before}</del>
                  <b>Rs {product.price.after}</b>
                </div>
                <div />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* NEW ARRIVAL PRODUCT LIST */}
      <div className={styles.product_showcase}>
        <h2 className={styles.showcase_title}>New Arrivals</h2>
        <ul className={styles.showcase_products}>
          {DUMMY_NEW_ARRIVALS.map((product, index) => (
            <li key={index} className={styles.showcase_product}>
              <Link href="#">
                <Image src={cloth1} alt="shoes" width={70} height={70} />
                <p className={styles.name}>{product.name}</p>
              </Link>
              <Link href="#">
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
              <Link href="#">
                <Image src={cloth1} alt="shoes" width={70} height={70} />
                <p className={styles.name}>{product.name}</p>
              </Link>
              <Link href="#">
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
              <Link href="#">
                <Image src={cloth1} alt="shoes" width={70} height={70} />
                <p className={styles.name}>{product.name}</p>
              </Link>
              <Link href="#">
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
          <Link href="#">
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
            <Link href="#">
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
          {new Array(24).fill("").map((_, index) => (
            <div key={index} className={styles.product}>
              <Link href="#">
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
          ))}
        </div>
      </div>
    </div>
  );
}
