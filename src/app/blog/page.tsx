import { createClient } from "@/lib/prismic";
import { asText } from "@prismicio/client";
import Link from "next/link";

export const revalidate = 3600;

export const metadata = {
  title: "Writing — Davide Ghezzi",
};

function formatDate(dateString: string | null) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const client = createClient();
  const posts = await client.getAllByType("post", {
    orderings: [{ field: "my.post.date", direction: "desc" }],
  });

  return (
    <div className="pt-16 pb-20 sm:pt-20">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/"
            aria-label="Go back to home"
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 hover:shadow-zinc-800/10 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
            >
              <path d="M7.25 11.25 4.75 8l2.5-3.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.25 8H4.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <header>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              Writing on software, products, and whatever else is on my mind.
            </h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              All my thoughts in long form.
            </p>
          </header>

        <div className="mt-16 sm:mt-20">
        <div className="flex flex-col space-y-16">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group relative flex flex-col items-start md:grid md:grid-cols-4 md:items-baseline"
            >
              <div className="md:col-span-3 md:border-l md:border-zinc-100 md:dark:border-zinc-700/40 md:pl-6">
                <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
                <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                  <Link href={`/blog/${post.uid}`}>
                    <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                    <span className="relative z-10">{asText(post.data.title)}</span>
                  </Link>
                </h2>
                <time
                  dateTime={post.data.date ?? ""}
                  className="relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm text-zinc-400 dark:text-zinc-500 md:hidden"
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
              </div>
              <time
                dateTime={post.data.date ?? ""}
                className="relative z-10 mt-1 mb-3 hidden md:block text-sm text-zinc-400 dark:text-zinc-500"
              >
                {formatDate(post.data.date)}
              </time>
            </article>
          ))}
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
