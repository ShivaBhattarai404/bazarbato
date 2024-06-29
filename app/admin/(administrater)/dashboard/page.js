import Link from "next/link";

import AdminPageHeading from "@/components/Utils/AdminPageHeading";
import styles from "./page.module.css";
import Card from "@/components/Card/Card";
import PieChart from "@/components/Charts/PieChart";

import frame from "@/public/images/frame.png";
import Image from "next/image";
import AreaChart from "@/components/Charts/AreaChart";

export const metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <div className={`${styles.container} homepadding`}>
      <AdminPageHeading className={styles.title}>Dashboard</AdminPageHeading>
      <div className={styles.layout}>
        <Card className={`${styles.card} ${styles.graph}`}>
          <span className={styles.cardTitle}>Sales Statistics</span>
          <AreaChart className={styles.chart} />
        </Card>
        <Card className={`${styles.card} ${styles.lifetimeSales}`}>
          <span className={styles.cardTitle}>Lifetime Sales</span>
          <ul className={styles.reportlist}>
            <li>
              <span className={styles.dot} />
              6003 orders
            </li>
            <li>
              <span className={styles.dot} />
              Rs 5,92,212 lifetime sale
            </li>
            <li>
              <span className={styles.dot} />
              Rs 1,20,000 profit
            </li>
            <li>
              <span className={styles.dot} />
              5000 complete orders
            </li>
            <li>
              <span className={styles.dot} />
              5000 cancelled orders
            </li>
          </ul>
          <hr />
          <div className={styles.piechart}>
            <PieChart />
          </div>
        </Card>
        <Card className={`${styles.card} ${styles.bestSales}`}>
          <span className={styles.cardTitle}>Best Sellers</span>
          <Link href="/admin/products">All Products</Link>
          <div className={styles.products}>
            {new Array(4).fill(0).map((_, i) => (
              <div className={styles.product} key={i}>
                <Image src={frame} alt="parrot" width={70} height={60} />
                <Link href={"#"} className={styles.product_name}>
                  Photo Frame
                </Link>
                <span className={styles.product_price}>Rs 100000.00</span>
                <span className={styles.product_sold_amount}>1000000 sold</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
