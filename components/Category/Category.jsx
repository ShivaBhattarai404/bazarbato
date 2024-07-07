import Link from "next/link";
import styles from "./Category.module.css";
// import "./Category.css";

export default function Category() {
  return (
    <div className={`${styles.category} has-scrollbar`}>
      <div className={styles.category_item}>
        <div className={styles.category_img_box}>
          <img src="./images/icons/dress.svg" alt="dress & frock" width="30" />
        </div>
        <div className={styles.category_content_box}>
          <div className={styles.category_content_flex}>
            <h3 className={styles.category_item_title}>Dress & frock</h3>
            <p className={styles.category_item_amount}>(53)</p>
          </div>
          <Link href="#" className={styles.category_btn}>
            Show all
          </Link>
        </div>
      </div>

      <div className={styles.category_item}>
        <div className={styles.category_img_box}>
          <img src="./images/icons/coat.svg" alt="winter wear" width="30" />
        </div>
        <div className={styles.category_content_box}>
          <div className={styles.category_content_flex}>
            <h3 className={styles.category_item_title}>Winter wear</h3>
            <p className={styles.category_item_amount}>(58)</p>
          </div>
          <Link href="#" className={styles.category_btn}>
            Show all
          </Link>
        </div>
      </div>

      <div className={styles.category_item}>
        <div className={styles.category_img_box}>
          <img
            src="./images/icons/glasses.svg"
            alt="glasses & lens"
            width="30"
          />
        </div>
        <div className={styles.category_content_box}>
          <div className={styles.category_content_flex}>
            <h3 className={styles.category_item_title}>Glasses & lens</h3>
            <p className={styles.category_item_amount}>(68)</p>
          </div>
          <Link href="#" className={styles.category_btn}>
            Show all
          </Link>
        </div>
      </div>

      <div className={styles.category_item}>
        <div className={styles.category_img_box}>
          <img
            src="./images/icons/shorts.svg"
            alt="shorts & jeans"
            width="30"
          />
        </div>
        <div className={styles.category_content_box}>
          <div className={styles.category_content_flex}>
            <h3 className={styles.category_item_title}>Shorts & jeans</h3>
            <p className={styles.category_item_amount}>(84)</p>
          </div>
          <Link href="#" className={styles.category_btn}>
            Show all
          </Link>
        </div>
      </div>

      <div className={styles.category_item}>
        <div className={styles.category_img_box}>
          <img src="./images/icons/tee.svg" alt="t-shirts" width="30" />
        </div>
        <div className={styles.category_content_box}>
          <div className={styles.category_content_flex}>
            <h3 className={styles.category_item_title}>T-shirts</h3>
            <p className={styles.category_item_amount}>(35)</p>
          </div>
          <Link href="#" className={styles.category_btn}>
            Show all
          </Link>
        </div>
      </div>

      <div className={styles.category_item}>
        <div className={styles.category_img_box}>
          <img src="./images/icons/jacket.svg" alt="jacket" width="30" />
        </div>
        <div className={styles.category_content_box}>
          <div className={styles.category_content_flex}>
            <h3 className={styles.category_item_title}>Jacket</h3>
            <p className={styles.category_item_amount}>(16)</p>
          </div>
          <Link href="#" className={styles.category_btn}>
            Show all
          </Link>
        </div>
      </div>

      <div className={styles.category_item}>
        <div className={styles.category_img_box}>
          <img src="./images/icons/watch.svg" alt="watch" width="30" />
        </div>
        <div className={styles.category_content_box}>
          <div className={styles.category_content_flex}>
            <h3 className={styles.category_item_title}>Watch</h3>
            <p className={styles.category_item_amount}>(27)</p>
          </div>
          <Link href="#" className={styles.category_btn}>
            Show all
          </Link>
        </div>
      </div>

      <div className={styles.category_item}>
        <div className={styles.category_img_box}>
          <img src="./images/icons/hat.svg" alt="hat & caps" width="30" />
        </div>
        <div className={styles.category_content_box}>
          <div className={styles.category_content_flex}>
            <h3 className={styles.category_item_title}>Hat & caps</h3>
            <p className={styles.category_item_amount}>(39)</p>
          </div>
          <Link href="#" className={styles.category_btn}>
            Show all
          </Link>
        </div>
      </div>
    </div>
  );
}
