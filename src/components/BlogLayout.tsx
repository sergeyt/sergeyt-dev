import React from "react";
import Layout from "./layout";

type FrontMatter = {
  title: string;
  date?: string;
  tags?: string[];
  spoiler?: string;
};

export default function BlogLayout({
  children,
  frontMatter,
  readingTimeMinutes,
}: {
  children?: React.ReactNode;
  frontMatter?: FrontMatter;
  readingTimeMinutes?: number;
}) {
  const { title, date, tags, spoiler } = frontMatter || {};

  // Format date nicely, fallback to raw string if parsing fails
  let formattedDate: string | null = null;
  if (date) {
    const d = new Date(date);
    if (!Number.isNaN(d.getTime())) {
      formattedDate = d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else {
      formattedDate = date;
    }
  }

  return (
    <Layout title={`${title} – sergeyt.dev`}>
      <article className="max-w-2xl mx-auto py-10">
        {/* Title */}
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>

        {/* Meta row: date + read time */}
        {(formattedDate || readingTimeMinutes) && (
          <p className="mt-2 text-xs text-gray-500 flex flex-wrap items-center gap-2">
            {formattedDate && <span>{formattedDate}</span>}
            {formattedDate && readingTimeMinutes && <span>•</span>}
            {readingTimeMinutes && <span>{readingTimeMinutes} min read</span>}
          </p>
        )}

        {/* Tags as nice badges */}
        {tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}

        {/* Spoiler / note */}
        {spoiler && (
          <div className="mt-4 rounded-md border border-yellow-100 bg-yellow-50 px-3 py-2 text-xs text-yellow-900">
            <span className="font-medium">Note: </span>
            <span>{spoiler}</span>
          </div>
        )}

        {/* Content */}
        <div className="mt-6 prose">{children}</div>

        {/* Comments / footer region */}
        <div className="mt-10">{/* <Comments /> */}</div>
      </article>
    </Layout>
  );
}
