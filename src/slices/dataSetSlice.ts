import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataSet } from "../types/dataTypes";

interface DataSetState {
  value: DataSet;
}

const initialState: DataSetState = {
  value: "hospital",
};

export const dataSetSlice = createSlice({
  name: "dataSet",
  initialState,
  reducers: {
    setDataSet: (state, action: PayloadAction<DataSet>) => {
      state.value = action.payload;
    },
  },
});

export const { setDataSet } = dataSetSlice.actions;

export default dataSetSlice.reducer;
