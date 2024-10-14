// core modules
import { Fragment } from "react";

// helper functions
import { deepCopy } from "@/helpers/utils";
import dbConnect from "@/helpers/dbConnect";

// database models
import Product from "@/models/Product";
import CategoryDoc from "@/models/Category";
import SiteContent from "@/models/SiteContent";

// custom components
import Banner from "@/components/_customer/Banner/Banner";
import Category from "@/components/_customer/Category/Category";
import Testimonials from "@/components/_customer/Testimonials/Testimonials";
import ProductContainer from "@/components/_customer/ProductContainer/ProductContainer";

async function getRecommendedProducts() {
  try {
    await dbConnect();
  } catch {
    console.log("Cannot connect to database");
  }
  try {
    const products = await Product.find({})
      .limit(12)
      .select("category name price images url_key")
      .populate("category", "name code")
      .lean();
    return deepCopy(products);
  } catch (error) {
    console.log("error from fetch prducts", error);
  }
  return [];
}

async function getBestSellerProducts() {
  try {
    await dbConnect();
    const { products } = await SiteContent.findOne({
      subject: "BEST_SELLERS",
    })
      .populate({ path: "products", select: "name price images url_key" })
      .lean();

    // this is a dummy calculation for MRP because I don't have MRP in the database
    const productsWithMrp = products.map((product) => ({
      ...product,
      rating: Math.ceil(Math.random() * 5),
      mrp: Math.ceil(product.price * Math.random() * 1.5),
    }));
    return deepCopy(productsWithMrp);
  } catch (error) {
    console.log("error from fetch best seller products", error);
    return [];
  }
}

async function getFeaturedCategories() {
  try {
    await dbConnect();
    // Fetch parent categories from the `SiteContent`
    const { categories: parentCategories } = await SiteContent.findOne({
      subject: "FEATURED_CATEGORIES",
    })
      .populate("categories", "name code banner")
      .lean();

    // Retrieve subcategories for each parent category
    const categoriesWithSubcategories = await CategoryDoc.aggregate([
      {
        $match: {
          _id: { $in: parentCategories.map((cat) => cat._id) }, // Match parent categories
        },
      },
      {
        $lookup: {
          from: "categories", // Collection to lookup (assuming it's "categories")
          localField: "_id", // Parent category _id
          foreignField: "parent", // Field in subcategories that points to the parent
          as: "subCategories", // The field to add subcategories
        },
      },
      {
        $unwind: "$subCategories", // Unwind subCategories to apply product count individually
      },
      {
        $lookup: {
          from: "products", // Collection to lookup (assuming it's "products")
          localField: "subCategories._id", // Subcategory _id
          foreignField: "category", // Field in products that refers to category
          as: "subCategoryProducts", // The field to hold matched products
        },
      },
      {
        $group: {
          _id: "$_id", // Group by parent category ID
          name: { $first: "$name" },
          code: { $first: "$code" },
          banner: { $first: "$banner" },
          subCategories: {
            $push: {
              _id: "$subCategories._id",
              name: "$subCategories.name",
              code: "$subCategories.code",
              banner: "$subCategories.banner",
              productCount: { $size: "$subCategoryProducts" }, // Count products for this subcategory
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          code: 1,
          banner: 1,
          // Limit subCategories to 5 items
          subCategories: { $slice: ["$subCategories", 5] },
        },
      },
    ]);
    return deepCopy(categoriesWithSubcategories);
  } catch (error) {
    return [];
  }
}

async function getDealOfTheDay() {
  try {
    await dbConnect();
    const { products } = await SiteContent.findOne({
      subject: "DEAL_OF_THE_DAY",
    })
      .populate({ path: "products", select: "name price images url_key" })
      .lean();
    return deepCopy(products[0]);
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const [products, bestSellerProducts, featuredCategories, dealOfTheDay] =
    await Promise.all([
      getRecommendedProducts(),
      getBestSellerProducts(),
      getFeaturedCategories(),
      getDealOfTheDay(),
    ]);
  return (
    <Fragment>
      <Banner />
      <Category />
      <ProductContainer
        products={products}
        bestSellerProducts={bestSellerProducts}
        featuredCategories={featuredCategories}
        dealOfTheDay={dealOfTheDay}
      />
      <Testimonials />
    </Fragment>
  );
}
