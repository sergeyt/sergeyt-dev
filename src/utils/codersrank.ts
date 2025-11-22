import map from "lodash/map";
import filter from "lodash/filter";
import orderBy from "lodash/orderBy";

export async function fetchCodersRankResume(username) {
  const base = `https://api.codersrank.io/v2/users/${username}`;
  const user = await fetchJSON(`${base}?get_by=username`);
  const exp = await fetchJSON(`${base}/work_experiences?get_by=username`);
  const ed = await fetchJSON(`${base}/education?get_by=username`);
  const tech = await fetchJSON(`${base}/manually_added_tech_stacks`);
  const skills = map(tech, (v, k) => ({ name: k, level: v }));
  return {
    basics: {
      name: [user.first_name, user.last_name].filter((s) => !!s).join(" "),
      label: "Software Engineer",
      summary: user.intro,
      website: user.social_links?.personal_website,
      picture: user.avatar_url,
      profiles: filter(
        user.social_links,
        (t, k) => k !== "personal_website",
      ).map((url) => ({ url })),
    },
    languages: map(user.spoken_languages, (x) => ({
      language: x.language,
      fluency: x.proficiency,
    })),
    work: map(exp.work_experiences, (x) => ({
      position: x.title,
      company: x.company,
      summary: x.description,
      startDate: x.start_date,
      endDate: x.end_date,
    })),
    education: ed.education.map((x) => ({
      institution: x.name,
      startDate: x.start_date,
      endDate: x.end_date,
      area: x.field_of_study,
    })),
    skills: orderBy(skills, (t) => t.level, "desc"),
  };
}

export function cors(url) {
  if (url.startsWith("https://gist.githubusercontent.com/")) {
    return url;
  }
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
}

function fetchJSON(url, useCorsProxy = false) {
  return fetch(useCorsProxy ? cors(url) : url).then((r) => r.json());
}
