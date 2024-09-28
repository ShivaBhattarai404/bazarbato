// core modules
import { Fragment } from "react";
import { notFound } from "next/navigation";

// helper functions
import dbConnect from "@/helpers/dbConnect";
import {
  createSignatureForEsewaPayment,
  decodeEsewaPaymentSuccessToken,
} from "@/helpers/payment";

// database models
import Order from "@/models/Order";

// styles - CSS file
import styles from "./page.module.css";

// custom component
import CartProgressBar from "@/components/_customer/CartProgressBar/CartProgressBar";

// react icons
import PaymentForm from "./PaymentForm";
import PaymentSuccessPage from "./SuccessPage";
import { deepCopy } from "@/helpers/utils";

// this function will return the payment method
function getEsewaTransactionDetails(order) {
  const amount = order.total;
  const deliveryCharge = order.shipping.deliveryCharge;
  const serviceCharge = 0;
  const grossTotal = order.grossTotal;
  const taxAmount = 0;
  const productCode = "EPAYTEST";
  const transactionId =
    order._id.toString() +
    Date.now().toString() +
    Math.floor(Math.random() * 1000);

  const dataString = `total_amount=${grossTotal},transaction_uuid=${transactionId},product_code=${productCode}`;
  const signature = createSignatureForEsewaPayment(dataString);

  const payment = {
    amount: amount,
    failure_url: "http://localhost:3000/payment?status=failure",
    product_delivery_charge: deliveryCharge,
    product_service_charge: serviceCharge,
    product_code: productCode,
    signature: signature,
    signed_field_names: "total_amount,transaction_uuid,product_code,order",
    success_url: "http://localhost:3000/payment",
    tax_amount: taxAmount,
    total_amount: grossTotal,
    transaction_uuid: transactionId,
  };

  return payment;
}

// function to fetch order from the database
async function fetchOrder(orderId) {
  if (!orderId) {
    return null;
  }
  try {
    await dbConnect();
  } catch {
    return null;
  }
  try {
    const order = await Order.findById(orderId).lean();
    return deepCopy(order);
  } catch (error) {
    return null;
  }
}
export default async function Payment({
  searchParams: { data, order: orderId },
}) {
  const decodedToken = decodeEsewaPaymentSuccessToken(data);
  const order = await fetchOrder(orderId);
  if (!order) {
    return notFound();
  }
  const paymentData = {
    ESEWA: getEsewaTransactionDetails(order),
  };
  return (
    <Fragment>
      <CartProgressBar
        active={4}
        labelPosition="bottom"
        className={styles.progressBar}
        steps={["Cart", "Shipping", "Review", "Payment"]}
      />

      {decodedToken ? (
        <PaymentSuccessPage data={decodedToken} order={order} />
      ) : (
        <PaymentForm paymentData={paymentData} order={order} />
      )}
    </Fragment>
  );
}
