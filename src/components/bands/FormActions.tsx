import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

import useBandStore from "@/store/bands";

const FormActions = () => {
  const { pending } = useFormStatus();

  const { setShowForm, setSelectedBand, isDeleting } = useBandStore();

  const handleCancel = () => {
    setShowForm(false);
    setSelectedBand(null);
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

export default FormActions;
