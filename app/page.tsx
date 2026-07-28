import Image from "next/image";

import BioContent from "@/content/home/bio.mdx";
import ContactContent from "@/content/home/contact.mdx";
import MiscContent from "@/content/home/misc.mdx";
import NewsContent from "@/content/home/news.mdx";
import PubsContent from "@/content/home/pubs.mdx";
import { Section } from "@/components/section";

export default function HomePage() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="w-32 h-40 overflow-hidden rounded-lg shadow-black relative">
            <Image
              alt="Avatar"
              className="object-cover"
              fill
              priority
              sizes="128px"
              src="/blshen.jpg"
            />
          </div>
          <div>
            <ContactContent />
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="text-2xl font-bold mb-4">Bio</h2>
          <div>
            <BioContent />
          </div>
        </div>
      </div>

      <Section className="mt-12" title="News">
        <NewsContent />
      </Section>

      <Section className="mt-12" title="Publications">
        <PubsContent />
      </Section>

      <Section className="mt-12" title="Misc">
        <MiscContent />
      </Section>
    </div>
  );
}
