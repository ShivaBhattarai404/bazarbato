import { PiWarningCircleBold } from "react-icons/pi";

import formStyles from "@/public/styles/form.module.css";

export default function InputError({ errors, name, className, ...rest }) {
  // { className: "something", name: "email", errors: { email: { message: "Email is required", touched: true } } }
  // const { errors, name, className, ...rest } = props;
  const error = errors[name];
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
