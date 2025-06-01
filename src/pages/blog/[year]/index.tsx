import fs from "fs";
import path from "path";
import Link from "next/link";
import bluebird from "bluebird";

export default function IndexPage({ year, files }) {
  const items = files.map((file) => (
    <li>
      <Link href={`/blog/${year}/${file}`}>{file}</Link>
    </li>
  ));
  return <ul>{items}</ul>;
}

export async function getStaticProps(props) {
  const { params } = props;
  const { year } = params;
  const cwd = process.cwd();
  const postDir = path.resolve(cwd, "src/posts", year);
  const files = await fs.promises.readdir(postDir);

  return {
    props: {
      year,
      files: files.map((file) => file.replace(".mdx", "")),
    },
  };
}

export async function getStaticPaths(props) {
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
