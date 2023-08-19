import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialStateProps = {
  openSideBar: boolean;
};

export const configureLayoutReducer = createSlice({
  name: 'configureLayout',

  initialState: {
    openSideBar: false,
  } as InitialStateProps,

  reducers: {
    toggleSidebar: (state, actions: PayloadAction<boolean>) => {
      state.openSideBar = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar } = configureLayoutReducer.actions;

export default configureLayoutReducer.reducer;
