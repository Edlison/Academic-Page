import { FOOTER_CONTENT } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-auto w-full">
      <div className="flex flex-row items-center justify-center max-w-screen-lg h-48 mx-auto px-4 sm:px-6">
        <p className="text-xs leading-[60px] bg-clip-text text-center font-black">
          {FOOTER_CONTENT}
        </p>
      </div>
    </footer>
  );
}
