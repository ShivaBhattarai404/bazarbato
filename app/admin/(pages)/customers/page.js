import dbConnect from "@/helpers/dbConnect";
import CustomerTable from "./customer-table";
import User from "@/models/User";
import { deepCopy } from "@/helpers/utils";

// function to fetch all customers from database
async function fetchCustomers() {
  try {
    await dbConnect();
    const customers = await User.aggregate([
      {
        $lookup: {
          from: "orders", // The 'orders' collection
          localField: "_id", // The field from the 'users' collection
          foreignField: "user", // The field from the 'orders' collection that references 'user'
          as: "orders", // Alias for the joined orders
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          phone: 1,
          gender: 1,
          avatar: 1,
          isVerified: { $or: ["$emailVerified", "$phoneVerified"] },
          orderCount: { $size: "$orders" }, // Calculate the number of orders for each user
        },
      },
    ]);
    return deepCopy(customers);
  } catch (error) {
    return [];
  }
}

export default async function Customers() {
  const customers = await fetchCustomers();
  return <CustomerTable customers={customers} />;
}
