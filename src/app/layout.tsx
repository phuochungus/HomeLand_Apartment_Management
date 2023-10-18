"use client";

import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS

import "./globals.css";
import { useEffect, useState } from "react";
import { ringift } from "../../public/fonts/Ringift";
import { Sidebar } from "@/components/sidebar/sidebar";
import styles from "./layout.module.css";
import { Button } from "react-bootstrap";
import Image from "next/image";
import { Images } from "../../public/images";
import { futuna } from "../../public/fonts/futura";
import { sidebarInfo } from "@/constraints/sidebarRoutes";
import { useRouter, usePathname } from "next/navigation";
import CustomHeader from "@/components/customHeader/customHeader";
import { FaList } from "react-icons/fa";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const ringgift_font = ringift;
  const pathName = usePathname();
  const router = useRouter();
  function handleRouting(route: string): void {
    router.push(route);
  }
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <html lang="en">
      <body className={ringgift_font.className} style={{ display: "flex" }}>
        {true? <Sidebar
          className={styles.sidebar}
          visibilityMode="hide"
          show={showDrawer}
          onClose={() => setShowDrawer(false)} 
          drawerClass={styles.drawer}
          header={
            <div className={styles.header}>
              <Image
                src={Images.Logo}
                alt="logo"
                width={50}
                height={50}
                style={{ marginRight: "0.5rem" }}
              />
              <p
                style={{
                  textAlign: "center",
                  margin: "auto 0",
                  fontSize: "1.7rem",
                  height: "fit-content",
                }}
              >
                {" "}
                HomeLand
              </p>
            </div>
          }
        >
          <div className={styles.sidebarBody}>
            {sidebarInfo.map((value, index) => (
              <Button
                key={index}
                className={`${
                  pathName == "/" + value.title.toLowerCase()
                    ? styles.current
                    : ""
                } ${styles.sidebarButton} `}
                onClick={() => handleRouting("/" + value.title.toLowerCase())}
                style={futuna.style}
              >
                {value.svg}
                <span style={{ margin: "auto 0" }}>{value.title}</span>
              </Button>
            ))}
          </div>
        </Sidebar>:<></>}
        <div
          style={{
            height: "130px",
            display: "flex",
            alignContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button className={styles.drawerButton} onClick={() => setShowDrawer(true)}>
            <FaList color={"#000000"}></FaList>
          </Button>
        </div>

        <div style={{ width: "100%" }}>
          <CustomHeader/>
          {children}
        </div>
      </body>
    </html>
  );
}
