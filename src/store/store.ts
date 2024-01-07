import { create } from "zustand";
import { DeleteError } from "@/types/types";
import {
  BandWithDetails,
  AlbumWithDetails,
  SongWithDetails,
} from "@/types/types";

export type CommonStoreState = {
  showForm: boolean;
  isDeleting: boolean;
  deleteError: DeleteError | null;
  setShowForm: (showForm: boolean) => void;
  setIsDeleting: (isDeleting: boolean) => void;
  setDeleteError: (deleteError: DeleteError | null) => void;
  tableHeaders: Array<string>;
};

type BandStoreState = CommonStoreState & {
  selectedBand: BandWithDetails | null;
  setSelectedBand: (selectedBand: BandWithDetails | null) => void;
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
  tableHeaders: ["Rating", "Name", "Country", "Years Active", "Genres", "Last Checked"],
}));

type AlbumStoreState = CommonStoreState & {
  selectedAlbum: AlbumWithDetails | null;
  setSelectedAlbum: (selectedAlbum: AlbumWithDetails | null) => void;
};

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

type SongStoreState = CommonStoreState & {
  selectedSong: SongWithDetails | null;
  setSelectedSong: (selectedSong: SongWithDetails | null) => void;
};

const useSongStore = create<SongStoreState>((set) => ({
  showForm: false,
  isDeleting: false,
  selectedSong: null,
  deleteError: null,
  setShowForm: (showForm) => set({ showForm }),
  setIsDeleting: (isDeleting) => set({ isDeleting }),
  setSelectedSong: (selectedSong) => set({ selectedSong }),
  setDeleteError: (deleteError) => set({ deleteError }),
  tableHeaders: ["Rating", "Title", "Band", "Album", "Year", "Genres"],
}));

export { useBandStore, useAlbumStore, useSongStore };
