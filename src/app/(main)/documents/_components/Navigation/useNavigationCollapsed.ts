import { create } from 'zustand';

type Store = {
  isCollapsed: boolean;
  setIsCollapsed: (open: boolean) => void;
};

export const useNavigationCollapsed = create<Store>((set) => ({
  isCollapsed: false,
  setIsCollapsed: (open: boolean) => set({ isCollapsed: open }),
}));
