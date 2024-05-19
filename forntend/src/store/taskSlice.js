import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    records : []
}
const recordSlice = createSlice({
    name: "record",
    initialState,
    reducers: {

        setRecords: (state, action) => {
            state.records = action.payload;
        },
        addRecord: (state, action) => {
            state.records.push(action.payload)
        },
        updateRecord: (state, action) => {
            const   updatedData  = action.payload;
            const index = state.records.findIndex(record => record._id === updatedData._id);
            if (index !== -1) {
                state.records[index] = updatedData;
            }
        },

    }
})

export const {setRecords, addRecord, updateRecord} = recordSlice.actions;

export default recordSlice.reducer;