import React from "react";

export default function BlogLayout({
  children,
  frontMatter,
}: {
  children: React.ReactNode;
  frontMatter: { title: string; date: string; tags?: string[] };
}) {
  return (
    <article className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold">{frontMatter.title}</h1>
      <p className="text-sm text-gray-500">{frontMatter.date}</p>

      {frontMatter.tags?.length && (
        <div className="mt-2 flex gap-2">
          {frontMatter.tags.map((tag) => (
            <span key={tag} className="bg-gray-200 px-2 py-1 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 prose">{children}</div>

      {/* 🔽 Your comment component, e.g. Giscus or Disqus */}
      <div className="mt-10">{/* <Comments /> */}</div>
    </article>
  );
}
