"use client";

import Link from "next/link";
import { useState } from "react";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { MdLabelImportant } from "react-icons/md";
import { BsBagPlusFill } from "react-icons/bs";

import Card from "@/components/Card/Card";
import styles from "./page.module.css";
import jacket from "@/public/images/products/jacket-1.jpg";
import shirt from "@/public/images/products/2.jpg";
import Image from "next/image";

const DUMMY_ATTRIBUTES = [
  {
    name: "color",
    options: ["Black", "Green", "Blue", "Red"],
  },
  {
    name: "size",
    options: ["XS", "S", "M", "L", "XL"],
  },
];
export default function PageComponent() {
  const [selectedAttribute, setSelectedAttribute] = useState({
    color: "Black",
    size: "M",
  });

  return (
    <section className={styles.section}>
      <div className={styles.productContent}>
        <div className={styles.path}>
          <Link href="#">New Arrival</Link>
          <IoIosArrowForward />
          <Link href="#">Men</Link>
          <IoIosArrowForward />
          <Link href="#">Jacket</Link>
        </div>
        <div className={styles.images}>
          <div className={styles.mainImage}>
            <Image src={jacket} alt="jacket" width={400} height={400} />
            <div className={styles.leftArrow}>
              <IoIosArrowBack />
            </div>
            <div className={styles.rightArrow}>
              <IoIosArrowForward />
            </div>
          </div>
          <Image
            src={shirt}
            alt="jacket"
            width={400}
            height={400}
            draggable={false}
          />
          <Image
            src={shirt}
            alt="jacket"
            width={400}
            height={400}
            draggable={false}
          />
          <Image
            src={shirt}
            alt="jacket"
            width={400}
            height={400}
            draggable={false}
          />
          <Image
            src={shirt}
            alt="jacket"
            width={400}
            height={400}
            draggable={false}
          />
        </div>
        <div className={styles.details}>
          <button className={styles.tag}>New Arrival</button>
          <h1 className={styles.name}>New Relaxed Fit Sweatshirt Vol. III</h1>
          <div className={styles.reviews}>
            <span className={styles.rating}>
              {new Array(Math.trunc(4)).fill("").map((_, i) => (
                <FaStar key={i} />
              ))}
              <FaStarHalf />
              <span className={styles.ratingNumber}>(4.5)</span>
            </span>
            <span className={styles.reviewCount}>623 Reviews</span>
          </div>
          <p className={styles.price}>Rs 49.99</p>
          <div className={styles.attributes}>
            {DUMMY_ATTRIBUTES.map((attribute, index) => (
              <div key={index} className={styles.attribute}>
                <p>{attribute.name}</p>
                {attribute.options.map((option, i) => (
                  <button
                    key={i}
                    className={
                      selectedAttribute[attribute.name] === option
                        ? styles.active
                        : ""
                    }
                    onClick={() =>
                      setSelectedAttribute((prevState) => {
                        const newState = {
                          ...prevState,
                          [attribute.name]: option,
                        };
                        return newState;
                      })
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.cta}>
            <button className={styles.buyNow}>
              <MdLabelImportant />
              <span>Buy Now</span>
            </button>
            <button className={styles.addToBag}>
              <BsBagPlusFill />
              <span>Add to Bag</span>
            </button>
          </div>
          <div className={styles.description}>
            <p>Description</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              ultricies, nunc ac gravida lacinia, nunc odio ultricies erat,
              vitae facilisis purus nunc nec purus. Nullam ultricies, nunc ac
              gravida lacinia, nunc odio ultricies erat, vitae facilisis purus
              nunc nec purus.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
