import Attribute from "@/models/Attribute";
import AttributesClientPage from "./component";
import dbConnect from "@/helpers/dbConnect";
import AttributeSet from "@/models/AttributeSet";

// function to fetch all available attributes in the database
async function fetchAttributes(skip, limit) {
  try {
    await dbConnect();
    const [attributes, totalCount] = await Promise.all([
      Attribute.find().skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
      Attribute.countDocuments(),
    ]);

    const formattedAttributes = attributes.map((attribute) => {
      const modifiedAttribute = {
        _id: attribute._id.toString(),
        name: attribute.name,
        code: attribute.code,
        type: attribute.type,
      };
      if (attribute.type.toLowerCase() === "select") {
        modifiedAttribute.options = attribute.options;
      }
      return modifiedAttribute;
    });
    return { attributes: formattedAttributes, totalCount };
  } catch (error) {
    return [];
  }
}

// function to delete attributes
async function deleteAttributes(attributeIDs) {
  "use server";
  try {
    await dbConnect();
  } catch {
    return { error: "Server Error, Connection to the database failed" };
  }
  try {
    const associatedAttributes = await AttributeSet.countDocuments({
      attributes: { $in: attributeIDs },
    });
    if (associatedAttributes > 0) {
      return {
        error: "Cannot delete attributes associated with an attribute set",
      };
    }
    await Attribute.deleteMany({ _id: { $in: attributeIDs } });
    return { error: null };
  } catch (error) {
    return { error: "Server Error, Failed to delete attributes" };
  }
}

export default async function Attributes({
  searchParams: { page = 1, perPage = 10 },
}) {
  const skip = (page - 1) * perPage;
  const limit = perPage;
  const { attributes, totalCount } = await fetchAttributes(skip, limit);
  return (
    <AttributesClientPage
      attributes={attributes}
      deleteAttributes={deleteAttributes}
      attributesCount={totalCount}
    />
  );
}
