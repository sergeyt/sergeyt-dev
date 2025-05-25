import { Spectral } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import cx from "clsx";
import Links from "./links";
import "../styles/global.css";
import styles from "./layout.module.css";

const font = Spectral({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
  variable: "--font-main",
});

export default function RootLayout({ children }) {
  const router = useRouter();
  return (
    <div className={cx(styles.page, font.variable)}>
      <header className={styles.header}>
        <div className={styles.nav}>
          <Link
            href="/"
            className={router.pathname === "/" ? styles.active : ""}
          >
            home
          </Link>
          <Link href="./blog" target="_blank">
            blog
          </Link>
          <Link href="./resume" target="_blank">
            cv
          </Link>
        </div>
        <Links />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
