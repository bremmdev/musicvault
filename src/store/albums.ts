import { AlbumWithDetails } from "@/types/types";
import { DeleteError } from "@/types/types";

import { create } from "zustand";

type AlbumStoreState = {
  showForm: boolean;
  isDeleting: boolean;
  selectedAlbum: AlbumWithDetails | null;
  deleteError: DeleteError | null;
  setShowForm: (showForm: boolean) => void;
  setIsDeleting: (isDeleting: boolean) => void;
  setSelectedAlbum: (selectedAlbum: AlbumWithDetails | null) => void;
  setDeleteError: (deleteError: DeleteError | null) => void;
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
}));

export default useAlbumStore;
