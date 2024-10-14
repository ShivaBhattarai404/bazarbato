import { Fragment } from "react";
import MobileNav from "@/components/_customer/MobileNav/MobileNav";
import { getBestSellerProducts, getFeaturedCategories } from "./page";
import { getNavParentCategories } from "@/components/_customer/Nav/Nav";

export default async function RootLayout({ children }) {
  const featuredCategories = await getFeaturedCategories();
  const bestSellerProducts = await getBestSellerProducts();
  const navParentCategories = await getNavParentCategories();

  return (
    <Fragment>
      <MobileNav
        featuredCategories={featuredCategories}
        bestSellerProducts={bestSellerProducts}
        navParentCategories={navParentCategories}
      />
      {children}
    </Fragment>
  );
}
