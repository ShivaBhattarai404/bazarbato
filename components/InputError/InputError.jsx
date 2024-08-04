import { PiWarningCircleBold } from "react-icons/pi";

import formStyles from "@/public/styles/form.module.css";

export default function InputError(props) {
  const { errors, name, className, ...rest } = props;
  const error = errors[name];
  // console.log("from InputError", error);
  if (error?.message && error.touched) {
    return (
      <span className={[formStyles.error, className || ""].join(" ")} {...rest}>
        <PiWarningCircleBold />
        {error.message}
      </span>
    );
  }
  return null;
}
