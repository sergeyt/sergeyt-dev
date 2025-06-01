import fs from "fs";
import path from "path";
import Link from "next/link";

export default function IndexPage({ years }) {
  const items = years.map((year) => (
    <li>
      <Link href={`./blog/${year}`}>{year}</Link>
    </li>
  ));
  return <ul>{items}</ul>;
}

export async function getStaticProps({ params }) {
  const cwd = process.cwd();
  const postDir = path.resolve(cwd, "src/posts");
  const years = await fs.promises.readdir(postDir);

  return {
    props: {
      years,
    },
  };
}
