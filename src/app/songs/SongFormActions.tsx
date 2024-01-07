import React from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

import { useSongStore } from "@/store/store";

const SongFormActions = () => {
  const { pending } = useFormStatus();

  const { setShowForm, setSelectedSong, isDeleting } = useSongStore();

  const handleCancel = () => {
    setShowForm(false);
    setSelectedSong(null);
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

export default SongFormActions;
