import Attribute from "@/models/Attribute";
import AttributesClientPage from "./component";
import dbConnect from "@/helpers/dbConnect";

async function fetchAttributes() {
  try {
    await dbConnect();
    const attributes = await Attribute.find();

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
    return formattedAttributes;
  } catch (error) {
    return [];
  }
}

export default async function ProductsPage() {
  const attributes = await fetchAttributes();
  return <AttributesClientPage attributes={attributes} />;
}
