"use client";
import { useState } from "react";
import Image from "next/image";

import styles from "./page.module.css";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";

const minSwipeDistance = 50;

export default function BagComponent() {
  const router = useRouter();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    // if (isLeftSwipe || isRightSwipe)
    //   console.log("swipe", isLeftSwipe ? "left" : "right");
    // add your conditional logic here
  };

  const handleCheckout = () => {
    router.push("/shipping");
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Shopping Bag</h1>
      {false && <div className={styles.fallback}>Your bag is empty</div>}
      <div className={styles.bag}>
        {new Array(3).fill(0).map((_, index) => (
          <div
            className={styles.product}
            key={index}
            // onTouchStart={onTouchStart}
            // onTouchMove={onTouchMove}
            // onTouchEnd={onTouchEnd}
          >
            <Image
              className={styles.productImage}
              src="/images/p1.png"
              alt="product"
              width={120}
              height={120}
            />
            <div className={styles.nameAndCoupon}>
              <div className={styles.productName}>
                Jeanswest LT.ORANGE Jast LT.ORst LT.ORANGE Jast LT.ORANGE Jast
                LT.ORANGE JaANGE Jast LT.ORANGE Jacket
              </div>
              <div className={styles.coupon}>Coupon: first100</div>
            </div>
            <div className={styles.productQuantity}>
              <button className={styles.quantityButton}>
                <FiMinusCircle />
              </button>
              <span>1</span>
              <button className={styles.quantityButton}>
                <FiPlusCircle />
              </button>
            </div>
            <div className={styles.priceAndRemove}>
              <div className={styles.productPrice}>Rs 230</div>
              <button className={styles.removeButton}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <h3 className={styles.summaryTitle}>Order Summary</h3>
        <ul className={styles.summaryList}>
          <li>
            <span>Subtotal Items</span>
            <span>2(units)</span>
          </li>
          <li>
            <span>Subtotal</span>
            <span>Rs 460</span>
          </li>
        </ul>
        <button className={styles.checkoutButton} onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </section>
  );
}
