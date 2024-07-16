import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  weightmodal: false,
  weightmodalid: "",
  orderplacedmodal: false,
  welcomeModal:true,
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: initialModalState,
  reducers: {
    toggleWeightModal(state, action) {
      state.weightmodal = !state.weightmodal;
      if (action.payload.id) {
        state.weightmodalid = action.payload.id;
      }
    },
    toggleOrderPlacedModal(state, action) {
      state.orderplacedmodal = !state.orderplacedmodal;

      if (action.payload.id) {
        state.weightmodalid = action.payload.id;
      }
    },
    clearModals (state, action) {
        state.weightmodal =  false;
        state.orderplacedmodal = false
    },
    toggleWelcomeModal (state,action) {
      state.welcomeModal = false
    }
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
