import CreateOrUpdateAlbumForm from "./CreateOrUpdateAlbumForm";
import { getCreateOrUpdateDataDTO } from "@/lib/db-actions";

export default async function CreateOrUpdateAlbum() {
  const data = await getCreateOrUpdateDataDTO(true);

  if (!data) {
    return null;
  }

  const { ratings, genres, bands } = data;

  return (
    <CreateOrUpdateAlbumForm ratings={ratings} genres={genres} bands={bands || []} />
  );
}
