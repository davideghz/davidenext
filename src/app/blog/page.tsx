import { createClient } from "@/lib/prismic";
import { asText } from "@prismicio/client";
import Link from "next/link";

export const revalidate = 3600;

export const metadata = {
  title: "Blog — Davide Ghezzi",
};

function formatDate(dateString: string | null) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const client = createClient();
  const posts = await client.getAllByType("post", {
    orderings: [{ field: "my.post.date", direction: "desc" }],
  });

  return (
    <>
      <div className="mb-12">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-neutral-400 hover:text-[#6b85fc] transition-colors"
        >
          ← Back
        </Link>
      </div>

      <h1 className="font-serif text-[clamp(3rem,8vw,5rem)] font-bold leading-none tracking-tight mb-16">
        Writing.
      </h1>

      <ul>
        {posts.map((post, index) => (
          <li key={post.id} className="group">
            <Link
              href={`/blog/${post.uid}`}
              className="flex items-baseline justify-between gap-6 py-6 border-t border-neutral-200 hover:border-[#6b85fc] transition-colors"
            >
              <div className="flex items-baseline gap-4 min-w-0">
                <span className="text-xs text-neutral-300 tabular-nums shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-serif text-xl font-semibold truncate group-hover:text-[#6b85fc] transition-colors">
                  {asText(post.data.title)}
                </h2>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                {post.data.tags && post.data.tags.length > 0 && (
                  <div className="hidden sm:flex gap-1.5">
                    {post.data.tags.map((t: { tag: string | null }, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-400 rounded-full"
                      >
                        {t.tag}
                      </span>
                    ))}
                  </div>
                )}
                <time
                  dateTime={post.data.date ?? ""}
                  className="text-xs text-neutral-400 tabular-nums"
                >
                  {formatDate(post.data.date)}
                </time>
              </div>
            </Link>
          </li>
        ))}
        <li className="border-t border-neutral-200" />
      </ul>
    </>
  );
}
