import fs from "fs";
import path from "path";
import Link from "next/link";
import Layout from "@/components/layout";
import styles from "@/styles/BlogIndex.module.css";

export default function BlogIndexPage({ years }) {
  const sortedYears = [...years].sort((a, b) => b.localeCompare(a));

  return (
    <Layout title="Blog – sergeyt.dev">
      <section className={styles.intro}>
        <p className={styles.eyebrow}>Blog</p>
        <h1 className={styles.title}>
          Notes on AI systems & the craft of software engineering
        </h1>

        <p className={styles.lead}>
          I’m Sergey Todyshev, a senior software engineer with 20+ years of
          experience building distributed systems, AI-powered products, and
          cloud-native backends.
        </p>

        <p className={styles.body}>
          I write about the practical side of engineering: architecture
          trade-offs, debugging stories, production incidents, developer
          experience, and patterns that make large TypeScript/Node.js/React
          codebases easier to evolve. From time to time I also share personal
          experiments, productivity tricks, and hobbies — including my ongoing
          attempts to improve at table tennis 🏓.
        </p>

        <div className={styles.tags}>
          <span>What I write about:</span>
          <ul>
            <li>AI-powered backends & agents</li>
            <li>Cloud architecture (AWS, serverless, containers)</li>
            <li>TypeScript / Node.js / Next.js</li>
            <li>Software engineering craft & career</li>
            <li>Personal projects & table tennis</li>
          </ul>
        </div>

        <p className={styles.disclaimer}>
          All opinions are my own and do not represent any past or current
          employer.
        </p>
      </section>

      <section className={styles.yearSection}>
        <h2 className={styles.yearTitle}>Browse posts by year</h2>
        <ul className={styles.yearList}>
          {sortedYears.map((year) => (
            <li key={year} className={styles.yearItem}>
              <Link href={`/blog/${year}`} className={styles.yearLink}>
                <span className={styles.yearLabel}>{year}</span>
                <span className={styles.yearArrow}>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const cwd = process.cwd();
  const postDir = path.resolve(cwd, "src/posts");
  const years = await fs.promises.readdir(postDir);

  return {
    props: {
      years,
    },
  };
}
