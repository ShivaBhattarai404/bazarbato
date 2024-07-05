import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";

import AdminPageHeading from "@/components/Utils/AdminPageHeading";
import Card from "@/components/Card/Card";
import Toggle from "@/components/Toggle/Toggle";

import CheckBox from "@/components/CheckBox/CheckBox";
import RadioButton from "@/components/RadioButton/RadioButton";

async function handleSubmit(data) {
  "use server";
  // console.log(data);
}

export default async function NewCoupon() {
  return (
    <form className={`${styles.container} homepadding`} action={handleSubmit}>
      <AdminPageHeading back="/admin/coupons" >Create A New Coupon</AdminPageHeading>
      <Card className={styles.card}>
        <span className={styles.cardTitle}>General</span>
        <label htmlFor="new-coupon-code" className={formStyles.label}>
          Coupon code
        </label>
        <input
          id="new-coupon-code"
          className={formStyles.input}
          type="text"
          name="coupon-code"
          placeholder="Enter coupon code"
        />
        <label htmlFor="new-coupon-description" className={formStyles.label}>
          Description
        </label>
        <textarea
          id="new-coupon-description"
          className={formStyles.textarea}
          type="text"
          name="coupon-code"
          placeholder="Enter description"
        />
        <label htmlFor="new-coupon-status" className={formStyles.label}>
          Status
        </label>
        <Toggle
          id="new-coupon-status"
          className={styles.statusToggle}
          name="status"
        />

        <div className={styles.amount_and_date}>
          <div>
            <label
              htmlFor="new-coupon-max-discount-amount"
              className={formStyles.label}
            >
              Maximum discount amount (Rs)
            </label>
            <input
              id="new-coupon-max-discount-amount"
              className={`${formStyles.input} ${styles.max_discount_amount}`}
              type="number"
              name="coupon-code"
              placeholder="Max discount amount"
            />
          </div>
          <div>
            <label htmlFor="new-coupon-start-date" className={formStyles.label}>
              Start date
            </label>
            <input
              id="new-coupon-start-date"
              className={`${formStyles.input} ${formStyles.date}`}
              type="date"
              name="coupon-start-date"
              min={new Date().toISOString().split("T")[0]}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label htmlFor="new-coupon-end-date" className={formStyles.label}>
              End date
            </label>
            <input
              id="new-coupon-end-date"
              className={`${formStyles.input} ${formStyles.date}`}
              type="date"
              name="coupon-start-date"
              min={new Date().toISOString().split("T")[0]}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>
        <CheckBox
          value="true"
          id="new-coupon-free-shipping"
          styles={{ fontSize: "0.9rem" }}
          name="new-coupon-free-shipping"
        >
          Free shipping?
        </CheckBox>
        <br />
        <CheckBox
          id="new-coupon-for-new-customer"
          styles={{ fontSize: "0.9rem" }}
          name="new-coupon-for-new-customer"
        >
          For new customer only?
        </CheckBox>
      </Card>

      <Card className={styles.discountCard}>
        <span className={styles.cardTitle}>Discount Type</span>
        <RadioButton
          className={styles.discountTypeOption}
          name="discount-type"
          defaultChecked
          value="6"
        >
          Fixed discount on specific products
        </RadioButton>
        <RadioButton
          className={styles.discountTypeOption}
          name="discount-type"
          value="2"
        >
          Percentage discount on specific products
        </RadioButton>
        <RadioButton
          className={styles.discountTypeOption}
          name="discount-type"
          value="3"
        >
          Fixed discount on specific categories
        </RadioButton>
        <RadioButton
          className={styles.discountTypeOption}
          name="discount-type"
          value="4"
        >
          Percentage discount on specific categories
        </RadioButton>
        {/* <RadioButton className={styles.discountTypeOption} name="discount-type" value="5" >
          Buy X get Y
        </RadioButton> */}

        <label className={`${formStyles.label} ${styles.discountValue}`}>
          Discount Amount
        </label>
        <input
          className={formStyles.input}
          type="number"
          name="discount-amount"
          placeholder="Enter amount"
          step={0.01}
          min={0}
        />
        <label className={`${formStyles.label} ${styles.discountValue}`}>
          Discount Percent (%)
        </label>
        <input
          className={formStyles.input}
          type="number"
          name="discount-percent"
          placeholder="Enter discount percentage"
          step={0.01}
          min={0}
        />
        <label className={`${formStyles.label} ${styles.discountValue}`}>
          Product ID
        </label>
        <input
          className={formStyles.input}
          type="text"
          name="discount-amount"
          placeholder="Enter product ID"
        />
      </Card>

      <Card className={styles.card}>
        <span className={styles.cardTitle}>Order Conditions</span>
        <label className={formStyles.label}>Minimum order amount (Rs)</label>
        <input
          className={formStyles.input}
          type="number"
          name="min-order-amount"
          placeholder="Enter amount"
          step={0.01}
          min={0}
          defaultValue={0}
        />
        <label className={formStyles.label}>Minimum order quantity</label>
        <input
          className={formStyles.input}
          type="number"
          name="min-order-quantity"
          placeholder="Enter quantity"
          min={0}
          defaultValue={0}
        />
      </Card>

      <Card className={`${styles.footer} ${styles.card}`}>
        <button className={styles.saveButton} type="submit">
          Save
        </button>
        <button className={styles.cancelButton} type="reset">
          Reset
        </button>
      </Card>
    </form>
  );
}
