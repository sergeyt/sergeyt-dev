import React from "react";
import {
  SiGithub as Github,
  // TODO FIXME invalid icon
  SiLinkerd as Linkedin,
  SiX as Twitter,
} from "@icons-pack/react-simple-icons";
import { DateTime } from "luxon";
import { FaUserAstronaut as UserIcon } from "react-icons/fa";
import last from "lodash/last";
import isEmpty from "lodash/isEmpty";
import trim from "lodash/trim";

const m = "0.5rem";
const m2 = "1rem";

const Resume = ({ resume, style, dark }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
        color: dark ? "white" : undefined,
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ width: 300, marginRight: 25, flexShrink: 0 }}>
          <div
            style={{
              height: 150,
              display: "flex",
              justifyContent: "center",
              marginBottom: m,
            }}
          >
            {resume.basics.picture ? (
              <img
                src={resume.basics.picture}
                style={{ height: 150, borderRadius: "100%" }}
              />
            ) : (
              <UserIcon size={150} />
            )}
          </div>
          <div>
            <h4 style={{ marginTop: m, marginBottom: m }}>SUMMARY</h4>
            <p>{trim(resume.basics.summary)}</p>
          </div>
          <div style={{ marginBottom: m2 }}>
            <h4 style={{ marginBottom: m }}>CONTACT</h4>
            <div>
              <a href={`mailto:${resume.basics.email}`}>
                {resume.basics.email}
              </a>
            </div>
            {resume.basics.phone ? (
              <div>
                <a href={`tel:${resume.basics.phone}`}>{resume.basics.phone}</a>
              </div>
            ) : null}
            {resume.basics.website ? (
              <div>
                <a href={resume.basics.website} target="_blank">
                  {resume.basics.website}
                </a>
              </div>
            ) : null}
          </div>
          <Profiles resume={resume} />
          {/* <Interests resume={resume} /> */}
          <Skills resume={resume} />
          <Languages resume={resume} />
          <div style={{ pageBreakBefore: "always" }}>
            <Education education={resume.education || []} />
          </div>
        </div>
        <div>
          <div
            style={{
              height: 150,
              display: "flex",
              alignItems: "center",
              marginTop: m,
            }}
          >
            <div>
              <h1>{resume.basics.name}</h1>
              <h5 style={{ textTransform: "uppercase", marginTop: -20 }}>
                {resume.basics.label}
              </h5>
            </div>
          </div>
          <div style={{ marginTop: -10 }}>
            <Experience items={resume.work || []} />
          </div>
          <Experience items={resume.volunteer || []} title="VOLUNTEER WORK" />
        </div>
      </div>
    </div>
  );
};

const Profiles = ({ resume }) => {
  if (isEmpty(resume.basics.profiles)) {
    return null;
  }
  return (
    <div style={{ marginBottom: m2 }}>
      <h4 style={{ marginBottom: m }}>PROFILES</h4>
      {(resume.basics.profiles || []).map((p, k) => (
        <div key={k}>
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <Icon url={p.url} />
            <a href={p.url} target="_blank">
              {p.username || last(p.url.split("/").filter((s) => !!s))}
            </a>
          </span>
        </div>
      ))}
    </div>
  );
};

const Languages = ({ resume }) => {
  if (isEmpty(resume.languages)) {
    return null;
  }
  return (
    <div style={{ marginBottom: m2 }}>
      <h4 style={{ marginBottom: m }}>LANGUAGES</h4>
      {(resume.languages || []).map((item, k) => (
        <div key={k}>
          <span>{item.language}</span>
          <Tag>{item.fluency}</Tag>
        </div>
      ))}
    </div>
  );
};

const Interests = ({ resume }) => {
  if (isEmpty(resume.interests)) {
    return null;
  }
  return (
    <div>
      <h4 style={{ marginBottom: m2 }}>INTERESTS</h4>
      {(resume.interests || []).map((item, k) => (
        <div key={k}>
          <span>{item.name}</span>
          <div>
            {(item.keywords || []).map((tag, k) => (
              <Tag key={k} color="secondary">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Skills = ({ resume }) => {
  if (isEmpty(resume.skills)) {
    return null;
  }
  return (
    <div style={{ marginBottom: m }}>
      <h4 style={{ marginBottom: m }}>SKILLS</h4>
      {(resume.skills || []).map((item, k) => (
        <div key={k} style={{ display: "inline-flex", flexWrap: "wrap" }}>
          <Tag>
            {item.name}
            {item.level ? ": " + item.level : ""}
          </Tag>
        </div>
      ))}
    </div>
  );
};

const Icon = ({ url }) => {
  const size = 20;
  const style = { marginRight: 4 };
  const u = url.toLowerCase();
  if (u.indexOf("github") >= 0) {
    return <Github size={size} style={style} />;
  }
  if (u.indexOf("linkedin") >= 0) {
    return <Linkedin size={size} style={style} />;
  }
  if (u.indexOf("twitter") >= 0) {
    return <Twitter size={size} style={style} />;
  }
  return null;
};

const Experience = ({ items, title = "WORK EXPERIENCE" }) =>
  isEmpty(items) ? null : (
    <div style={{ marginTop: m }}>
      <h4 style={{ marginBottom: m }}>{title}</h4>
      {items.map((item, k) => (
        <div key={k} style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h4 style={{ marginBottom: 0, marginTop: 0 }}>{item.position}</h4>
            <a href={item.website} target="_blank">
              &nbsp;at {item.company || item.organization}
            </a>
            <div style={{ flexGrow: 1 }} />
            <Period startDate={item.startDate} endDate={item.endDate} />
          </div>
          <pre style={{ whiteSpace: "pre-line", marginBottom: m }}>
            {trim(item.summary)}
          </pre>
        </div>
      ))}
    </div>
  );

const Education = ({ education }) =>
  isEmpty(education) ? null : (
    <div style={{ marginTop: m }}>
      <h4 style={{ marginBottom: m }}>EDUCATION</h4>
      {education.map((item, k) => (
        <div key={k} style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h4 style={{ marginBottom: 0, marginTop: 0 }}>
              {item.institution}
            </h4>
            {/* <a href={item.website} target="_blank">
              &nbsp;at {item.website}
            </a> */}
            <div style={{ flexGrow: 1 }} />
            <Period startDate={item.startDate} endDate={item.endDate} />
          </div>
          <pre style={{ marginBottom: m }}>{item.area}</pre>
        </div>
      ))}
    </div>
  );

const Period = ({ startDate, endDate }) => (
  <b>
    {startDate ? (
      <>
        <span>{formatPeriod(startDate)}</span>
        <span>&nbsp;-&nbsp;</span>
      </>
    ) : null}
    <span>{endDate ? formatPeriod(endDate) : "now"}</span>
  </b>
);

function formatPeriod(s) {
  const d = parsePeriod(s);
  return d ? d.toFormat("yyyy") : "invalid date";
}

function parsePeriod(s) {
  if (!s) {
    return undefined;
  }
  for (const f of ["yyyy-MM-dd", "yyyy-MM"]) {
    const d = DateTime.fromFormat(s, f);
    if (d.isValid) {
      return d;
    }
  }
  console.warn("invalid time period", s);
  return undefined;
}

const Tag = ({ color, children }: any) => {
  return (
    <span
      style={{
        backgroundColor: "blueviolet",
        color: "white",
        borderRadius: 4,
        padding: "0px 4px 2px 4px",
        marginLeft: 4,
        boxSizing: "border-box",
        fontSize: "smaller",
        fontWeight: "bold",
      }}
    >
      {children}
    </span>
  );
};

export default Resume;
