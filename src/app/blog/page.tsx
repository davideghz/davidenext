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
      <div className="mb-10">
        <Link
          href="/"
          className="text-sm text-neutral-400 hover:text-[#6b85fc] transition-colors"
        >
          ← Back
        </Link>
      </div>

      <h1 className="font-serif text-3xl font-bold mb-10">Blog</h1>

      <ul className="space-y-10">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.uid}`} className="group block">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h2 className="font-serif text-xl font-semibold group-hover:text-[#6b85fc] transition-colors">
                  {asText(post.data.title)}
                </h2>
                <time
                  dateTime={post.data.date ?? ""}
                  className="text-xs text-neutral-400 shrink-0"
                >
                  {formatDate(post.data.date)}
                </time>
              </div>
              {post.data.tags && post.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.data.tags.map((t: { tag: string | null }, i: number) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-500 rounded-full"
                    >
                      {t.tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
