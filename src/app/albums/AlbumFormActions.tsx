import React from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

import { useAlbumStore } from "@/store/store";

const AlbumFormActions = () => {
  const { pending } = useFormStatus();

  const { setShowForm, setSelectedAlbum, isDeleting } = useAlbumStore();

  const handleCancel = () => {
    setShowForm(false);
    setSelectedAlbum(null);
  };

  return (
    <div className="flex justify-center gap-4">
      <Button
        type="button"
        variant={"outline"}
        className="border-slate-400"
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="disabled:opacity-50 font-medium"
        disabled={pending || isDeleting}
      >
        {pending ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};

export default AlbumFormActions;
