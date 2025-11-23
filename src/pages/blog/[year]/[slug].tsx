import fs from "fs";
import path from "path";
import bluebird from "bluebird";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import BlogLayout from "@/components/BlogLayout";

export default function BlogPage({ source, ...props }) {
  return (
    <BlogLayout {...props}>
      <MDXRemote {...source} />
    </BlogLayout>
  );
}

export async function getStaticPaths() {
  const cwd = process.cwd();
  const postDir = path.resolve(cwd, "src/posts");

  const years = await fs.promises.readdir(postDir);
  const results = await bluebird.map(years, async (year: string) => {
    const files = await fs.promises.readdir(path.resolve(postDir, year));
    return bluebird.map(files, async (file: string) => ({
      params: {
        year,
        slug: file.replace(".mdx", "").replace(".md", ""),
      },
    }));
  });

  return {
    paths: results.flat(),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { year, slug } = params;
  const postBase = path.join(process.cwd(), "src/posts", year, slug);
  const postPath = [".md", ".mdx", "/index.md", "/index.mdx"]
    .map((t) => `${postBase}${t}`)
    .find((x) => fs.existsSync(x));
  if (!postPath) {
    throw new Error("No post path provided");
  }
  const rawContent = fs.readFileSync(postPath, "utf-8");
  const { content, data: frontMatter } = matter(rawContent);
  const source = await serialize(content);

  // 🔢 Simple read-time: ~200 words per minute
  const words = rawContent.split(/\s+/).filter(Boolean).length;
  const readingTimeMinutes = Math.max(1, Math.round(words / 200));

  return {
    props: {
      frontMatter,
      source,
      readingTimeMinutes,
    },
  };
}
