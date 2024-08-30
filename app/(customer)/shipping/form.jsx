// core react component
import { Fragment } from "react";

// styles - CSS files
import styles from "./page.module.css";

// reaxt icons
import { AiOutlineCheck } from "react-icons/ai";
import { IoLocationOutline, IoPersonOutline } from "react-icons/io5";
import { GiModernCity } from "react-icons/gi";
import { TbNumbers } from "react-icons/tb";
import { MdOutlineWifiCalling3 } from "react-icons/md";

export default function ShippingForm() {
  return (
    <form className={styles.form}>
      <h1 className={styles.title}>Shipping summary</h1>
      {/* input box */}
      <Fragment key="fullname">
        <div className={styles.box}>
          <div className={styles.boxIcon}>
            <IoPersonOutline size={25} />
          </div>
          <div className={styles.boxText}>
            <div className="flex">
              <h4>Full Name</h4>
              <AiOutlineCheck size={20} />
            </div>
            <input type="text" name="fullname" />
          </div>
        </div>
      </Fragment>

      <Fragment key="address">
        <div className={styles.box}>
          <div className={styles.boxIcon}>
            <IoLocationOutline size={25} />
          </div>
          <div className={styles.boxText}>
            <div className="flex">
              <h4>Address</h4>
              <AiOutlineCheck size={20} />
            </div>
            <input type="text" name="address" />
          </div>
        </div>
      </Fragment>

      <Fragment key="city">
        <div className={styles.box}>
          <div className={styles.boxIcon}>
            <GiModernCity size={25} />
          </div>
          <div className={styles.boxText}>
            <div className="flex">
              <h4>City</h4>
              <AiOutlineCheck size={20} />
            </div>
            <input type="text" name="city" />
          </div>
        </div>
      </Fragment>

      <Fragment key="phoneNo">
        <div className={styles.box}>
          <div className={styles.boxIcon}>
            <MdOutlineWifiCalling3 size={25} />
          </div>
          <div className={styles.boxText}>
            <div className="flex">
              <h4>Phone Number</h4>
              <AiOutlineCheck size={20} />
            </div>
            <input type="text" name="phoneNo" />
          </div>
        </div>
      </Fragment>

      <Fragment key="alternative-phone">
        <div className={styles.box}>
          <div className={styles.boxIcon}>
            <MdOutlineWifiCalling3 size={25} />
          </div>
          <div className={styles.boxText}>
            <div className="flex">
              <h4>Alternative Phone Number</h4>
              <AiOutlineCheck size={20} />
            </div>
            <input type="text" name="alternative-phone" />
          </div>
        </div>
      </Fragment>
      
      <Fragment key="postalCode">
        <div className={styles.box}>
          <div className={styles.boxIcon}>
            <TbNumbers size={25} />
          </div>
          <div className={styles.boxText}>
            <div className="flex">
              <h4>Postal Code</h4>
              <AiOutlineCheck size={20} />
            </div>
            <input type="text" name="postalCode" />
          </div>
        </div>
      </Fragment>
    </form>
  );
}
