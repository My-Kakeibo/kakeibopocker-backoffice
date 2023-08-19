import { TCategorySpendParams } from '@/services/master-data/category-spends/entities/request';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialStateProps = {
  params: TCategorySpendParams;
};

const initialState: InitialStateProps = {
  params: {},
};

export const categorySpendReducer = createSlice({
  name: 'categorySpend',
  initialState,
  reducers: {
    useGetCategorySpendsSelect: (
      state,
      actions: PayloadAction<TCategorySpendParams>,
    ) => {
      state.params = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { useGetCategorySpendsSelect } = categorySpendReducer.actions;

export default categorySpendReducer.reducer;
