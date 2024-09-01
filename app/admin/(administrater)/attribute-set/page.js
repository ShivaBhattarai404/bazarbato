import dbConnect from "@/helpers/dbConnect";
import AttributeSetClientPage from "./component";
import { deepCopy } from "@/helpers/utils";
import AttributeSet from "@/models/AttributeSet";

async function fetchAttributeSets() {
  try {
    await dbConnect();
    let attributeSets = await AttributeSet.find().lean();
    attributeSets = attributeSets.map(({ _id, name, code, attributes }) => ({
      _id,
      name,
      code,
      attributeCount: attributes.length,
    }));
    return deepCopy(attributeSets);
  } catch (error) {
    console.log(error);
    return [];
  }
}
export default async function AttributeSets() {
  const attributeSets = await fetchAttributeSets();

  return <AttributeSetClientPage attributeSets={attributeSets} />;
}
