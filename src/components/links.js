import {
  Github,
  Linkedin,
  Devdotto,
  Codersrank,
  Biolink,
  Twitter,
  Substack,
  Youtube,
} from "./icons";
import styles from "./links.module.css";

const ICON_SIZE = 16;

const Link = ({ url, icon, alt }) => (
  <a href={url} target="_blank" title={alt}>
    {icon}
  </a>
);

export default function Links() {
  return (
    <div className={styles.links}>
      <Link
        url="https://www.twitter.com/todysh"
        icon={<Twitter size={ICON_SIZE} />}
        alt="SergeyT's Twitter"
      />
      <Link
        url="https://www.linkedin.com/in/sergeytodyshev/"
        icon={<Linkedin size={ICON_SIZE} />}
        alt="SergeyT's LinkedIn profile"
      />
      <Link
        url="https://github.com/sergeyt"
        icon={<Github size={ICON_SIZE} />}
        alt="SergeyT's Github profile"
      />
      <Link
        url="https://dev.to/sergeyt"
        icon={<Devdotto size={ICON_SIZE} />}
        alt="SergeyT's dev.to blog"
      />
      <Link
        url="https://sergeyt.substack.com"
        icon={<Substack size={ICON_SIZE} />}
        alt="SergeyT's substack blog"
      />
      <Link
        url="https://www.youtube.com/@sergey_todyshev"
        icon={<Youtube size={ICON_SIZE} />}
        alt="SergeyT's Youtube channel"
      />
      <Link
        url="https://profile.codersrank.io/user/sergeyt/"
        icon={<Codersrank size={ICON_SIZE} />}
        alt="SergeyT's Codersrank profile"
      />
      <Link
        url="https://bio.link/sergeyt"
        icon={<Biolink size={ICON_SIZE} />}
        alt="SergeyT's bio.link page"
      />
    </div>
  );
}
