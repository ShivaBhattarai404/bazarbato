import Card from "@/components/Card/Card";
import styles from "./page.module.css";
import AdminPageHeading from "@/components/Utils/AdminPageHeading";
import Link from "next/link";
import { formatDate } from "@/helpers/utils";

export const metadata = {
  title: "Sapana Bhandari",
};

const DUMMY_ORDERS = [
  {
    _id: "1",
    order_number: "ORD-123",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "2",
    order_number: "ORD-124",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "3",
    order_number: "ORD-125",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "4",
    order_number: "ORD-126",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "5",
    order_number: "ORD-127",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "6",
    order_number: "ORD-128",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "7",
    order_number: "ORD-129",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "8",
    order_number: "ORD-130",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "9",
    order_number: "ORD-131",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "10",
    order_number: "ORD-132",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "11",
    order_number: "ORD-133",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "12",
    order_number: "ORD-134",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "13",
    order_number: "ORD-135",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "14",
    order_number: "ORD-136",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "15",
    order_number: "ORD-137",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "16",
    order_number: "ORD-138",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "17",
    order_number: "ORD-139",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "18",
    order_number: "ORD-140",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "19",
    order_number: "ORD-141",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "20",
    order_number: "ORD-142",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "21",
    order_number: "ORD-143",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "22",
    order_number: "ORD-144",
    date: "2023-06-29",
    total: 1000.2,
  },
  {
    _id: "23",
    order_number: "ORD-145",
    date: "2023-06-29",
    total: 1000.2,
  },
];

export default function Dashboard() {

  return (
    <div className={styles.container}>
      <AdminPageHeading back="/admin/customers" className={styles.title}>
        Sapana Bhandari
      </AdminPageHeading>
      <div className={styles.cardWrapper}>
        <Card className={`${styles.card} ${styles.orderInfo}`}>
          <span className={styles.cardTitle}>Order History</span>
          {/* <p className={styles.fallback}>
            Customer doesnot have any orders yet.
          </p> */}

          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.order_number}>Order number</th>
                <th className={styles.date}>Date</th>
                <th className={styles.total}>total</th>
              </tr>
            </thead>
            <tbody>
              {DUMMY_ORDERS.map((order) => (
                <tr key={order._id}>
                  <td className={styles.order_number}>
                    <Link href={`/admin/orders/${order._id}`}>
                      {order.order_number}
                    </Link>
                  </td>
                  <td className={styles.date}>{formatDate(order.date)}</td>
                  <td className={styles.total}>Rs. {order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card className={`${styles.card} ${styles.customerInfo}`}>
          <h1>Full name</h1>
          <p>Sapana Bhandari</p>
          <h1>Phone</h1>
          <p>9841234567</p>
          <h1>Address</h1>
          <p>Sunwal, Nepal</p>
          <h1>City</h1>
          <p>Bhumahi</p>
          <h1>Email</h1>
          <p>sapanabhandari56@gmail.com</p>
          <h1>Status</h1>
          <p>Enabled</p>
        </Card>
      </div>
    </div>
  );
}
