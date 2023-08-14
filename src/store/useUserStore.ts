import { create } from "zustand";

type InitialState = {
  permissions: string[];
};

const initialState: InitialState = {
  permissions: [],
};
interface UserState extends InitialState {
  setPermissions: (permissions: string[]) => void;
}

export const useUserStore = create<UserState>(set => ({
  ...initialState,
  setPermissions: permissions => set({ permissions }),
}));
