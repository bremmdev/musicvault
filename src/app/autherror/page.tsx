import React from "react";
import Link from "next/link";

const AuthError = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const error =
    searchParams.error === "AccessDenied"
      ? "Only admins can sign in"
      : "An error occurred while trying to authenticate you. Please try again.";

  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="text-base font-bold text-rose-600 text-center mt-12 mb-6">
        {error}
      </h1>
      <Link className="w-fit h-10 px-4 py-2 bg-slate-900 text-slate-50 hover:bg-slate-900/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300" href="/">Home</Link>
    </div>
  );
};

export default AuthError;
