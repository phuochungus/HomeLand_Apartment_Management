"use client"
import { useTranslation } from "react-i18next";
import styles from "../page.module.css";
export default function Residents() {
  const [t, i18n] = useTranslation();

  return (
    <main className={styles.main}>
      {" "}
      <div>{t("home.body")}</div>
    </main>
  );
}
