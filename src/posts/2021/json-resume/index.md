---
title: React component to render JSON Resume
date: '2021-01-03'
spoiler: Beautiful resume made easy
tags: ['reactjs', 'javascript', 'sample', 'json-resume']
reddit: 'https://www.reddit.com/r/reactjs/comments/kpndxa/react_component_to_render_json_resume'
---

In this post I am going to show a React component to render [JSON Resume](https://jsonresume.org/).
As usual enough words, see the code :smile:

```js
import React from 'react';
import { Github, Linkedin } from '@icons-pack/react-simple-icons';
import { DateTime } from 'luxon';

const Resume = ({ resume, style }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ width: 300, marginRight: 80 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={resume.basics.picture}
              style={{ height: 150, borderRadius: '100%' }}
            />
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5em' }}>SUMMARY</h3>
            <p>{resume.basics.summary}</p>
          </div>
          <div style={{ marginBottom: '0.5em' }}>
            <h3 style={{ marginBottom: '0.5em' }}>CONTACT &amp; PROFILES</h3>
            <div>
              <a href={`mailto:${resume.basics.email}`}>
                {resume.basics.email}
              </a>
            </div>
            <div>{resume.basics.phone}</div>
            <div>
              <a href={resume.basics.website} target="_blank">
                {resume.basics.website}
              </a>
            </div>
            {(resume.basics.profiles || []).map((p, k) => (
              <div key={k}>
                <a
                  href={p.url}
                  target="_blank"
                  style={{ display: 'inline-flex', alignItems: 'center' }}
                >
                  <Icon url={p.url} />
                  {p.username}
                </a>
              </div>
            ))}
          </div>
          {isEmpty(resume.languages) ? null : (
            <div style={{ marginBottom: '0.5em' }}>
              <h3 style={{ marginBottom: '0.5em' }}>LANGUAGES</h3>
              {(resume.languages || []).map((item, k) => (
                <div key={k}>
                  <span>{item.language}</span>
                  <Tag>{item.fluency}</Tag>
                </div>
              ))}
            </div>
          )}
          {isEmpty(resume.interests) ? null : (
            <div>
              <h3 style={{ marginBottom: '0.5em' }}>INTERESTS &amp; HOBBIES</h3>
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
          )}
        </div>
        <div>
          <div style={{ marginTop: 40 }}>
            <h1>{resume.basics.name}</h1>
            <h5 style={{ textTransform: 'uppercase', marginTop: -20 }}>
              {resume.basics.label}
            </h5>
          </div>
          <div style={{ marginTop: 70, marginBottom: '1em' }}>
            <h3 style={{ marginBottom: '0.5em' }}>SKILLS</h3>
            {(resume.skills || []).map((item, k) => (
              <div key={k}>
                <div>
                  <strong>{item.name}</strong>
                  <Tag>{item.level}</Tag>
                </div>
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
          <Education education={resume.education || []} />
          <Experience items={resume.work || []} />
          <Experience items={resume.volunteer || []} />
        </div>
      </div>
    </div>
  );
};

const Icon = ({ url }) => {
  const size = 20;
  const style = { marginRight: 4 };
  const u = url.toLowerCase();
  if (u.indexOf('github') >= 0) {
    return <Github size={size} color="black" style={style} />;
  }
  if (u.indexOf('linkedin') >= 0) {
    return <Linkedin size={size} color="black" style={style} />;
  }
  return null;
};

const Experience = ({ items }) =>
  isEmpty(items) ? null : (
    <div style={{ marginTop: '0.5em' }}>
      <h3 style={{ marginBottom: '0.5em' }}>WORK EXPERIENCE</h3>
      {items.map((item, k) => (
        <div key={k} style={{ position: 'relative' }}>
          {items.length === 1 ? null : (
            <Timeline isLast={k === items.length - 1} />
          )}
          <h3 style={{ marginBottom: 0 }}>{item.position}</h3>
          <h5
            style={{
              margin: '2px 0',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <a href={item.website} target="_blank">
              {item.company || item.organization}
            </a>
            <Period startDate={item.startDate} endDate={item.endDate} />
          </h5>
          <p>{item.summary}</p>
        </div>
      ))}
    </div>
  );

const Education = ({ education }) =>
  isEmpty(education) ? null : (
    <div style={{ marginTop: '0.5em' }}>
      <h3 style={{ marginBottom: '0.5em' }}>EDUCATION</h3>
      {education.map((item, k) => (
        <div key={k} style={{ position: 'relative' }}>
          {education.length === 1 ? null : (
            <Timeline isLast={k === education.length - 1} />
          )}
          <h3 style={{ marginBottom: 0 }}>{item.institution}</h3>
          <h5
            style={{
              margin: '2px 0',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <a href={item.website} target="_blank">
              {item.website}
            </a>
            <Period startDate={item.startDate} endDate={item.endDate} />
          </h5>
          <p>{item.area}</p>
        </div>
      ))}
    </div>
  );

const Timeline = ({ isLast }) => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          width: 24,
          height: 24,
          border: '1px solid var(--textLink)',
          borderRadius: '100%',
          left: -30,
          top: 3,
          padding: 6,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: 'var(--textLink)',
            borderRadius: '100%',
          }}
        ></div>
      </div>
      {isLast ? null : (
        <div
          style={{
            position: 'absolute',
            width: 2,
            left: -19,
            top: 26,
            bottom: -31,
            backgroundColor: 'var(--textLink)',
          }}
        ></div>
      )}
    </>
  );
};

const Period = ({ startDate, endDate }) => (
  <span style={{ width: 130 }}>
    <span>
      {DateTime.fromFormat(startDate, 'yyyy-MM-dd').toFormat('MMM yyyy')}
    </span>
    <span>&nbsp;-&nbsp;</span>
    <span>
      {endDate
        ? DateTime.fromFormat(endDate, 'yyyy-MM-dd').toFormat('MMM yyyy')
        : 'now'}
    </span>
  </span>
);

const Tag = ({ color, children }) => {
  return (
    <span
      style={{
        backgroundColor: color === 'secondary' ? '#48BFE3' : 'var(--textLink)',
        color: 'white',
        borderRadius: 4,
        padding: '0px 4px 2px 4px',
        marginLeft: 4,
        boxSizing: 'border-box',
        fontSize: 'smaller',
        fontWeight: 'bold',
      }}
    >
      {children}
    </span>
  );
};

function isEmpty(a) {
  return !a || a.length === 0;
}
```

The final result can be seen [here](/cv).

Enjoy! EOF :smile:
