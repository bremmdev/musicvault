"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Separator from "../ui/Separator";

const links = [
  { href: "/bands", label: "bands" },
  { href: "/albums", label: "albums" },
  { href: "/songs", label: "songs" },
  { href: "/collection", label: "collection" },
];

const Navigation = () => {

  const pathname = usePathname();

  return (
    <nav className="mx-auto bg-gradient-to-r from-slate-200 via-slate-50 to-slate-200 py-5">
      <ul className="flex justify-center gap-2 sm:gap-4 text-base sm:text-lg font-light">
        {links.map(({ href, label }, idx) => {
          const isActive = href.startsWith(pathname);
          return (
            <React.Fragment key={label}>
              <li>
                <Link href={href} className={`nav-link ${isActive ? 'font-medium' : '' } relative`}>
                  {label}
                </Link>
              </li>
              {idx !== links.length - 1 ? <Separator /> : null}
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
