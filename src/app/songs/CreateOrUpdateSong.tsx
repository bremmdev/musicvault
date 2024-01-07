import CreateOrUpdateSongForm from "./CreateOrUpdateSongForm";
import { getCreateOrUpdateDataDTO } from "@/lib/db-actions";

export default async function CreateOrUpdateAlbum() {
  const data = await getCreateOrUpdateDataDTO(true);

  if (!data) {
    return null;
  }

  const { ratings, genres, bands, albums } = data;

  return (
    <CreateOrUpdateSongForm ratings={ratings} genres={genres} bands={bands || []} albums={albums || []}/>
  );
}
