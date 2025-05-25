import fs from "fs";
import path from "path";
import bluebird from "bluebird";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import matter from "gray-matter";
import BlogLayout from "../../../components/BlogLayout";

export default function BlogPage({ frontMatter, year, slug }) {
  const MdxContent = useMemo(
    () =>
      dynamic(() =>
        import(`../../../posts/${year}/${slug}.mdx`).then((mod) => mod.default),
      ),
    [year, slug],
  );
  return (
    <BlogLayout frontMatter={frontMatter}>
      <MdxContent />
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
        slug: file.replace(".mdx", ""),
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
  const postPath = path.join(process.cwd(), "src/posts", year, `${slug}.mdx`);
  const source = fs.readFileSync(postPath, "utf-8");
  const { data: frontMatter } = matter(source);

  return {
    props: {
      frontMatter,
      year,
      slug,
    },
  };
}
