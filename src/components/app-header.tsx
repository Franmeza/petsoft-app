"use client";

import Image from "next/image";
import logo from "../../public/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
  },
  {
    label: "Account",
    path: "/app/account",
  },
];

function AppHeader() {
  const activePathName = usePathname();

  return (
    <header className="flex justify-between items-center border-b border-white/10 py-2 ">
      <Image src={logo} alt="logo" />
      <nav>
        <ul className="flex gap-2 text-xs">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={`text-white/70 rounded-sm px-2 py-1 hover:text-white focus:text-white transition ${
                  route.path === activePathName ? "bg-black/10 text-white" : ""
                }`}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
