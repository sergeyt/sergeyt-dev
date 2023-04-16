import "./globals.css";
import Links from "./links";

export const metadata = {
  title: "SergeyT Blog",
  description: "Low-code bits written by SergeyT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Links />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
