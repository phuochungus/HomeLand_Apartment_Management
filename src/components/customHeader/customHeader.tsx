"use client";
import { HeaderButton } from "./headerButton/headerButton";
import styles from "./customHeader.module.css";
import { LoginButton } from "./loginButton/loginButton";
import { ChangeEvent, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { CustomModal } from "./customModal/customModal";
import { InfoButton } from "../infoButton/InfoButton";
import { Col, Form, Row } from "react-bootstrap";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import { stringify } from "querystring";
const CustomHeader = ({
  auth,
  drawerButton,
}: {
  auth: boolean;
  drawerButton?: ReactNode;
}): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const handleRoute = (href: string) => {
    router.push(href);
  };
  const [t, i18n] = useTranslation();

  function ChangeLanguage(value: string) {
    i18n.changeLanguage(value);
  }

  return (
    <>
      <CustomModal show={showModal} onHide={() => setShowModal(false)} />
      <header
        style={{
          width: "100%",
          height: "130px",
          display: "flex",
          padding: "0 3%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {drawerButton}
        <div className={styles.logoContainer}>
          <div className={styles.brandLabel}>HomeLand</div>
        </div>
        <div style={{ alignItems: "center" }}>
          <Row>
            <Col>
              {!auth ? (
                <div className={styles.menuContainer}>
                  <HeaderButton
                    title={"Home"}
                    hideIcon={true}
                    onClick={() => handleRoute("/home")}
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
            </Col>
            {auth ? (
              <Row>
                <Col>
                  <InfoButton></InfoButton>
                </Col>

                <Col
                  md="auto"
                  style={{
                    alignSelf: "center",
                    display: "flex",
                    height: "fit-content",
                  }}
                >
                  <Form.Select
                    defaultValue="vi"
                    onChange={(e) => ChangeLanguage(e.target.value)}
                  >
                    <option value="vi">Vi</option>
                    <option value="en">En</option>
                  </Form.Select>
                </Col>
              </Row>
            ) : (
              <>
                <div className={styles.loginContainer}>
                  <LoginButton
                    onClick={() => {
                      router.push("/login");
                    }}
                  ></LoginButton>
                </div>

                <Col
                  md="auto"
                  style={{
                    alignSelf: "center",
                    display: "flex",
                    height: "fit-content",
                  }}
                >
                  <Form.Select
                    defaultValue="vi"
                    onChange={(e) => ChangeLanguage(e.target.value)}
                  >
                    <option value="vi">Vi</option>
                    <option value="en">En</option>
                  </Form.Select>
                </Col>
              </>
            )}
          </Row>
        </div>
      </header>
    </>
  );
};

export default CustomHeader;
