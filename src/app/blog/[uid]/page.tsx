import { createClient } from "@/lib/prismic";
import { asText } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import type { PostDocument } from "@/types/prismic";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    return { title: `${asText((post as PostDocument).data.title)} — Davide Ghezzi` };
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
    <>
      <div className="mb-10">
        <Link
          href="/blog"
          className="text-sm text-neutral-400 hover:text-[#6b85fc] transition-colors"
        >
          ← Blog
        </Link>
      </div>

      <article>
        {/* Header */}
        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold leading-tight mb-4">
            {asText(title)}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            {date && (
              <time dateTime={date} className="text-sm text-neutral-400">
                {formatDate(date)}
              </time>
            )}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-500 rounded-full"
                  >
                    {t.tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Body slices */}
        <div className="prose">
          {body.map((slice, i) => {
            if (slice.slice_type === "text") {
              return (
                <PrismicRichText
                  key={i}
                  field={slice.primary.text}
                />
              );
            }

            if (slice.slice_type === "quote") {
              return (
                <blockquote key={i}>
                  <PrismicRichText field={slice.primary.description} />
                </blockquote>
              );
            }

            return null;
          })}
        </div>
      </article>
    </>
  );
}
