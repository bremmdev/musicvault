import { create } from "zustand";
import { DeleteError } from "@/types/types";
import { AlbumWithDetails } from "@/types/types";
import { BandWithDetails } from "@/types/types";

export type CommonStoreState = {
  showForm: boolean;
  isDeleting: boolean;
  deleteError: DeleteError | null;
  setShowForm: (showForm: boolean) => void;
  setIsDeleting: (isDeleting: boolean) => void;
  setDeleteError: (deleteError: DeleteError | null) => void;
  tableHeaders: Array<string>;
};

type AlbumStoreState = CommonStoreState & {
  selectedAlbum: AlbumWithDetails | null;
  setSelectedAlbum: (selectedAlbum: AlbumWithDetails | null) => void;
}

const useAlbumStore = create<AlbumStoreState>((set) => ({
 showForm: false,
 isDeleting: false,
 selectedAlbum: null,
 deleteError: null,
 setShowForm: (showForm) => set({ showForm }),
 setIsDeleting: (isDeleting) => set({ isDeleting }),
 setSelectedAlbum: (selectedAlbum) => set({ selectedAlbum }),
 setDeleteError: (deleteError) => set({ deleteError }),
 tableHeaders: ["Rating", "Title", "Band", "Country", "Year", "Genres"],
}));

type BandStoreState = CommonStoreState & {
  selectedBand: BandWithDetails | null;
  setSelectedBand: (selectedBand: BandWithDetails | null) => void;
}

const useBandStore = create<BandStoreState>((set) => ({
  showForm: false,
  isDeleting: false,
  selectedBand: null,
  deleteError: null,
  setShowForm: (showForm) => set({ showForm }),
  setIsDeleting: (isDeleting) => set({ isDeleting }),
  setSelectedBand: (selectedBand) => set({ selectedBand }),
  setDeleteError: (deleteError) => set({ deleteError }),
  tableHeaders: ["Rating", "Name", "Country", "Years Active", "Genres", "Last Checked"],
}));

export { useAlbumStore, useBandStore };