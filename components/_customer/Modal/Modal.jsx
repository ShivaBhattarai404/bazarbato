"use client";

import { Fragment } from "react";
import Modal from "@/components/_admin/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { resetError } from "@/app/reducers/utils";

export default function ErrorModal() {
  const error = useSelector((state) => state.utils.error);
  const dispatch = useDispatch();

  return (
    <Fragment>
      {error.status && (
        <Modal
          title={error.title}
          paragraph={error.message}
          btn1Text="Okay"
          bgColor1="red"
          color1="white"
          btn2Text="Close"
          bgColor2="green"
          color2="white"
          onCancel={() => dispatch(resetError())}
          onOk={() => dispatch(resetError())}
        />
      )}
    </Fragment>
  );
}
