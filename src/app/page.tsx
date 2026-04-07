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

  const description = asText(bloghome.data.description);
  const image = bloghome.data.image;
  const clients = clientsDoc.data.clientslist;

  return (
    <>
      {/* Hero */}
      <section className="mb-20">
        <div className="flex items-end gap-5 mb-3">
          {image.url && (
            <Image
              src={image.url}
              alt={image.alt ?? "Davide Ghezzi"}
              width={56}
              height={56}
              className="rounded-full shrink-0 mb-2"
              priority
            />
          )}
          <p className="text-sm text-neutral-400 mb-3">Hi, I&apos;m</p>
        </div>

        <h1 className="font-serif text-[clamp(4rem,12vw,7rem)] font-bold leading-none tracking-tight mb-8">
          Davide.
        </h1>

        <hr className="border-neutral-200 mb-8" />

        <p className="text-lg text-neutral-600 mb-3">{description}</p>

        <p className="text-sm text-neutral-400 mb-6">
          Currently Product Director{" "}
          <a
            href="https://www.bakeca.it"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b85fc] hover:underline underline-offset-2"
          >
            @Bakeca.it
          </a>
        </p>

        <div className="flex gap-6">
          <a
            href="https://github.com/davideghz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-neutral-400 hover:text-[#6b85fc] transition-colors"
            title="If you know what I'm talking about"
          >
            GitHub
          </a>
          <a
            href="https://it.linkedin.com/in/davideghezzi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-neutral-400 hover:text-[#6b85fc] transition-colors"
            title="If you don't"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* Clients */}
      <section className="mb-20">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs uppercase tracking-widest text-neutral-400">
            Clients
          </span>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>

        <p className="text-neutral-500 leading-relaxed">
          {clients.map((item: { client_name: string | null; client_link: Record<string, unknown> }, i: number) => {
            const url =
              "url" in item.client_link ? (item.client_link.url as string) : undefined;
            const isLast = i === clients.length - 1;
            return (
              <span key={i}>
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-700 hover:text-[#6b85fc] transition-colors"
                  >
                    {item.client_name}
                  </a>
                ) : (
                  <span className="text-neutral-700">{item.client_name}</span>
                )}
                {!isLast && (
                  <span className="text-neutral-300 mx-2">·</span>
                )}
              </span>
            );
          })}
        </p>
      </section>

      {/* Blog CTA */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs uppercase tracking-widest text-neutral-400">
            Writing
          </span>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>

        <Link
          href="/blog"
          className="group inline-flex items-baseline gap-3 hover:text-[#6b85fc] transition-colors"
        >
          <span className="font-serif text-2xl font-bold">
            Sometimes I post here my thoughts
          </span>
          <span className="text-[#6b85fc] text-xl transition-transform group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </section>
    </>
  );
}
