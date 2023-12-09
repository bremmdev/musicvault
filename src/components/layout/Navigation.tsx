"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import Separator from "../ui/Separator";
import Image from "next/image";
import Spinner from "../ui/Spinner";
import { Button } from "../ui/button";

const links = [
  { href: "/bands", label: "bands" },
  { href: "/albums", label: "albums" },
  { href: "/songs", label: "songs" },
  { href: "/collection", label: "collection" },
];

const Navigation = () => {
  const pathname = usePathname();
  const { data: session, status: authStatus } = useSession();
  const profileImage = session?.user?.image;

  const authContent =
    authStatus === "loading" ? (
      <div className="w-[80px] h-10 items-center flex justify-center">
        <Spinner width={20} />
      </div>
    ) : (
      <>
        {authStatus === "authenticated" ? (
          <Link
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 border bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-10 px-4 py-2 border-slate-400"
            href="/api/auth/signout"
          >
            <span>Sign out</span>
            {profileImage ? (
              <Image
                className="rounded-full ml-2"
                src={profileImage}
                width={24}
                height={24}
                alt="profile picture"
              />
            ) : null}
          </Link>
        ) : (
          <Button
            className="items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2 flex gap-2 w-fit"
            onClick={(() => signIn("github"))}
          >
            Admin
          </Button>
        )}
      </>
    );

  return (
    <header className="mx-auto bg-gradient-to-r from-slate-200 via-slate-50 to-slate-200 py-5">
      <nav className="w-11/12 max-w-7xl mx-auto relative flex flex-col gap-4 sm:flex-row items-center justify-center">
        <ul className="flex justify-center gap-2 sm:gap-4 text-base md:text-lg font-light">
          {links.map(({ href, label }, idx) => {
            const isActive = href.startsWith(pathname);
            return (
              <React.Fragment key={label}>
                <li>
                  <Link
                    href={href}
                    className={`nav-link ${
                      isActive ? "font-medium" : ""
                    } relative`}
                  >
                    {label}
                  </Link>
                </li>
                {idx !== links.length - 1 ? <Separator /> : null}
              </React.Fragment>
            );
          })}
        </ul>
        <div className="sm:absolute sm:right-0 flex justify-center">
          {authContent}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
