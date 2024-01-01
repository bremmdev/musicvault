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
import { Rating, Genre, Band } from "@prisma/client";
import createAlbum from "@/_actions/albums/create-album";
import MultiSelect from "react-select";
import { createAlbumSchema, updateAlbumSchema } from "@/lib/schema";
import AlbumFormActions from "./AlbumFormActions";
import updateAlbum from "@/_actions/albums/update-album";
import { useAlbumStore } from "@/store/store";
import { Button } from "../../components/ui/button";
import { PlusCircle } from "lucide-react";
import FormErrors from "@/components/ui/FormErrors";
import { set } from "zod";

type Props = {
  ratings: Array<Rating>;
  genres: Array<Genre>;
  bands: Array<Band>;
};

const CreateOrUpdateAlbumForm = ({ ratings, genres, bands }: Props) => {
  const { showForm, setShowForm, selectedAlbum, setDeleteError } =
    useAlbumStore();

  const formRef = React.useRef<HTMLFormElement>(null);
  const [formErrors, setFormErrors] = React.useState<Array<string> | string>(
    []
  );

  useEffect(() => {
    if (selectedAlbum) {
      (formRef.current as HTMLFormElement).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedAlbum]);

  useEffect(() => {
    if (showForm) {
      setFormErrors([]);
    }
  }, [showForm]);

  async function clientAction(formData: FormData) {
    setFormErrors([]);
    const rawData = Object.fromEntries(formData);

    const input = {
      ...rawData,
      id: rawData.id || null,
      genres: formData.getAll("genres"),
      imageUrl: null,
    };

    //schema and actionFunction are different depending on whether we're creating or updating
    const schema = input.id ? updateAlbumSchema : createAlbumSchema;
    const actionFunction = input.id ? updateAlbum : createAlbum;

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
        key={selectedAlbum?.id}
        ref={formRef}
      >
        {
          <h2 className="text-xl font-light mb-2 text-center">
            {selectedAlbum ? `Update ${selectedAlbum.title}` : "Add new album"}
          </h2>
        }
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="hidden"
            name="id"
            defaultValue={selectedAlbum?.id || ""}
          />
          <Select
            name="ratingId"
            defaultValue={selectedAlbum?.ratingId || undefined}
          >
            <SelectTrigger className="focus-visible:ring-offset-0 focus:ring-offset-0 md:max-w-[180px] hover:border-slate-400 data-[placeholder]:text-slate-400">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {ratings
                  .filter((rating) => rating.value !== "average")
                  .map((rating) => (
                    <SelectItem key={rating.id} value={rating.id}>
                      {rating.value}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            className="focus-visible:ring-offset-0 hover:border-slate-400 placeholder:text-slate-400"
            placeholder="title"
            name="title"
            defaultValue={selectedAlbum?.title || ""}
            type="text"
          />
          <Select
            name="bandId"
            defaultValue={selectedAlbum?.bandId || undefined}
          >
            <SelectTrigger className="focus-visible:ring-offset-0 focus:ring-offset-0 hover:border-slate-400 data-[placeholder]:text-slate-400">
              <SelectValue placeholder="Select band" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {bands.map((band) => (
                  <SelectItem key={band.id} value={band.id}>
                    {band.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            className="md:max-w-[180px] focus-visible:ring-offset-0 hover:border-slate-400 placeholder:text-slate-400"
            placeholder="year"
            name="yearReleased"
            defaultValue={selectedAlbum?.yearReleased || ""}
            type="text"
          />
        </div>
        <div className="-mt-2">
          <MultiSelect
            defaultValue={
              selectedAlbum?.genres.map((genre) => ({
                value: genre.id,
                label: genre.name,
              })) || []
            }
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "#e2e8f0" : "#e2e8f0",
                borderRadius: "0.375rem",
                fontSize: "14px",
                outline: state.isFocused ? "2px solid #020617" : "none",
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
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: "#94a3b8",
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
          <FormErrors errors={formErrors} title="Saving album failed" />
        )}
        <AlbumFormActions />
      </form>
    </div>
  ) : (
    <Button className="flex gap-2 w-fit mx-auto my-8" onClick={handleClick}>
      Add album <PlusCircle strokeWidth={2} size={20} />
    </Button>
  );
};

export default CreateOrUpdateAlbumForm;
