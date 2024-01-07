"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Rating, Genre, Band, Album } from "@prisma/client";
import createSong from "@/_actions/songs/create-song";
import { createSongSchema, updateSongSchema } from "@/lib/schema";
import SongFormsActions from "./SongFormActions";
import updateSong from "@/_actions/songs/update-song";
import { useSongStore } from "@/store/store";
import { Button } from "../../components/ui/button";
import { PlusCircle } from "lucide-react";
import FormErrors from "@/components/ui/FormErrors";
import MultiSelectInput from "@/components/table/MultiSelectInput";
import useForm from "@/hooks/useForm";

type Props = {
  ratings: Array<Rating>;
  genres: Array<Genre>;
  bands: Array<Band>;
  albums: Array<Album>;
};

const CreateOrUpdateSongForm = ({ ratings, genres, bands, albums }: Props) => {
  const { showForm, setShowForm, selectedSong, setDeleteError } =
    useSongStore();

  //use key to force re-render of album select when band changes
  const [selectedBandId, setSelectedbandId] = React.useState("");

  const { formRef, formErrors, setFormErrors } = useForm({
    selectedItem: selectedSong,
    showForm,
  });

  async function clientAction(formData: FormData) {
    setFormErrors([]);
    const rawData = Object.fromEntries(formData);

    const input = {
      ...rawData,
      id: rawData.id || null,
      //band is disabled when updating, so we need to get the bandId from the selected song
      bandId: rawData.bandId || selectedSong?.bandId,
      genres: formData.getAll("genres"),
    };

    //schema and actionFunction are different depending on whether we're creating or updating
    const schema = input.id ? updateSongSchema : createSongSchema;
    const actionFunction = input.id ? updateSong : createSong;

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

  const handleBandChange = (bandId: string) => {
    setSelectedbandId(bandId);
  };

  //only show albums from the selected band, or from the selected song's band
  const availableAlbums = selectedSong
    ? albums.filter((album) => album.bandId === selectedSong.bandId)
    : selectedBandId
    ? albums.filter((album) => album.bandId === selectedBandId)
    : [];

  return showForm ? (
    <div className="my-8 flex mb-16">
      <form
        action={clientAction}
        className="flex flex-col gap-4 bg-slate-50 p-8 rounded-md max-w-5xl w-full mx-auto"
        key={selectedSong?.id}
        ref={formRef}
      >
        {
          <h2 className="text-xl font-light mb-2 text-center">
            {selectedSong ? `Update ${selectedSong.title}` : "Add new song"}
          </h2>
        }
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="hidden"
            name="id"
            defaultValue={selectedSong?.id || ""}
          />
          <Select
            name="ratingId"
            defaultValue={selectedSong?.ratingId || undefined}
          >
            <SelectTrigger className="focus-visible:ring-offset-0 focus:ring-offset-0 md:max-w-[180px] hover:border-slate-400 data-[placeholder]:text-slate-400">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {ratings
                  .filter((rating) => rating.value !== "good")
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
            defaultValue={selectedSong?.title || ""}
            type="text"
          />
          <Select
            name="bandId"
            defaultValue={selectedSong?.bandId || undefined}
            onValueChange={(value) => handleBandChange(value)}
            disabled={!!selectedSong}
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
          <Select
            name="albumId"
            defaultValue={selectedSong?.albumId || undefined}
            key={selectedBandId}
          >
            <SelectTrigger className="focus-visible:ring-offset-0 focus:ring-offset-0 hover:border-slate-400 data-[placeholder]:text-slate-400">
              <SelectValue placeholder="Select album" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availableAlbums.map((album) => (
                  <SelectItem key={album.id} value={album.id}>
                    {album.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            className="md:max-w-[180px] focus-visible:ring-offset-0 hover:border-slate-400 placeholder:text-slate-400"
            placeholder="year"
            name="yearReleased"
            defaultValue={selectedSong?.yearReleased || ""}
            type="text"
          />
        </div>
        <div className="-mt-2">
          <MultiSelectInput
            defaultValue={
              selectedSong?.genres.map((genre) => ({
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
          <FormErrors errors={formErrors} title="Saving song failed" />
        )}
        <SongFormsActions />
      </form>
    </div>
  ) : (
    <Button className="flex gap-2 w-fit mx-auto my-8" onClick={handleClick}>
      Add song <PlusCircle strokeWidth={2} size={20} />
    </Button>
  );
};

export default CreateOrUpdateSongForm;
