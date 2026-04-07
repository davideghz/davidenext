import { createClient } from "@/lib/prismic";
import { asText } from "@prismicio/client";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 0 1-1.548-1.549 1.548 1.548 0 1 1 1.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.593 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z" />
    </svg>
  );
}

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
    <div className="pt-16 pb-20 sm:pt-20">
      <div className="mx-auto max-w-2xl">

        {/* Photo */}
        {image.url && (
          <div className="mb-6">
            <Image
              src={image.url}
              alt={image.alt ?? headline}
              width={80}
              height={80}
              className="rounded-full"
              priority
            />
          </div>
        )}

        {/* Headline block — h1 + h2 tightly coupled, no space between */}
        <div className="mb-4">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 leading-snug sm:text-5xl">
            {headline}
          </h1>
          <p className="text-2xl font-normal text-zinc-500 dark:text-zinc-400 leading-snug mt-1">
            {description}
          </p>
        </div>

        {/* Social icons — right after headline */}
        <div className="flex gap-3 mb-6">
          <a
            href="https://github.com/davideghz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="If you know what I'm talking about"
            className="group -m-1 p-1"
          >
            <GitHubIcon className="h-9 w-9 fill-indigo-500 transition group-hover:fill-indigo-600 dark:fill-indigo-400 dark:group-hover:fill-indigo-300" />
          </a>
          <a
            href="https://it.linkedin.com/in/davideghezzi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="If you don't"
            className="group -m-1 p-1"
          >
            <LinkedInIcon className="h-9 w-9 fill-indigo-500 transition group-hover:fill-indigo-600 dark:fill-indigo-400 dark:group-hover:fill-indigo-300" />
          </a>
        </div>

        {/* Role */}
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Currently Product Director at{" "}
          <a
            href="https://www.bakeca.it"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 dark:text-indigo-400 hover:underline underline-offset-2"
          >
            Bakeca.it
          </a>
          .
        </p>

        {/* Clients */}
        <div className="mb-10">
          <p className="text-base text-zinc-600 dark:text-zinc-400 mb-6">
            Over the last years I&apos;ve been lucky enough to work with these incredible people:
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {clients.map((item: { client_name: string | null; client_link: Record<string, unknown> }, i: number) => {
              const url =
                "url" in item.client_link
                  ? (item.client_link.url as string)
                  : undefined;
              return url ? (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-zinc-800 dark:bg-zinc-700 px-3 py-1 text-xs font-medium text-zinc-100 ring-1 ring-inset ring-zinc-700 dark:ring-zinc-600 hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
                >
                  {item.client_name}
                </a>
              ) : (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full bg-zinc-800 dark:bg-zinc-700 px-3 py-1 text-xs font-medium text-zinc-100 ring-1 ring-inset ring-zinc-700"
                >
                  {item.client_name}
                </span>
              );
            })}
          </div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 flex-wrap">
            Thanks for all the love
            <svg aria-hidden="true" viewBox="0 0 512 512" className="inline h-3.5 w-3.5 fill-red-400">
              <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 13.3 32.6 13.3 45.1 0l193.5-199.8c56.3-58.1 53-154.3-9.9-207.9z" />
            </svg>
            and coffee
            <svg aria-hidden="true" viewBox="0 0 640 512" className="inline h-3.5 w-4 fill-amber-600 dark:fill-amber-500">
              <path fill="currentColor" d="M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z"></path>
            </svg>
          </p>
        </div>

        {/* Blog link */}
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Sometimes I post{" "}
          <Link href="/blog" className="text-indigo-500 dark:text-indigo-400 hover:underline underline-offset-2">
            here
          </Link>{" "}
          my thoughts.
        </p>

      </div>
    </div>
  );
}
