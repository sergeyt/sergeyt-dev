import { Github, Linkedin } from "./icons";
import styles from "./links.module.css";

const ICON_SIZE = 24;

const Link = ({ url, icon, alt }) => (
  <a href={url} target="_blank" title={alt}>
    {icon}
  </a>
);

export default function Links() {
  return (
    <div className={styles.links}>
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
    </div>
  );
}
