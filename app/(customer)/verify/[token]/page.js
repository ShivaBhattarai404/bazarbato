import { verifyUser } from "@/helpers/auth";
import VerifyTokenComponent from "./component";
import { notFound } from "next/navigation";

export default function VerifyToken({ params: { token } }) {
  // I had to made this separate component because I cannot set cookies unless user makes a post request
  // I had two options, either make a api call to verify the token or make a separate component
  // since I am using server functions everywhere, I decided not to make an api for this
  if (!token) {
    return notFound();
  }
  return <VerifyTokenComponent verifyUser={verifyUser.bind(null, { token })} />;
}
