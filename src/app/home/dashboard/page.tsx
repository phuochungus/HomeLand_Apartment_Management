"use client";
import { useTranslation } from "react-i18next";
import styles from "../page.module.css";
import { UserProfile } from "@/libs/UserProfile";
export default function Dashboard() {
  const [t, i18n] = useTranslation();

  return (
    <main className={styles.main}>
      <div>
        <div>{"This is a " + UserProfile.getRole() +"'s dashboard"}</div>
      </div>
    </main>
  );
}
