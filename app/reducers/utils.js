import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "utils",
  initialState: {
    error: {
      title: "",
      message: "",
      status: false,
    },
  },
  reducers: {
    setError(state, action) {
      const payloadType = typeof action.payload;
      if (payloadType === "string") {
        state.error = {
          title: "Error Occured",
          message: action.payload,
          status: true,
        };
      } else if (payloadType === "object") {
        const {
          title = "Error Occured",
          message = "Something went wrong",
          status = false,
        } = action.payload;
        state.error = { title, message, status };
      }
    },
    resetError(state) {
      state.error = {
        title: "",
        message: "",
        status: false,
      };
    },
  },
});

export const { setLoading, setError, resetError } = slice.actions;
export default slice.reducer;
