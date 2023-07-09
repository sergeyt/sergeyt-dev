import YouTube from "react-youtube";
import Layout from "../components/layout";
import { FaExternalLinkAlt as LinkIcon } from "../components/icons";

export const metadata = {
  title: "SergeyT Blog",
  description: "Low-code bits written by SergeyT",
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
      <YouTube videoId="s7hXN47m8Ck" opts={{ height: "390", width: "640" }} />
      <p>
        I currently work as Software Engineer at{" "}
        <a href="https://www.regie.ai" target="_blank">
          Regie.ai
        </a>
        , where I build an AI Assistance Software to help Sales people to be
        more productive.
      </p>
      <p>
        I spontaneously write articles on{" "}
        <a href="https://tsvbits.com" target="_blank">
          https://tsvbits.com
        </a>
        . You&apos;ll find writing about tech I&apos; interested in right now,
        or even how I&apos; playing table tennis 😀.
      </p>
      <p>
        <a
          className="no_decoration"
          href="https://www.twitter.com/todysh"
          target="_blank"
        >
          <span style={{ marginRight: "2px" }}>
            <LinkIcon size={11} />
          </span>
          follow me on twitter
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
