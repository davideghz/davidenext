import { createClient } from "@/lib/prismic";
import { asText } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import type { PostDocument } from "@/types/prismic";
import Link from "next/link";
import { notFound } from "next/navigation";

function parseCodeBlock(raw: string): { lang: string; code: string } {
  const lines = raw.split("\n");
  if (lines[0].startsWith("```")) {
    const lang = lines[0].slice(3).trim();
    const end = lines[lines.length - 1].trim() === "```" ? -1 : undefined;
    return { lang, code: lines.slice(1, end).join("\n") };
  }
  return { lang: "", code: raw };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const client = createClient();
  const posts = await client.getAllByType("post");
  return posts.map((post) => ({ uid: post.uid }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const client = createClient();
  try {
    const post = await client.getByUID("post", uid);
    return {
      title: `${asText((post as PostDocument).data.title)} — Davide Ghezzi`,
    };
  } catch {
    return { title: "Post — Davide Ghezzi" };
  }
}

function formatDate(dateString: string | null) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const client = createClient();

  let post: PostDocument;
  try {
    post = (await client.getByUID("post", uid)) as PostDocument;
  } catch {
    notFound();
  }

  const { title, date, tags, body } = post.data;

  return (
    <div className="pt-16 pb-20 sm:pt-20">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            aria-label="Go back to articles"
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 hover:shadow-zinc-800/10 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
            >
              <path
                d="M7.25 11.25 4.75 8l2.5-3.25"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.25 8H4.75"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {asText(title)}
              </h1>
              <div className="mt-4 flex items-center gap-4 flex-wrap">
                {date && (
                  <time
                    dateTime={date}
                    className="order-first text-base text-zinc-400 dark:text-zinc-500"
                  >
                    {formatDate(date)}
                  </time>
                )}
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400"
                      >
                        {t.tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>

            <div className="prose prose-zinc dark:prose-invert mt-8">
              {body.map((slice, i) => {
                if (slice.slice_type === "text") {
                  return <PrismicRichText key={i} field={slice.primary.text} />;
                }
                if (slice.slice_type === "quote") {
                  return (
                    <blockquote key={i}>
                      <PrismicRichText field={slice.primary.description} />
                    </blockquote>
                  );
                }
                if (slice.slice_type === "code") {
                  const raw = asText(slice.primary.code_block);
                  const { lang, code } = parseCodeBlock(raw);
                  return (
                    <div key={i} className="not-prose my-6">
                      {lang && (
                        <div className="flex items-center gap-2 rounded-t-xl bg-zinc-700 px-4 py-2">
                          <span className="text-xs font-medium text-zinc-300">{lang}</span>
                        </div>
                      )}
                      <pre className={`overflow-x-auto bg-zinc-800 p-5 text-sm text-zinc-200 ${lang ? "rounded-b-xl" : "rounded-xl"}`}>
                        <code>{code}</code>
                      </pre>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
