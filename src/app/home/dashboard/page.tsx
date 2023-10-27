"use client";
import { useTranslation } from "react-i18next";
import styles from "../page.module.css";
export default function Dashboard() {
  const [t, i18n] = useTranslation();

  return (
    <main className={styles.main}>
      <div>
        <div>{t("header.message")}</div>
        <div>
          <button onClick={() => i18n.changeLanguage("vi")}>Vi</button>
        </div>
      </div>
    </main>
  );
}
