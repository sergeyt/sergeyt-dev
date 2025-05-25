import YouTube from "react-youtube";
import Layout from "../components/layout";
import { LinkIcon } from "../components/icons";

const description = "Software Engineer. Table tennis player.";

export const metadata = {
  title: {
    default: "Sergey Todyshev",
    template: "%s | Sergey Todyshev",
  },
  description,
  metadataBase: new URL("https://sergeyt-dev"),
  openGraph: {
    title: "Sergey Todyshev",
    description,
    url: "https://sergeyt.dev",
    siteName: "Sergey Todyshev",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <Layout>
      <h2>hey, I&apos;m sergeyt 👋</h2>
      <p>
        I&apos;m a father of two kids, explorer, simplifier and optimizer. I
        play competitive table tennis at the amateur level. Here is a video
        playing me at some tournament. I am in black hoodie 😀.
      </p>
      <YouTube videoId="s7hXN47m8Ck" opts={{ width: "100%" }} />
      <p>
        I currently work as Software Engineer at{" "}
        <a href="https://www.regie.ai" target="_blank">
          Regie.ai
        </a>
        , where we build a first AI-driven Sales Enablement Platform to help Sales people to be
        more productive and having less tech stack.
      </p>
      <p>
        I spontaneously blog here. You&apos;ll find writing about tech I&apos;m interested in right now,
        or even how I&apos; playing table tennis 😀.
      </p>
      <p>
        <a
          className="no_decoration"
          href="https://www.x.com/todysh"
          target="_blank"
        >
          follow me on X
        </a>{" "}
        or{" "}
        <a className="no_decoration" href="mailto:stodyshev@gmail.com">
          <span style={{ marginRight: "2px" }}>
            <LinkIcon size={11} />
          </span>
          email me
        </a>
      </p>
    </Layout>
  );
}
