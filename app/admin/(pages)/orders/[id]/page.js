import OrderComponent from "./component";

export const metadata = {
  title: "Order",
};

export default function OrderPage({ params: { id: orderId } }) {
  console.log("OrderId", orderId);
  return <OrderComponent />;
}
