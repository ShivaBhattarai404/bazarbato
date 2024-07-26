import { redirect } from "next/navigation";

import styles from "./page.module.css";
import AdminPageHeading from "@/components/Utils/AdminPageHeading";
import NewProductForm from "./form";

export const metadata = {
  title: "Create a new product",
};

export default function Dashboard() {
  async function formSubmitHandler(formData) {
    "use server";
    console.log(formData);
    // redirect("/admin/products");
  }

  return (
    <div className={`${styles.container} homepadding`}>
      <AdminPageHeading back="/admin/products">
        Create A New Product
      </AdminPageHeading>
      <NewProductForm handleSubmit={formSubmitHandler} />
    </div>
  );
}
