import { createSlice, createAction } from '@reduxjs/toolkit';

const SHOW_MODAL = 'modal/showModal';

const initialState = {
  type: null,
  modalProps: {},
};

// reducers
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      return action.payload;
    },
    hideModal: () => initialState,
  },
});

// actions
export const { hideModal } = modalSlice.actions;

export const showModal = createAction(SHOW_MODAL, function prepare(type, modalProps) {
  return {
    payload: {
      type,
      modalProps,
    },
  }
});

export default modalSlice.reducer;
