import { create } from "zustand";

import configs from "core/configs";

type InitialState = {
  collapsed: boolean;
  isProduction: boolean;
};

const initialState: InitialState = {
  collapsed: false,
  isProduction: configs.env === "production",
};
interface SystemState extends InitialState {
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
}

export const useSystemStore = create<SystemState>(set => ({
  ...initialState,
  setCollapsed: collapsed => set({ collapsed }),
  toggleCollapsed: () => set(state => ({ collapsed: !state.collapsed })),
}));
