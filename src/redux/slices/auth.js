import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 



// Login
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:5164/api/Users/login", userData);
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        return response.data;
    } catch (error) {   
        return rejectWithValue(error.response?.data?.message || "Login failed");
    }
});

// Signup
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:5164/api/Users/signup", userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.user = null;
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => { 
                state.loading = false; 
                state.user = action.payload.user; 
                state.token = action.payload.token; 
            })
            .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // Signup cases
            .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(registerUser.fulfilled, (state) => { state.loading = false; })
            .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
