import { FaArrowLeft } from "react-icons/fa6";

import Card from "@/components/Card/Card";
import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";
import DND from "@/components/DND/DND";
import RadioButton from "@/components/RadioButton/RadioButton";
import Attributes from "@/components/Attributes/Attributes";

export const metadata = {
  title: "Create a new product",
};

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.title}>
        <FaArrowLeft className={styles.backIcon} />
        <h1>Create A New Product</h1>
      </div>
      <div className={styles.wrapper}>
        <Card className={`${styles.general} ${styles.card}`}>
          <span className={styles.cardTitle}>General</span>
          <label htmlFor="new-product-name" className={formStyles.label}>
            Name
          </label>
          <input
            id="new-product-name"
            className={formStyles.input}
            type="text"
            name="name"
            placeholder="Name"
          />
          <label
            htmlFor="new-product-price"
            className={`${formStyles.label} ${styles.price}`}
          >
            Price (Rs)
          </label>
          <input
            id="new-product-price"
            className={`${formStyles.input} ${styles.price}`}
            type="number"
            name="price"
            placeholder="Price"
            step={0.01}
            min={0}
          />
          <label htmlFor="new-product-category" className={formStyles.label}>
            Category
          </label>
          <select
            id="new-product-category"
            className={formStyles.select}
            name="category"
          >
            <option value="none">None</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="child">Child</option>
          </select>

          <label htmlFor="new-product-description" className={formStyles.label}>
            Description
          </label>
          <textarea
            id="new-product-description"
            className={formStyles.textarea}
          />
        </Card>

        <Card className={`${styles.media} ${styles.card}`}>
          <span className={styles.cardTitle}>Media</span>
          <DND className={styles.imagePicker} />
          <DND className={styles.imagePicker} />
          <DND className={styles.imagePicker} />
          <DND className={styles.imagePicker} />
          <DND className={styles.imagePicker} />
        </Card>

        <Card className={`${styles.seo} ${styles.card}`}>
          <span className={styles.cardTitle}>Search Engine Optimization</span>
          <label htmlFor="new-product-url-key" className={formStyles.label}>
            Url key
          </label>
          <input
            id="new-product-url-key"
            className={formStyles.input}
            type="text"
            name="url-key"
            placeholder="products/<your-key>"
          />
          <label htmlFor="new-product-meta-title" className={formStyles.label}>
            Meta Title
          </label>
          <input
            id="new-product-meta-title"
            className={formStyles.input}
            type="text"
            name="meta-title"
            placeholder="Title"
          />
          <label
            htmlFor="new-product-meta-keywords"
            className={formStyles.label}
          >
            Meta Keywords
          </label>
          <input
            id="new-product-meta-keywords"
            className={formStyles.input}
            type="text"
            name="meta-keywords"
            placeholder="Keywords"
          />
          <label
            htmlFor="new-product-meta-description"
            className={formStyles.label}
          >
            Meta Description
          </label>
          <textarea
            id="new-product-meta-description"
            className={formStyles.textarea}
            type="text"
            name="meta-description"
            placeholder="Description"
          />
        </Card>

        <Card className={`${styles.productStatus} ${styles.card}`}>
          <span className={styles.cardTitle}>Product Status</span>
          <label className={formStyles.label}>Status</label>
          <RadioButton
            name="status"
            value="disabled"
            className={styles.radio}
            labelclassname={styles.radioText}
          >
            Disabled
          </RadioButton>
          <RadioButton
            name="status"
            value="enabled"
            defaultChecked
            className={styles.radio}
            labelclassname={styles.radioText}
          >
            Enabled
          </RadioButton>
          <hr />

          <label className={formStyles.label}>Visibility</label>
          <RadioButton
            name="visibility"
            value="not-visible"
            className={styles.radio}
            labelclassname={styles.radioText}
          >
            Not visible
          </RadioButton>
          <RadioButton
            name="visibility"
            value="visible"
            defaultChecked
            className={styles.radio}
            labelclassname={styles.radioText}
          >
            Visible
          </RadioButton>
        </Card>

        <Card className={`${styles.inventory} ${styles.card}`}>
          <span className={styles.cardTitle}>Inventory</span>
          <label className={formStyles.label}>Stock Avaibility</label>
          <RadioButton
            name="availability"
            value="no"
            className={styles.radio}
            labelclassname={styles.radioText}
          >
            No
          </RadioButton>
          <RadioButton
            name="availability"
            value="yes"
            defaultChecked
            className={styles.radio}
            labelclassname={styles.radioText}
          >
            Yes
          </RadioButton>
          <hr />
          <label htmlFor="new-product-quantity" className={formStyles.label}>
            Quantity
          </label>
          <input
            id="new-product-quantity"
            className={formStyles.input}
            type="number"
            name="quantity"
            placeholder="Quantity"
          />
        </Card>

        <Card className={`${styles.variants} ${styles.card}`}>Variants</Card>

        <Card className={`${styles.attributes} ${styles.card}`}>
          <span className={styles.cardTitle}>Attributes</span>
          <Attributes />
        </Card>

        <Card className={`${styles.footer} ${styles.card}`}>
          <button className={styles.saveButton}>Save</button>
          <button className={styles.cancelButton}>Cancel</button>
        </Card>
      </div>
    </div>
  );
}
