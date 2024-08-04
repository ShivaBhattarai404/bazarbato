import { redirect } from "next/navigation";

import { checkIfAttributeExists } from "@/helpers/crud";

import styles from "./page.module.css";

import AdminPageHeading from "@/components/Utils/AdminPageHeading";
import AttributeForm from "./form";
import Attribute from "@/models/Attribute";

async function handleSubmit(formData) {
  "use server";
  const _id = formData.get("_id");
  const name = formData.get("name");
  const code = formData.get("code");
  const type = formData.get("type");
  const options = formData.getAll("options");
  const isRequired = formData.get("isRequired") === "yes";
  const visibility = formData.get("show-to-customer") === "yes";

  // check for unique attribute code for new attribute only
  // because the code is immutable
  if (!_id) {
    try {
      const { ack, exists } = await checkIfAttributeExists({ code });
      if (!ack) throw "Network error occurred. Refresh the page";
      if (exists) return { error: "Attribute with this code already exists" };
    } catch (error) {
      return { error: "Network error occurred. Refresh the page" };
    }
  }

  let attribute = null;
  try {
    if (_id) attribute = await Attribute.findById(_id);
  } catch (error) {
    attribute = null;
  }
  if (attribute) {
    attribute.name = name;
    attribute.type = type;
    if (type === "SELECT") {
      attribute.options = options;
    }
    attribute.isRequired = isRequired;
    attribute.visibility = visibility;
  } else {
    attribute = new Attribute({
      name,
      code,
      type,
      isRequired,
      visibility,
    });
    if (type === "SELECT") {
      attribute.options = options;
    }
  }
  try {
    await attribute.save();
    console.log("attribute saved");
  } catch (error) {
    return { error: "An error occurred. Refresh the page" };
  }
  redirect("/admin/attributes");
}

export default async function NewAttribute() {
  return (
    <div className={`${styles.container} homepadding`}>
      <AdminPageHeading back="/admin/attributes" className={styles.title}>
        Create A New Attribute
      </AdminPageHeading>

      <AttributeForm
        handleSubmit={handleSubmit}
        checkIfAttributeExists={checkIfAttributeExists}
      />
    </div>
  );
}
