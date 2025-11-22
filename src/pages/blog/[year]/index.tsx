import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import Layout from "@/components/layout";
import styles from "@/styles/BlogYear.module.css";

export default function YearIndexPage({ year, files }) {
  // files is now an array of { slug, title, spoiler?, date? }
  const posts = [...files];

  const formatDate = (date?: string) => {
    if (!date) return null;
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Layout title={`Posts from ${year} – sergeyt.dev`}>
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
        {posts.length === 0 ? (
          <p className={styles.empty}>
            No posts for this year yet. Try another year in the{" "}
            <Link href="/blog">blog index</Link>.
          </p>
        ) : (
          <ul className={styles.list}>
            {posts.map((post) => (
              <li key={post.slug} className={styles.item}>
                <Link
                  href={`/blog/${year}/${post.slug}`}
                  className={styles.link}
                >
                  <div className={styles.postMain}>
                    <div className={styles.postHeaderRow}>
                      <span className={styles.postTitle}>{post.title}</span>
                      {post.date && (
                        <span className={styles.postDate}>
                          {formatDate(post.date)}
                        </span>
                      )}
                    </div>
                    {post.spoiler && (
                      <p className={styles.postSpoiler}>{post.spoiler}</p>
                    )}
                  </div>
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
  const entries = await fs.promises.readdir(postDir);

  const slugs = new Set<string>();

  // Discover slugs for:
  // - src/posts/<year>/<slug>.md[x]
  // - src/posts/<year>/<slug>/index.md[x]
  for (const entry of entries) {
    const full = path.join(postDir, entry);
    const stat = await fs.promises.lstat(full);

    if (stat.isFile() && (entry.endsWith(".md") || entry.endsWith(".mdx"))) {
      slugs.add(entry.replace(/\.mdx?$/, ""));
    } else if (stat.isDirectory()) {
      const maybeIndexMd = path.join(full, "index.md");
      const maybeIndexMdx = path.join(full, "index.mdx");
      if (fs.existsSync(maybeIndexMd) || fs.existsSync(maybeIndexMdx)) {
        slugs.add(entry);
      }
    }
  }

  const posts = Array.from(slugs).map((slug) => {
    const candidates = [
      `${slug}.md`,
      `${slug}.mdx`,
      path.join(slug, "index.md"),
      path.join(slug, "index.mdx"),
    ];

    let postPath: string | undefined;
    for (const rel of candidates) {
      const abs = path.join(postDir, rel);
      if (fs.existsSync(abs)) {
        postPath = abs;
        break;
      }
    }

    if (!postPath) {
      throw new Error(
        `No post file found for year="${year}" slug="${slug}". Tried: ${candidates.join(
          ", ",
        )}`,
      );
    }

    const source = fs.readFileSync(postPath, "utf-8");
    const { data } = matter(source);
    const { title, spoiler, date } = data as {
      title?: string;
      spoiler?: string;
      date?: string;
    };

    // fallback: generate a human title from slug
    const prettyTitle = slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return {
      slug,
      title: title || prettyTitle,
      spoiler: spoiler || "",
      date: date || null,
    };
  });

  // Sort by date desc if available, else by title
  posts.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (a.date && !b.date) return -1;
    if (!a.date && b.date) return 1;
    return a.title.localeCompare(b.title);
  });

  return {
    props: {
      year,
      files: posts, // keep prop name "files" for compatibility
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
