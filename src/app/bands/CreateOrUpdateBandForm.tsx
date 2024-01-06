"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Rating, Genre } from "@prisma/client";
import createBand from "@/_actions/bands/create-band";
import { createBandSchema, updateBandSchema } from "@/lib/schema";
import BandFormActions from "./BandFormActions";
import updateBand from "@/_actions/bands/update-band";
import { useBandStore } from "@/store/store";
import { Button } from "../../components/ui/button";
import { PlusCircle } from "lucide-react";
import FormErrors from "@/components/ui/FormErrors";
import MultiSelectInput from "@/components/table/MultiSelectInput";
import useForm from "@/hooks/useForm";

type Props = {
  ratings: Array<Rating>;
  genres: Array<Genre>;
};

const CreateOrUpdateForm = ({ ratings, genres }: Props) => {
  const { showForm, setShowForm, selectedBand, setDeleteError } =
    useBandStore();

  const { formRef, formErrors, setFormErrors } = useForm({
    selectedItem: selectedBand,
    showForm,
  });

  async function clientAction(formData: FormData) {
    setFormErrors([]);
    const rawData = Object.fromEntries(formData);

    const input = {
      ...rawData,
      id: rawData.id || null,
      disbandedIn: rawData.disbandedIn || null,
      lastChecked: rawData.lastChecked
        ? new Date(rawData.lastChecked as string)
        : null,
      genres: formData.getAll("genres"),
    };

    //schema and actionFunction are different depending on whether we're creating or updating
    const schema = input.id ? updateBandSchema : createBandSchema;
    const actionFunction = input.id ? updateBand : createBand;

    const parsed = schema.safeParse(input);
    if (parsed.success) {
      const res = await actionFunction(parsed.data);
      if (res?.error) {
        setFormErrors(res.error);
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

  const handleClick = () => {
    setDeleteError(null);
    setShowForm(true);
    setFormErrors([]);
  };

  return showForm ? (
    <div className="my-8 flex mb-16">
      <form
        action={clientAction}
        className="flex flex-col gap-4 bg-slate-50 p-8 rounded-md max-w-5xl w-full mx-auto"
        key={selectedBand?.id}
        ref={formRef}
      >
        {
          <h2 className="text-xl font-light mb-2 text-center">
            {selectedBand ? `Update ${selectedBand.name}` : "Add new band"}
          </h2>
        }
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="hidden"
            name="id"
            defaultValue={selectedBand?.id || ""}
          />
          <Select
            name="ratingId"
            defaultValue={selectedBand?.ratingId || undefined}
          >
            <SelectTrigger className="focus-visible:ring-offset-0 focus:ring-offset-0 md:max-w-[180px] hover:border-slate-400 data-[placeholder]:text-slate-400">
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
            className="focus-visible:ring-offset-0 hover:border-slate-400 placeholder:text-slate-400"
            placeholder="name"
            name="name"
            defaultValue={selectedBand?.name || ""}
            type="text"
          />
          <Input
            className="focus-visible:ring-offset-0 hover:border-slate-400 placeholder:text-slate-400"
            placeholder="country"
            name="country"
            defaultValue={selectedBand?.country || ""}
            type="text"
          />
          <Input
            className="md:max-w-[180px] focus-visible:ring-offset-0 hover:border-slate-400 placeholder:text-slate-400"
            placeholder="formed in year"
            name="formedIn"
            defaultValue={selectedBand?.formedIn || ""}
            type="text"
          />
          <Input
            className="md:max-w-[180px] focus-visible:ring-offset-0 hover:border-slate-400 placeholder:text-slate-400"
            placeholder="disbanded in year"
            name="disbandedIn"
            defaultValue={selectedBand?.disbandedIn || ""}
            type="text"
          />
          <Input
            className="md:max-w-[180px] focus-visible:ring-offset-0 hover:border-slate-400 placeholder:text-slate-400"
            name="lastChecked"
            defaultValue={
              selectedBand?.lastChecked?.toISOString().split("T")[0] || ""
            }
            type="date"
          />
        </div>
        <div className="-mt-2">
          <MultiSelectInput
            defaultValue={
              selectedBand?.genres.map((genre) => ({
                value: genre.id,
                label: genre.name,
              })) || []
            }
            options={genreOptions}
            placeholder="Genres"
            name="genres"
          />
        </div>
        {formErrors.length > 0 && (
          <FormErrors errors={formErrors} title="Saving band failed" />
        )}
        <BandFormActions />
      </form>
    </div>
  ) : (
    <Button className="flex gap-2 w-fit mx-auto my-8" onClick={handleClick}>
      Add band <PlusCircle strokeWidth={2} size={20} />
    </Button>
  );
};

export default CreateOrUpdateForm;
