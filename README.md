# Calling API in redux toolkit

## Step 1. create a Thunk
createAsyncThunk in Redux Toolkit is a helper function that simplifies the creation of asynchronous action creators. 
It automatically generates actions for pending, fulfilled, and rejected states, reducing code repetition and making async logic management easier.


```javascript 
export const getTodos = createAsyncThunk("getTodos", async () => {
    try {
        const response = await fetch("https://jsonplaceholdeer.typicode.com/todos");
        return response.json();
    } catch (error) {
        throw Error(error)
    }
})
``` 


## Step 2. Create extraReducers for handling pending, fulfilled, and rejected states

``` javascript
// create a slice
export const todoSlice = createSlice({
    name: "todoSlice",
    initialState: {
        data: null,
        isLoading: false,
        error: null
    }

    // create some extraReducers which will handle all the states of promise of getTodos
    extraReducers: builder => {

        // adding case for pending
        builder.addCase(getTodos.pending, (state) => {
            state.isLoading = true
        }),

        // adding case for fulfilled
        builder.addCase(getTodos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        }),

        // adding case for rejected
        builder.addCase(getTodos.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
    }
})
```