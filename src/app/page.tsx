import { createClient } from "@/lib/prismic";
import { asText } from "@prismicio/client";
import type { WorkHomeDocument } from "@/types/prismic";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

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

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}

function formatDate(dateString: string | null) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function HomePage() {
  const client = createClient();

  const [bloghome, clientsDoc, posts] = await Promise.all([
    client.getSingle("bloghome"),
    client.getSingle("clientslist"),
    client.getAllByType("post", {
      orderings: [{ field: "my.post.date", direction: "desc" }],
      limit: 3,
    }),
  ]);

  let workItems: WorkHomeDocument["data"]["work_history"] = [];
  try {
    const workDoc = (await client.getSingle("workhome")) as WorkHomeDocument;
    workItems = workDoc.data.work_history;
  } catch {
    // custom type not created yet
  }

  const headline = asText(bloghome.data.headline);
  const description = asText(bloghome.data.description);
  const image = bloghome.data.image;
  const clients = clientsDoc.data.clientslist;

  return (
    <>
      {/* Hero */}
      <div className="pt-16 pb-12 sm:pt-20">
        {image.url && (
          <div className="mb-8">
            <Image
              src={image.url}
              alt={image.alt ?? headline}
              width={64}
              height={64}
              className="rounded-full"
              priority
            />
          </div>
        )}
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {headline}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {description}{" "}
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
          <div className="mt-6 flex gap-6">
            <a
              href="https://github.com/davideghz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="If you know what I'm talking about"
              className="group -m-1 p-1"
            >
              <GitHubIcon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
            </a>
            <a
              href="https://it.linkedin.com/in/davideghezzi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="If you don't"
              className="group -m-1 p-1"
            >
              <LinkedInIcon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Two-column main content */}
      <div className="grid grid-cols-1 gap-y-20 pb-20 lg:grid-cols-[1fr_320px] lg:gap-x-16">
        {/* Left: Recent posts */}
        <div className="flex flex-col gap-16">
          {posts.map((post) => (
            <article key={post.id} className="group relative flex flex-col items-start">
              <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
              <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
                <Link href={`/blog/${post.uid}`}>
                  <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                  <span className="relative z-10">{asText(post.data.title)}</span>
                </Link>
              </h2>
              <time
                dateTime={post.data.date ?? ""}
                className="relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm text-zinc-400 dark:text-zinc-500"
              >
                <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                </span>
                {formatDate(post.data.date)}
              </time>
              {post.data.tags && post.data.tags.length > 0 && (
                <div className="relative z-10 mt-2 flex flex-wrap gap-1.5">
                  {post.data.tags.map((t: { tag: string | null }, i: number) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400"
                    >
                      {t.tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="relative z-10 mt-4 flex items-center text-sm font-medium text-indigo-500 dark:text-indigo-400">
                Read article
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="ml-1 h-4 w-4 stroke-current"
                >
                  <path
                    d="M6.75 5.75 9.25 8l-2.5 2.25"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </article>
          ))}

          <div className="flex justify-end">
            <Link
              href="/blog"
              className="group flex items-center text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            >
              All articles
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="ml-1 h-4 w-4 stroke-current transition-transform group-hover:translate-x-0.5"
              >
                <path
                  d="M6.75 5.75 9.25 8l-2.5 2.25"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-10 lg:pl-4">
          {/* Work history */}
          {workItems.length > 0 && (
            <div className="rounded-2xl border border-zinc-100 dark:border-zinc-700/40 p-6">
              <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100 items-center gap-2">
                <BriefcaseIcon className="h-6 w-6 flex-none" />
                Work
              </h2>
              <ol className="mt-6 space-y-4">
                {workItems.map((item, i) => {
                  const logoUrl =
                    item.logo && "url" in item.logo ? (item.logo as { url?: string }).url : undefined;
                  return (
                    <li key={i} className="flex gap-4">
                      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                        {logoUrl ? (
                          <Image
                            src={logoUrl}
                            alt={item.company ?? ""}
                            width={32}
                            height={32}
                            className="h-7 w-7 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                            {item.company?.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <dl className="flex flex-auto flex-wrap gap-x-2">
                        <dt className="sr-only">Company</dt>
                        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {item.company}
                        </dd>
                        <dt className="sr-only">Role</dt>
                        <dd className="text-xs text-zinc-500 dark:text-zinc-400">{item.role}</dd>
                        <dt className="sr-only">Date</dt>
                        <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
                          {item.start_date}
                          {" — "}
                          {item.end_date || "Present"}
                        </dd>
                      </dl>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {/* Clients */}
          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-700/40 p-6">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Clients
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
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
          </div>
        </div>
      </div>
    </>
  );
}
