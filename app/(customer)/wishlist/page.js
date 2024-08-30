import ProductItem from "@/components/_customer/ProductItem/ProductItem";
import styles from "./page.module.css";
import Path from "@/components/_customer/Path/Path";

export default function Wishlist() {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>My Wishlist</h1>
      <Path
        paths={[
          { name: "Home", href: "#" },
          { name: "My account", href: "#" },
          { name: "Wishlist", href: "#" },
        ]}
      />
      <div className={styles.wishlist}>
        {new Array(8).fill(0).map((_, i) => (
          <ProductItem className={styles.product} key={i} />
        ))}
      </div>
    </section>
  );
}
