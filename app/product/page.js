import WIP from "@/components/WIP/WIP";
import Product from "@/model/Product";
import dbConnect from "@/helpers/dbConnect";

export const metadata = {
    title: "Product Page"
}
export default async function ProductPage(){
    await dbConnect();
    const products = await Product.find();
    return <WIP name={products[0].name} />
}