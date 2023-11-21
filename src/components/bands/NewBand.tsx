"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { Rating, Genre, Prisma } from "@prisma/client";
import createBand from "@/_actions/create-band";
import MultiSelect from "react-select";

import { createBandSchema } from "@/lib/schema";
import FormActions from "./FormActions";
type Props = {
  ratings: Array<Rating>;
  genres: Array<Genre>;
};

type Status = "idle" | "pending" | "success" | "error";

export default function NewBand({ ratings, genres }: Props) {
  const [showForm, setShowForm] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [formErrors, setFormErrors] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    if (showForm) {
      setFormErrors([]);
    }
  }, [showForm]);

  async function clientAction(formData: FormData) {
    setFormErrors([]);
    const rawData = Object.fromEntries(formData);
    const input = {
      ...rawData,
      disbandedIn: rawData.disbandedIn || null,
      genres: formData.getAll("genres"),
    };

    //parse the formData to the schema
    const parsed = createBandSchema.safeParse(input);
    if (parsed.success) {
      const res = await createBand(parsed.data);
      if (res?.errors) {
        setFormErrors(res.errors);
        return;
      }
      setFormErrors([]);
      formRef.current?.reset();
      setShowForm(false);
    } else {
      setFormErrors(parsed.error.issues.map((issue) => issue.message));
    }
  }

  const genreOptions = genres.map((genre) => ({
    value: genre.id,
    label: genre.name,
  }));

  return (
    <div className="my-8 flex mb-16">
      {showForm ? (
        <form
          action={clientAction}
          className="flex flex-col gap-4 bg-slate-50 p-8 rounded-md max-w-5xl w-full mx-auto"
          ref={formRef}
        >
          <div className="flex flex-col md:flex-row gap-2">
            <Select name="ratingId">
              <SelectTrigger className="focus-visible:ring-offset-0 focus:ring-offset-0 md:max-w-[180px] hover:border-slate-400">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {ratings.map((rating) => (
                    <SelectItem key={rating.id} value={rating.id}>
                      {rating.value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Input
              className="focus-visible:ring-offset-0 hover:border-slate-400 placeholder:text-slate-300"
              placeholder="Name"
              name="name"
              type="text"
            />
            <Input
              className="focus-visible:ring-offset-0 hover:border-slate-400 placeholder:text-slate-300"
              placeholder="Country"
              name="country"
              type="text"
            />
            <Input
              className="md:max-w-[180px] focus-visible:ring-offset-0 hover:border-slate-400 placeholder:text-slate-300"
              placeholder="formed in"
              name="formedIn"
              type="text"
            />
            <Input
              className="md:max-w-[180px] focus-visible:ring-offset-0 hover:border-slate-400 placeholder:text-slate-300"
              placeholder="disbanded in"
              name="disbandedIn"
              type="text"
            />
          </div>
          <div className="-mt-2">
            <MultiSelect
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? "#e2e8f0" : "#e2e8f0",
                  borderRadius: "0.375rem",
                  fontSize: "14px",
                  outline: state.isFocused ? "2px solid #020617" : "none",
                  // This line disable the blue border
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#94a3b8",
                  },
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  fontSize: "14px",
                  backgroundColor: state.isFocused ? "#f1f5f9" : "#fff",
                }),
              }}
              options={genreOptions}
              isMulti={true}
              className="text-slate-950 shrink-0 w-full block"
              placeholder="Genres"
              name="genres"
            />
          </div>
          {formErrors.length > 0 && (
            <div className="flex flex-col gap-2 text-sm text-rose-600 font-medium">
              <div>Adding band failed:</div>
              <ul className="list-disc pl-4">
                {formErrors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <FormActions setShowForm={setShowForm} />
        </form>
      ) : (
        <Button
          className="flex gap-2 w-fit mx-auto"
          onClick={() => setShowForm((prev) => !prev)}
        >
          Add band <PlusCircle strokeWidth={2} size={20} />
        </Button>
      )}
    </div>
  );
}
