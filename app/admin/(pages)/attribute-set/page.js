import dbConnect from "@/helpers/dbConnect";
import AttributeSetClientPage from "./component";
import { deepCopy } from "@/helpers/utils";
import AttributeSet from "@/models/AttributeSet";
import Product from "@/models/Product";

// function to fetch all attribute sets
async function fetchAttributeSets() {
  try {
    await dbConnect();
    let attributeSets = await AttributeSet.find()
      .sort({ createdAt: -1 })
      .lean();
    attributeSets = attributeSets.map(({ _id, name, code, attributes }) => ({
      _id,
      name,
      code,
      attributeCount: attributes.length,
    }));
    return deepCopy(attributeSets);
  } catch (error) {
    return [];
  }
}
// function to delete an attribute-set
async function deleteAttributeSet(attributeSetIDs) {
  "use server";
  try {
    await dbConnect();
  } catch (error) {
    return { error: "Connecting to the database failed" };
  }

  try {
    const productsAssociated = await Product.countDocuments({
      attributeSet: { $in: attributeSetIDs },
    });
    if (productsAssociated > 0) {
      return {
        error:
          "Cannot delete!. Some attribute set are associated with products",
      };
    }
    await AttributeSet.deleteMany({ _id: { $in: attributeSetIDs } });
    return { error: null };
  } catch (error) {
    return { error: "Server Error, Failed to delete attribute set" };
  }
}

export default async function AttributeSets() {
  const attributeSets = await fetchAttributeSets();

  return (
    <AttributeSetClientPage
      attributeSets={attributeSets}
      deleteAttributeSet={deleteAttributeSet}
    />
  );
}
