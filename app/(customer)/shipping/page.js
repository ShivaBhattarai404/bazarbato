"use client";

// page related components
import CartProgressBar from "@/components/_customer/CartProgressBar/CartProgressBar";
import ShippingForm from "./form";

// page styles - CSS file
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineCheck } from "react-icons/ai";

export default function ShippingPage() {
  const router = useRouter();

  const continueHandler = () => {
    router.push("/order-review");
  };

  return (
    <section className={styles.section}>
      <CartProgressBar
        active={2}
        labelPosition="bottom"
        className={styles.progressBar}
        steps={["Cart", "Shipping", "Review", "Payment"]}
      />
      <hr />

      <div className={styles.container}>
        <ShippingForm />

        <div className={styles.summary}>
          <form
            style={{ marginBottom: "1rem" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className={styles.title}>Order Note</h3>
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <IoPersonOutline size={25} />
              </div>
              <div className={styles.boxText}>
                <div className="flex">
                  <h4>Leave a note (optional)</h4>
                  <AiOutlineCheck size={20} />
                </div>
                <input type="text" name="customer-note" />
              </div>
            </div>
          </form>
          <h3 className={styles.title}>Order Summary</h3>
          <ul className={styles.summaryList}>
            <li>
              <span>Subtotal</span>
              <span>Rs 460</span>
            </li>
            <li>
              <span>Delivery charge</span>
              <span>Rs 50</span>
            </li>
            <li>
              <span>Gross amount (including tax)</span>
              <span>Rs 510</span>
            </li>
          </ul>
          <button className={styles.continueBtn} onClick={continueHandler}>
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}
