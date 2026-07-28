import { SITE_TITLE } from "@/lib/config";

import { Menus } from "./menus";
import { ScrambleLink } from "./scramble-link";

export function Header() {
  return (
    <header className="sticky z-50 top-0 bg-white/80 backdrop-blur-xl transition-all select-none">
      <div className="flex flex-row gap-8 items-center justify-between max-w-screen-lg mx-auto h-24 px-4 sm:px-6">
        <div className="flex flex-row gap-4">
          <ScrambleLink label={SITE_TITLE} />
        </div>
        <Menus />
      </div>
    </header>
  );
}
