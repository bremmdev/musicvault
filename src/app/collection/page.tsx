import React from "react";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "@/app/auth/[...nextauth]/route";

export default async function CollectionPage() {
  const session = await getServerSession(AuthOptions);
  const isAdmin = session?.user?.isAdmin

  return isAdmin ? (
    <div>Collection</div>
  ) : (
    <div className="text-center my-16 font-medium">
      Only admins are authorized to view this page
    </div>
  );
}
