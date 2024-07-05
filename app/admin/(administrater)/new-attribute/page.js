import styles from "./page.module.css";

import AdminPageHeading from "@/components/Utils/AdminPageHeading";
import CategoryForm from "./form";

async function handleSubmit(data) {
  "use server";
    console.log(data);
}

export default async function NewAttribute() {
  return (
    <div className={`${styles.container} homepadding`}>
      <AdminPageHeading back="/admin/attributes" className={styles.title}>
        Create A New Attribute
      </AdminPageHeading>

      <CategoryForm handleSubmit={handleSubmit} />
    </div>
  );
}
