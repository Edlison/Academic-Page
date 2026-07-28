import Link from "next/link";

import { MENUS } from "@/lib/config";

export function Menus() {
  return (
    <nav aria-label="Primary" className="flex flex-row gap-4 nav-links">
      {MENUS.map((item) =>
        item.link.startsWith("http") ? (
          <a
            className="h-full text-sm"
            href={item.link}
            key={item.link}
            rel="noopener noreferrer"
            target={item.target}
          >
            {item.title}
          </a>
        ) : (
          <Link
            className="h-full text-sm"
            href={item.link}
            key={item.link}
            target={item.target}
          >
            {item.title}
          </Link>
        ),
      )}
    </nav>
  );
}
