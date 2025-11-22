import React from "react";
import qs from "qs";
import useSWR from "swr";
import isEmpty from "lodash/isEmpty";
import Layout from "@/components/layout";
// import Footer from "@/components/Footer";
import Resume from "@/components/Resume";
import resume from "./resume.json";
import Loader from "@/components/Loader";
import { cors, fetchCodersRankResume } from "../../utils/codersrank";
import { compact } from "../../utils/compact";

function useQuery(location) {
  return qs.parse(location ? location.search : "");
}

function useResume(src) {
  if (!src) {
    return { data: resume };
  }
  return useSWR(`resume.json?src=${src}`, () => {
    const cr = /cr-([\w\d]+)/;
    const m = cr.exec(src);
    if (m) {
      const username = m[1];
      return fetchCodersRankResume(username);
    }
    if (src === "cr") {
      return fetchCodersRankResume("sergeyt");
    }
    if (src.match(/[A-Fa-f0-9]{32}/)) {
      return fetchJSON(`https://api.github.com/gists/${src}`).then((r) =>
        JSON.parse(r.files[Object.keys(r.files)[0]].content),
      );
    }
    return fetchJSON(q.src, true);
  });
}

function fetchJSON(url, useCorsProxy = false) {
  return fetch(useCorsProxy ? cors(url) : url).then((r) => r.json());
}

const Page = ({ location }) => {
  const q = useQuery(location);
  const { data, error } = useResume(q.src);
  const theme = "dark";
  const dark = theme === "dark";

  if (error) {
    return (
      <Layout>
        <main className="post-page">
          <div className="error">Something goes wrong.</div>
        </main>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <main className="post-page">
          <Loader />
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="post-page">
        <SourceToggle q={q} />
        <Resume resume={data} style={{ marginTop: 50 }} dark={dark} />
        {/*<Footer />*/}
      </main>
    </Layout>
  );
};

const SourceToggle = ({ q }) => {
  return (
    <div
      className="screen-only"
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "50px",
        }}
      >
        <span
          style={{
            color: "var(--textLink)",
            cursor: "pointer",
          }}
          onClick={(e) => {
            const t = compact({
              ...q,
              src: q.src === "cr" ? undefined : "cr",
            });
            window.location.search = isEmpty(t) ? "" : qs.stringify(t);
          }}
        >
          {q.src === "cr" ? "See Less" : "See More"}
        </span>
      </div>
    </div>
  );
};

export default Page;
