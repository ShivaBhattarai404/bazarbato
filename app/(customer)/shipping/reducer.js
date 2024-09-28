// input value initial state for the reducer
export const initialState = {
  fullname: {
    value: "",
    message: "Name is required",
    touched: false,
  },
  address: {
    value: "",
    message: "Address is required",
    touched: false,
  },
  phone: {
    value: "",
    message: "Enter a valid phone number",
    touched: false,
  },
  alternativePhone: {
    value: "",
    message: "Enter a valid phone number",
    touched: false,
  },
  postalCode: {
    value: "",
    message: "Postal code is required",
    touched: false,
  },
  note: "",
};

// reducer function
export const inputReducer = (state, action) => {
  let errorMessage = "";
  let value = "";
  switch (action.type) {
    case "CHANGE_FULLNAME":
      errorMessage = action.value ? "" : "Name is required";
      value = errorMessage ? state.fullname.value : action.value;
      return {
        ...state,
        fullname: {
          value: value,
          message: errorMessage,
          touched: true,
        },
      };
    case "CHANGE_ADDRESS":
      errorMessage = action.value ? "" : "Address is required";
      value = errorMessage ? state.fullname.value : action.value;
      return {
        ...state,
        address: {
          value: value,
          message: errorMessage,
          touched: true,
        },
      };
    case "CHANGE_PHONE":
      errorMessage =
        isNaN(+action.value) ||
        action.value.length > 11 ||
        action.value.length < 10
          ? "Enter a valid phone number"
          : "";
      value = errorMessage ? state.fullname.value : action.value;
      return {
        ...state,
        phone: {
          value: value,
          message: errorMessage,
          touched: true,
        },
      };
    case "CHANGE_ALTERNATIVE_PHONE":
      errorMessage =
        isNaN(+action.value) ||
        action.value.length > 11 ||
        action.value.length < 10
          ? "Enter a valid phone number"
          : "";
      value = errorMessage ? state.fullname.value : action.value;
      return {
        ...state,
        alternativePhone: {
          value: value,
          message: errorMessage,
          touched: true,
        },
      };
    case "CHANGE_POSTAL_CODE":
      errorMessage =
        isNaN(+action.value) || action.value.length === 0
          ? "Enter a valid postal code"
          : "";
      value = errorMessage ? state.fullname.value : action.value;
      return {
        ...state,
        postalCode: {
          value: value,
          message: errorMessage,
          touched: true,
        },
      };
    case "CHANGE_CUTOMER_NOTE":
      return {
        ...state,
        note: action.value,
      };
    case "SET":
      return { ...action.payload, note: state.note };
    default:
      return state;
  }
};
