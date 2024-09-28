"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./CatgeorySidebar.module.css";
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

export default function CategorySidebar({ className, ...rest }) {
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
    <div {...rest} className={[styles.sidebar, className].join(" ")}>
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
              <Link href="/product/shoe">
                <Image src={product.image} alt="shoes" width={75} height={75} />
                <p className={styles.product_name}>{product.name}</p>
              </Link>
              <div className={styles.product_rating}>
                {new Array(Math.trunc(product.rating)).fill("").map((_, i) => (
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
  );
}
