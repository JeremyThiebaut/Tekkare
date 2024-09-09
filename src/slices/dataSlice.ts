import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import hospitalData from "@/data/data_exemple1.JSON";
import medicationData from "@/data/data_exemple2.JSON";
import researchData from "@/data/data_exemple3.JSON";
import { AllData } from "@/types/dataTypes";

interface DataState {
  hospital: AllData[];
  medication: AllData;
  research: AllData[];
  selectedHospital: number;
  selectedResearch: number;
}

const initialState: DataState = {
  hospital: hospitalData,
  medication: medicationData,
  research: researchData,
  selectedHospital: 0,
  selectedResearch: 0,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (
      state,
      action: PayloadAction<{
        type: "hospital" | "medication" | "research";
        data: AllData | AllData[];
      }>
    ) => {
      if (action.payload.type === "hospital") {
        state.hospital = action.payload.data as AllData[];
      } else if (action.payload.type === "medication") {
        state.medication = action.payload.data as AllData;
      } else if (action.payload.type === "research") {
        state.research = action.payload.data as AllData[];
      }
    },
    setSelectedHospital: (state, action: PayloadAction<number>) => {
      state.selectedHospital = action.payload;
    },
    setSelectedResearch: (state, action: PayloadAction<number>) => {
      state.selectedResearch = action.payload;
    },
  },
});

export const { setData, setSelectedHospital, setSelectedResearch } = dataSlice.actions;

export default dataSlice.reducer;
