import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
//   return NextResponse.redirect(new URL("/admin/login", request.url));
return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/admin/categories",
    "/admin/coupons",
    "/admin/customers",
    "/admin/dashboard",
    "/admin/new-coupon",
    "/admin/new-product",
    "/admin/orders",
    "/admin/products",
    "/admin/settings",
  ],
};
