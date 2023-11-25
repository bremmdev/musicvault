import { BandWithDetails } from "@/types/types";
import { DeleteError } from "@/types/types";

import { create } from "zustand";

type BandStoreState = {
  showForm: boolean;
  isDeleting: boolean;
  selectedBand: BandWithDetails | null;
  deleteError: DeleteError | null;
  setShowForm: (showForm: boolean) => void;
  setIsDeleting: (isDeleting: boolean) => void;
  setSelectedBand: (selectedBand: BandWithDetails | null) => void;
  setDeleteError: (deleteError: DeleteError | null) => void;
};

const useBandStore = create<BandStoreState>((set) => ({
  showForm: false,
  isDeleting: false,
  selectedBand: null,
  deleteError: null,
  setShowForm: (showForm) => set({ showForm }),
  setIsDeleting: (isDeleting) => set({ isDeleting }),
  setSelectedBand: (selectedBand) => set({ selectedBand }),
  setDeleteError: (deleteError) => set({ deleteError }),
}));

export default useBandStore;
