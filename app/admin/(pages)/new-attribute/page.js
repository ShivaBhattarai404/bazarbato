import { checkIfAttributeExists } from "@/helpers/crud";

import styles from "./page.module.css";

import AdminPageHeading from "@/components/Utils/AdminPageHeading";
import CategoryForm from "./form";
import Attribute from "@/models/Attribute";
import dbConnect from "@/helpers/dbConnect";
import { deepCopy } from "@/helpers/utils";
import { revalidatePath } from "next/cache";

async function handleSubmit(formData) {
  "use server";
  const _id = formData.get("_id");
  const name = formData.get("name");
  const code = formData.get("code");
  const type = formData.get("type");
  const options = formData.getAll("options");
  const showToCustomer = formData.get("show-to-customer") === "yes";
  // const isRequired = formData.get("is-required") === "yes";

  try {
    await dbConnect();
    revalidatePath("/admin/new-attribute");
    if (_id) {
      await Attribute.findByIdAndUpdate(_id, {
        name,
        showToCustomer,
      });
      return { ack: true, message: "Attribute updated successfully" };
    } else {
      await Attribute.create({
        name,
        code,
        type,
        options,
        showToCustomer,
      });
      return { ack: true, message: "Attribute created successfully" };
    }
  } catch (error) {
    return { ack: false, message: "An error occurred. Please try again" };
  }
}

async function fetchAttribute(attributeCode) {
  try {
    await dbConnect();
    const attribute = await Attribute.findOne({ code: attributeCode });
    return deepCopy(attribute);
  } catch (error) {
    return null;
  }
}

export default async function NewAttribute({
  searchParams: { attribute: attributeCode },
}) {
  const attribute = await fetchAttribute(attributeCode);

  return (
    <div className={`${styles.container} homepadding`}>
      <AdminPageHeading back="/admin/attributes" className={styles.title}>
        Create A New Attribute
      </AdminPageHeading>

      <CategoryForm
        attribute={attribute}
        handleSubmit={handleSubmit}
        checkIfAttributeExists={checkIfAttributeExists}
      />
    </div>
  );
}
