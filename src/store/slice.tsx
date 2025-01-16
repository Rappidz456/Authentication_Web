import { createSlice } from "@reduxjs/toolkit";

export const SliceStorage = createSlice({
    name: 'storage',
    initialState: {
        data: null
    },
    reducers: {
        storage: (state, action) => {
            state.data = action.payload;
        },
        removeStorage: (state) => {
            state.data = null;
        }
    }
})

export const {storage, removeStorage} = SliceStorage.actions;
export default SliceStorage.reducer;