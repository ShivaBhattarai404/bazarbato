import { deepCopy } from "@/helpers/utils";
import OrderComponent from "./component";
import { notFound } from "next/navigation";
import Order from "@/models/Order";
import dbConnect from "@/helpers/dbConnect";

export const metadata = {
  title: "Order",
};

async function fetchOrder(orderId) {
  try {
    await dbConnect();
    const order = await Order.findById(orderId).populate("user").lean();
    return deepCopy(order);
  } catch (error) {
    return null;
  }
}

async function changeOrderStatus(orderId) {
  "use server";
  try {
    await dbConnect();
    // mark as shipped if the order is processing and mark as delivered if the order is shipped
    const order = await Order.findById(orderId);
    if (!order) {
      return { error: "Order not found" };
    }
    if (order.orderStatus === "PROCESSING") {
      order.orderStatus = "SHIPPED";
    } else {
      order.orderStatus = "DELIVERED";
    }
    const response = await order.save();
    return { error: null, order: deepCopy(response) };
  } catch (error) {
    return { error: "Server Error, Something went wrong" };
  }
}
export default async function OrderPage({ params: { id: orderId } }) {
  const order = await fetchOrder(orderId);
  if (!order) {
    return notFound();
  }
  return <OrderComponent order={order} changeOrderStatus={changeOrderStatus} />;
}
