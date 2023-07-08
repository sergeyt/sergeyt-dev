import Layout from "../components/layout";
import YouTube from "react-youtube";

export const metadata = {
  title: "SergeyT Blog",
  description: "Low-code bits written by SergeyT",
};

export default function Home() {
  return (
    <Layout>
      <h2>hey, I'm sergeyt 👋</h2>
      <p>
        I'm a father of two kids, explorer, simplifier and optimizer. I play
        competitive table tennis at the amateur level. Here is a video playing
        me at some tournament.
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
        .
      </p>
      <p>
        <a href="https://www.twitter.com/todysh" target="_blank">
          follow me on twitter
        </a>{" "}
        or <a href="mailto:stodyshev@gmail.com">email me</a>
      </p>
    </Layout>
  );
}
