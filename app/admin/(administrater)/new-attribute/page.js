import styles from "./page.module.css";

import AdminPageHeading from "@/components/Utils/AdminPageHeading";
import CategoryForm from "./form";
import Attribute from "@/models/Attribute";
import dbConnect from "@/helpers/dbConnect";
import { checkIfAttributeExists } from "@/helpers/crud";

async function handleSubmit(data) {
  "use server";
  console.log(data);
}

async function fetchAttribute(attributeCode) {
  try {
    await dbConnect();
    const attribute = await Attribute.findOne({ code: attributeCode });
    console.log(attribute);
  } catch (error) {
    return [];
  }
}

export default async function NewAttribute({
  searchParams: { attribute: attributeCode },
}) {
  await fetchAttribute(attributeCode);

  return (
    <div className={`${styles.container} homepadding`}>
      <AdminPageHeading back="/admin/attributes" className={styles.title}>
        Create A New Attribute
      </AdminPageHeading>

      <CategoryForm handleSubmit={handleSubmit} checkIfAttributeExists={checkIfAttributeExists} />
    </div>
  );
}
