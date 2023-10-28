import "./globals.css";
import "./i18next";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <body>{children}</body>;
}
