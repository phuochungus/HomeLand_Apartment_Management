"use client";
import { HeaderButton } from "./headerButton/headerButton";
import style from "./customHeader.module.css";
import { LoginButton } from "./loginButton/loginButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomModal } from "./customModal/customModal";
import { InfoButton } from "../infoButton/InfoButton";
const CustomHeader = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const handleRoute = (href: string) => {
    router.push(href);
  };
  return (
    <>
      <CustomModal show={showModal} onHide={() => setShowModal(false)} />
      <header
        style={{
          width: "100%",
          height: "130px",
          display: "flex",
          padding: "0 2rem",
          justifyContent: "space-between",
        }}
      >
        <div className={style.logoContainer}>
          <div className={style.brandLabel}>HomeLand</div>
        </div>
        {false ? (
          <div className={style.menuContainer}>
            <HeaderButton
              title={"Home"}
              hideIcon={true}
              onClick={() => handleRoute("/")}
            />
            <HeaderButton
              title={"Apartments"}
              onClick={() => handleRoute("apartments")}
            />
            <HeaderButton
              title={"Residents"}
              onClick={() => handleRoute("residents")}
            />
            <HeaderButton
              title={"Services"}
              onClick={() => handleRoute("services")}
            />
          </div>
        ) : (
          <></>
        )}
        {true ? (
          <InfoButton></InfoButton>
        ) : (
          <div className={style.loginContainer}>
            <LoginButton onClick={() => setShowModal(true)}></LoginButton>
          </div>
        )}
      </header>
    </>
  );
};

export default CustomHeader;
