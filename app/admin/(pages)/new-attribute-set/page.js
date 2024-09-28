import AdminPageHeading from "@/components/Utils/AdminPageHeading";
import AttributeSetForm from "./form";
import styles from "./page.module.css";
import { checkIfAttributeSetExists } from "@/helpers/crud";
import dbConnect from "@/helpers/dbConnect";
import Attribute from "@/models/Attribute";
import { deepCopy } from "@/helpers/utils";
import AttributeSet from "@/models/AttributeSet";
import { revalidatePath } from "next/cache";

async function handleSubmit(formData) {
  "use server";
  const _id = formData.get("_id");
  const name = formData.get("name");
  const code = formData.get("code");
  const attributes = formData.getAll("attributes");

  try {
    await dbConnect();
    if (_id) {
      await AttributeSet.findByIdAndUpdate(_id, { name });
      return { ack: true, message: "Attribute set updated successfully" };
    } else {
      await AttributeSet.create({ name, code, attributes });
      return { ack: true, message: "Attribute set created successfully" };
    }
  } catch (error) {
    console.log(error);
    return { ack: false, message: error.message };
  } finally {
    revalidatePath("/admin/new-attribute-set");
  }
}

// function to fetch all attributes available in the database
async function fetchAttributes() {
  try {
    await dbConnect();
    const attributes = await Attribute.find({}).select("code name");
    return deepCopy(attributes);
  } catch (error) {
    return null;
  }
}

// function to fetch single attribute set by code
async function fetchAttributeSetByCode(code) {
  try {
    await dbConnect();
    const attributeSet = await AttributeSet.findOne({ code })
      .populate("attributes")
      .lean();
    return deepCopy(attributeSet);
  } catch (error) {
    return null;
  }
}

export default async function NewAttributeSet({ searchParams: { set: code } }) {
  const [attributeSet, attributes] = await Promise.all([
    fetchAttributeSetByCode(code),
    fetchAttributes(),
  ]);

  console.log(attributeSet?.attributes);
  return (
    <div className={`${styles.container} homepadding`}>
      <AdminPageHeading back="/admin/attributes" className={styles.title}>
        Create A New Attribute Set
      </AdminPageHeading>

      <AttributeSetForm
        attributes={attributes}
        attributeSet={attributeSet}
        handleSubmit={handleSubmit}
        checkIfAttributeSetExists={checkIfAttributeSetExists}
      />
    </div>
  );
}
