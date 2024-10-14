import styles from "./Banner.module.css";

import banner1 from "@/public/images/banner-1.jpg";
import banner2 from "@/public/images/banner-2.jpg";
import banner3 from "@/public/images/banner-3.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className={`${styles.slider_container} has-scrollbar`}>
      <div className={styles.slider_item}>
        <Image
          src={banner1}
          alt="banner-1"
          className={styles.slider_img}
          width={1500}
          // height={500}
          draggable={false}
        />

        <div className={styles.slider_content}>
          <p className={styles.slider_subtitle}>Trending item</p>

          <h2 className={styles.slider_title}>
            Women&apos;s latest fashion sale
          </h2>

          <p className={styles.slider_text}>
            starting at Rs <b>2000</b>
          </p>

          <Link href="#" className={styles.slider_btn}>
            Shop now
          </Link>
        </div>
      </div>

      <div className={styles.slider_item}>
        <Image
          src={banner2}
          alt="banner 2"
          className={styles.slider_img}
          width={1500}
          // height={500}
          draggable={false}
        />

        <div className={styles.slider_content}>
          <p className={styles.slider_subtitle}>Trending accessories</p>

          <h2 className={styles.slider_title}>Modern sunglasses</h2>

          <p className={styles.slider_text}>
            starting at Rs <b>1500</b>
          </p>

          <Link href="#" className={styles.slider_btn}>
            Shop now
          </Link>
        </div>
      </div>

      <div className={styles.slider_item}>
        <Image
          src={banner3}
          alt="banner 3"
          className={styles.slider_img}
          width={1500}
          // height={500}
          draggable={false}
        />

        <div className={styles.slider_content}>
          <p className={styles.slider_subtitle}>Sale Offer</p>

          <h2 className={styles.slider_title}>New fashion summer sale</h2>

          <p className={styles.slider_text}>
            starting at Rs <b>2999</b>
          </p>

          <Link href="#" className={styles.slider_btn}>
            Shop now
          </Link>
        </div>
      </div>
    </div>
  );
}
