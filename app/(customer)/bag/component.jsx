"use client";

// core module imports
import Link from "next/link";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

// reducer actions
import { addOrder } from "@/app/reducers/order";

// react icons
import { ImSpinner2, ImSpinner9 } from "react-icons/im";

// styles CSS module
import styles from "./page.module.css";

// components
import Quantity from "@/components/_customer/Quantity/Quantity";
import { IoWalletSharp } from "react-icons/io5";
import { LiaTimesCircleSolid } from "react-icons/lia";

export default function BagComponent({
  bag: initialBag,
  removeFromBag,
  changeItemQuantity,
  applyCoupon,
}) {
  const router = useRouter();
  const [bag, setBag] = useState(initialBag);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = () => {
    dispatch(addOrder(bag));
    router.push("/shipping");
  };

  const itemRemoveHandler = async (itemId) => {
    const response = await removeFromBag(itemId);
  };

  const itemQuantityChangeHandler = async (item, option) => {
    if (loading || (item.quantity == 1 && option === "DECREMENT")) return;
    setLoading(true);
    try {
      const { error, updatedBag } = await changeItemQuantity(item._id, option);
      if (error) {
        setError(error);
      } else {
        setBag(updatedBag);
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // this function will be used to apply coupon to the bag and update the total
  const applyCouponToBag = async (e) => {
    // apply coupon to cart
    e.preventDefault();
    const couponCode = e.target.couponCode.value.toUpperCase();
    if (!couponCode) return;
    setCouponLoading(true);
    try {
      const { error, updatedBag } = await applyCoupon(couponCode);
      if (error) {
        setError(error);
      } else {
        setBag(updatedBag);
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCouponFromBag = async () => {
    setCouponLoading(true);
    try {
      const { error, updatedBag } = await applyCoupon(null);
      if (error) {
        setError(error);
      } else {
        setBag(updatedBag);
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setCouponLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Shopping Bag</h1>
      {!bag && <div className={styles.fallback}>Your bag is empty</div>}
      {bag && (
        <Fragment>
          <div className={styles.bag}>
            {bag.items.map((item) => (
              <div className={styles.product} key={item._id}>
                <Link href={`/product/${item.url_key}`}>
                  <Image
                    className={styles.productImage}
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={120}
                  />
                </Link>
                <div className={styles.nameAndCoupon}>
                  <Link
                    href={`/product/${item.url_key}`}
                    className={styles.productName}
                  >
                    {item.name}
                  </Link>
                  {item.coupon && (
                    <div className={styles.coupon}>
                      Coupon: {item.coupon}{" "}
                      <span className={styles.saved}>
                        (-Rs {item.discountAmount})
                      </span>
                    </div>
                  )}
                </div>
                <Quantity
                  loading={loading}
                  LoadingComponent={QuantityLoadingSpinner}
                  quantity={item.quantity}
                  onIncrement={itemQuantityChangeHandler.bind(
                    null,
                    item,
                    "INCREMENT"
                  )}
                  onDecrement={itemQuantityChangeHandler.bind(
                    null,
                    item,
                    "DECREMENT"
                  )}
                />
                <div className={styles.priceAndRemove}>
                  <div className={styles.productPrice}>Rs {item.total}</div>
                  <button
                    className={styles.removeButton}
                    onClick={() => itemRemoveHandler(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.summary}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>
            <ul className={styles.summaryList}>
              <li>
                <span>Subtotal Items</span>
                <span>{bag.totalItems}(units)</span>
              </li>
              <li>
                <span>Subtotal</span>
                <span>Rs {bag.total}</span>
              </li>
              {bag.coupon && (
                <Fragment>
                  <li>
                    <span>Discount</span>
                    <span>-Rs {bag.discountAmount}</span>
                  </li>
                  <li>
                    <span>Gross Total</span>
                    <span>Rs {bag.grossTotal}</span>
                  </li>
                </Fragment>
              )}
            </ul>

            {couponLoading ? (
              <div className={styles.spinnerContainer}>
                <ImSpinner9 className={styles.spinner} />
              </div>
            ) : bag?.coupon ? (
              <div className={styles.couponApplied}>
                <IoWalletSharp size={22} className={styles.wallet} />
                <p>YAY! You saved Rs {bag.discountAmount}</p>
                <p>{bag.coupon} Coupon Applied</p>
                <LiaTimesCircleSolid
                  size={20}
                  className={styles.cross}
                  onClick={removeCouponFromBag}
                />
              </div>
            ) : (
              <form
                onSubmit={applyCouponToBag}
                className={styles.discountCoupon}
              >
                <input
                  type="text"
                  name="couponCode"
                  placeholder="Have a coupon code?"
                />
                <button>Apply</button>
              </form>
            )}
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </Fragment>
      )}
    </section>
  );
}

function QuantityLoadingSpinner() {
  return (
    <div>
      <ImSpinner2 className={styles.spinner} />
    </div>
  );
}
