import React from "react";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "@/app/auth/[...nextauth]/options";

export default async function CollectionPage() {
  const session = await getServerSession(AuthOptions);
  const isAdmin = session?.user?.email === 'bremmdev@gmail.com'

  return isAdmin ? (
    <div>Collection</div>
  ) : (
    <div className="text-center my-16 font-medium">
      Only admins are authorized to view this page
    </div>
  );
}
