import fs from "fs";
import path from "path";
import Link from "next/link";
import Layout from "@/components/layout";
import styles from "@/styles/BlogYear.module.css";

export default function YearIndexPage({ year, files }) {
  const sorted = [...files].sort((a, b) => a.localeCompare(b));

  // Convert slug → readable title for display
  const pretty = (slug: string) =>
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // TODO title={`Posts from ${year} – sergeyt.dev`}
  return (
    <Layout>
      <section className={styles.header}>
        <p className={styles.eyebrow}>Archive</p>
        <h1 className={styles.title}>Posts from {year}</h1>

        <p className={styles.lead}>
          A snapshot of what I was exploring in {year}: AI systems, backend
          architecture, software engineering in general, and sometimes personal
          hobbies — including attempts to improve at table tennis 🏓.
        </p>
      </section>

      <section className={styles.listSection}>
        {sorted.length === 0 ? (
          <p className={styles.empty}>
            No posts for this year yet. Try another year in the{" "}
            <Link href="/blog">blog index</Link>.
          </p>
        ) : (
          <ul className={styles.list}>
            {sorted.map((slug) => (
              <li key={slug} className={styles.item}>
                <Link href={`/blog/${year}/${slug}`} className={styles.link}>
                  <span className={styles.postTitle}>{pretty(slug)}</span>
                  <span className={styles.arrow}>→</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { year } = params;
  const postDir = path.resolve(process.cwd(), "src/posts", year);
  const files = await fs.promises.readdir(postDir);

  return {
    props: {
      year,
      files: files.map((f) => f.replace(/\.mdx?$/, "")), // keep "files" array
    },
  };
}

export async function getStaticPaths() {
  const postDir = path.resolve(process.cwd(), "src/posts");
  const years = await fs.promises.readdir(postDir);

  return {
    paths: years.map((year) => ({
      params: { year },
    })),
    fallback: false,
  };
}
