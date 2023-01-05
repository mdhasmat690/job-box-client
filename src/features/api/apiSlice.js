import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_NOT_SECRET_CODE,
  }),
  tagTypes: ["jobs", "job"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
