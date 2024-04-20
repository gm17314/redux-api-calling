import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        const data = response.data; // Extracting only serializable data
        return data;
    } catch (error) {
        throw Error;
    }
});


const initialState = { loading: false, data: null, error: false };

export const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false,
            state.data = action.payload;
        });
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false,
            state.error = true;
            state.data = action.error;
        });
    },
});

export default todoSlice.reducer;
