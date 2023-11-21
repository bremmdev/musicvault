import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormActions = ({ setShowForm }: Props) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center gap-4">
      <Button
        type="button"
        variant={"outline"}
        className="border-slate-400"
        onClick={() => setShowForm(false)}
      >
        Cancel
      </Button>
      <Button type="submit" className="disabled:opacity-50" disabled={pending}>
        {pending ? "Adding..." : "Add"}
      </Button>
    </div>
  );
};

export default FormActions;
