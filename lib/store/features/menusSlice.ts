import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  menus: string[];
  isOpenSidebar: string;
}

const initialState: CartState = {
  menus: [],
  isOpenSidebar: "collapsed",
};

export const menusSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addMenu: (state, action) => {
      state.menus.push(action.payload);
    },
    toggleSidebarState(state, action) {
      console.log("Action===========>", action.payload)
      state.isOpenSidebar = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMenu, toggleSidebarState } = menusSlice.actions;

export default menusSlice.reducer;
