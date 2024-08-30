// react imports
import { Fragment } from "react";

// styles - CSS file
import styles from "./page.module.css";

// custom component
import CartProgressBar from "@/components/_customer/CartProgressBar/CartProgressBar";

// react icons
import { MdPayment } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { TiSortNumericallyOutline } from "react-icons/ti";
import RadioButton from "@/components/RadioButton/RadioButton";

export default function Payment() {
  return (
    <Fragment>
      <CartProgressBar
        active={4}
        labelPosition="bottom"
        className={styles.progressBar}
        steps={["Cart", "Shipping", "Review", "Payment"]}
      />

      <form className={styles.form}>
        <h1 className={styles.title}>Payments & payouts</h1>
        <RadioButton className={styles.paymentOption} name="payemnt-options">
          Cash On Delivery
        </RadioButton>
        <RadioButton
          className={styles.paymentOption}
          name="payemnt-options"
          defaultChecked
        >
          Online Payment
        </RadioButton>
        {/* input box */}
        <Fragment key="card-number">
          <div className={styles.box}>
            <div className={styles.boxIcon}>
              <MdPayment size={25} />
            </div>
            <div className={styles.boxText}>
              <div className="flex">
                <h4>Card Number</h4>
                <AiOutlineCheck size={20} />
              </div>
              <input type="text" name="fullname" />
            </div>
          </div>
        </Fragment>
        <Fragment key="card-expiry-date">
          <div className={styles.box}>
            <div className={styles.boxIcon}>
              <BsCalendarDate size={25} />
            </div>
            <div className={styles.boxText}>
              <div className="flex">
                <h4>Card Expiry</h4>
                <AiOutlineCheck size={20} />
              </div>
              <input type="text" name="fullname" />
            </div>
          </div>
        </Fragment>
        <Fragment key="card-expiry-date">
          <div className={styles.box}>
            <div className={styles.boxIcon}>
              <TiSortNumericallyOutline size={25} />
            </div>
            <div className={styles.boxText}>
              <div className="flex">
                <h4>Card CVC</h4>
                <AiOutlineCheck size={20} />
              </div>
              <input type="text" name="fullname" />
            </div>
          </div>
        </Fragment>
      </form>
    </Fragment>
  );
}
