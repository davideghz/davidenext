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
      <header className="max-w-2xl">
        <Link
          href="/"
          className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
        >
          ← Davide Ghezzi
        </Link>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Writing on software, products, and whatever else is on my mind.
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          All my thoughts in long form.
        </p>
      </header>

      <div className="mt-16 sm:mt-20">
        <div className="flex max-w-3xl flex-col space-y-16">
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
  );
}
