import { Github, Linkedin, Youtube } from "./icons";
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
        url="https://github.com/sergeyt"
        icon={<Github size={ICON_SIZE} />}
        alt="SergeyT's Github profile"
      />
      <Link
        url="https://www.linkedin.com/in/sergeytodyshev/"
        icon={<Linkedin size={ICON_SIZE} />}
        alt="SergeyT's LinkedIn profile"
      />
      <Link
        url="https://www.youtube.com/@sergey_todyshev"
        icon={<Youtube size={ICON_SIZE} />}
        alt="SergeyT's Youtube channel"
      />
    </div>
  );
}
