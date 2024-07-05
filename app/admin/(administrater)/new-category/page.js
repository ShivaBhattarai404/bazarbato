import styles from "./page.module.css";

import AdminPageHeading from "@/components/Utils/AdminPageHeading";
import CategoryForm from "./form";

async function handleSubmit(data) {
  "use server";
//   console.log(data);
}

export default async function NewCategory() {
  return (
    <div className={`${styles.container} homepadding`}>
      <AdminPageHeading back="/admin/categories" className={styles.title}>
        Create A New Category
      </AdminPageHeading>

      <CategoryForm handleSubmit={handleSubmit} />
    </div>
  );
}
