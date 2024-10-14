"use client";

import { useEffect, useState } from "react";
import TokenExpired from "../token-expired";
import { useDispatch } from "react-redux";
import { setError } from "@/app/reducers/utils";
import { useRouter } from "next/navigation";

export default function VerifyTokenComponent({ verifyUser }) {
  const dispatch = useDispatch();
  const [showInvalidTokenPage, setShowInvalidTokenPage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    verifyUser()
      .then(({ error }) => {
        if (error) setShowInvalidTokenPage(true);
        else router.push("/me");
      })
      .catch((err) => {
        dispatch(
          setError(
            err?.message ||
              "Something went wrong, please reload the page and try again"
          )
        );
      });
  }, [verifyUser, dispatch, router]);
  return showInvalidTokenPage ? <TokenExpired /> : <></>;
}
