import Attribute from "@/models/Attribute";
import dbConnect from "@/helpers/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
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
  // console.log("from route", formattedAttributes);
  return NextResponse.json(formattedAttributes);
}
