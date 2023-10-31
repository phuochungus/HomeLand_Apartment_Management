"use client";

import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS

import { useEffect, useState } from "react";
import { ringift } from "../../../public/fonts/Ringift";
import { Sidebar } from "@/components/sidebar/sidebar";
import styles from "./layout.module.css";
import { Button } from "react-bootstrap";
import Image from "next/image";
import { Images } from "../../../public/images";
import { futuna } from "../../../public/fonts/futura";
import { sidebarInfo } from "@/constraints/sidebarRoutes";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
  const searchParam = useSearchParams();
  const router = useRouter();
  function handleRouting(route: string): void {
    router.push(route);
  }

  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <html lang="en">
      <body className={ringgift_font.className} style={{ display: "flex" }}>
        {searchParam.get("auth") != null ? (
          <Sidebar
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
                <div key={index} style={{ marginBottom: "3rem" }}>
                  {" "}
                  <Button
                    className={`${
                      pathName.includes("/home/" + value.title.toLowerCase())
                        ? styles.current
                        : ""
                    } ${styles.sidebarButton} `}
                    onClick={() =>
                      handleRouting(
                        "/home/" + value.title.toLowerCase() + "?auth=true"
                      )
                    }
                    style={futuna.style}
                  >
                    {value.svg}
                    <span style={{ margin: "auto 0" }}>{value.title}</span>
                  </Button>
                  <div
                    className={`${styles.sidebarButtonMenu} ${futuna.className}`}
                  >
                    {value.menu?.map((value, index) => (
                      <a
                        href={value.href}
                        key={index}
                        className={`${
                          pathName == value.href
                            ? styles.currentItemMenu
                            : ""
                        }`}
                        
                      >
                        {value.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Sidebar>
        ) : (
          <></>
        )}
        <div
          style={{
            height: "130px",
            display: "flex",
            alignContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            className={styles.drawerButton}
            onClick={() => setShowDrawer(true)}
          >
            <FaList color={"#000000"}></FaList>
          </Button>
        </div>

        <div
          style={{
            width: "100%",
            backgroundColor: "#E8EAEC",
            height: "fit-content",
          }}
        >
          <CustomHeader auth={searchParam.get("auth") == null ? false : true} />
          {children}
        </div>
      </body>
    </html>
  );
}
