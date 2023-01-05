import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
  user: { email: "", role: "" },
  isLoading: true,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    return data.user.email;
  }
);
export const getUser = createAsyncThunk("auth/getUser", async (email) => {
  const res = await fetch(
    `${process.env.REACT_APP_NOT_SECRET_CODE}/user/${email}`
  );
  const data = await res.json();

  if (data.status) {
    return data;
  }
  return email;
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);

    return data.user.email;
  }
);
export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
  const googleProvider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, googleProvider);

  return data.user.email;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = { email: "", role: "" };
    },
    setUser: (state, { payload }) => {
      state.user.email = payload;
      state.isLoading = false;
    },
    toggleLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = "";
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user.email = payload;
      state.isError = false;
      state.error = "";
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user.email = "";
      state.isError = true;
      state.error = action.error.message;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = "";
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user.email = payload;
      state.isError = false;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user.email = "";
      state.isError = true;
      state.error = action.error.message;
    });
    builder.addCase(googleLogin.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = "";
    });
    builder.addCase(googleLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user.email = payload;
      state.isError = false;
      state.error = "";
    });
    builder.addCase(googleLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.user.email = "";
      state.isError = true;
      state.error = action.error.message;
    });
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = "";
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      if (payload.status) {
        state.user = payload.data;
      } else {
        state.user.email = payload;
      }

      state.isError = false;
      state.error = "";
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user.email = "";
      state.isError = true;
      state.error = action.error.message;
    });
  },
});

export const { logOut, setUser, toggleLoading } = authSlice.actions;

export default authSlice.reducer;
