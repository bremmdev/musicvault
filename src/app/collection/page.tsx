export const revalidate = 0;

import React from "react";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function CollectionPage() {
  const session = await getServerSession(AuthOptions);

  return session ? (
    <div>Collection</div>
  ) : (
    <div className="text-center my-16 font-medium">
      Only admins are authorized to view this page
    </div>
  );
}
