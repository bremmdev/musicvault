import CreateOrUpdateBandForm from "./CreateOrUpdateBandForm";
import { getCreateOrUpdateDataDTO } from "@/lib/db-actions";

export default async function CreateOrUpdateBand() {
  const data = await getCreateOrUpdateDataDTO();

  if (!data) {
    return null;
  }

  const { ratings, genres } = data;

  return <CreateOrUpdateBandForm ratings={ratings} genres={genres} />;
}