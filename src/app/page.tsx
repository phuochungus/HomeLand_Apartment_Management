"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  router.push("/home");
  return <main>This is start</main>;
}
