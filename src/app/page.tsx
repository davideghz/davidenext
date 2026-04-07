import { createClient } from "@/lib/prismic";
import { asText } from "@prismicio/client";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

export default async function HomePage() {
  const client = createClient();

  const [bloghome, clientsDoc] = await Promise.all([
    client.getSingle("bloghome"),
    client.getSingle("clientslist"),
  ]);

  const headline = asText(bloghome.data.headline);
  const description = asText(bloghome.data.description);
  const image = bloghome.data.image;
  const clients = clientsDoc.data.clientslist;

  return (
    <>
      {/* Hero */}
      <section className="mb-16">
        <div className="flex items-center gap-5 mb-5">
          {image.url && (
            <Image
              src={image.url}
              alt={image.alt ?? headline}
              width={72}
              height={72}
              className="rounded-full shrink-0"
              priority
            />
          )}
          <div>
            <h1 className="font-serif text-3xl font-bold leading-tight">
              {headline}
            </h1>
            <p className="text-neutral-500 mt-1">{description}</p>
          </div>
        </div>

        <p className="text-sm text-neutral-500 mb-4">
          Currently Product Director{" "}
          <a
            href="https://www.bakeca.it"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b85fc] hover:underline"
          >
            @Bakeca.it
          </a>
        </p>

        <div className="flex gap-5">
          <a
            href="https://github.com/davideghz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-[#6b85fc] transition-colors"
            title="If you know what I'm talking about"
          >
            GitHub
          </a>
          <a
            href="https://it.linkedin.com/in/davideghezzi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-[#6b85fc] transition-colors"
            title="If you don't"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* Clients */}
      <section className="mb-16">
        <h2 className="font-serif text-base text-neutral-400 mb-5">
          Companies I&apos;ve worked with
        </h2>
        <div className="flex flex-wrap gap-2">
          {clients.map((item: { client_name: string | null; client_link: Record<string, unknown> }, i: number) => {
            const url =
              "url" in item.client_link ? item.client_link.url : undefined;
            return url ? (
              <a
                key={i}
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 text-sm rounded-full border border-neutral-200 text-neutral-600 hover:border-[#6b85fc] hover:text-[#6b85fc] transition-colors"
              >
                {item.client_name}
              </a>
            ) : (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full border border-neutral-200 text-neutral-600"
              >
                {item.client_name}
              </span>
            );
          })}
        </div>
      </section>

      {/* Blog CTA */}
      <section>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-neutral-500 hover:text-[#6b85fc] transition-colors"
        >
          <span>Sometimes I post here my thoughts</span>
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </section>
    </>
  );
}
