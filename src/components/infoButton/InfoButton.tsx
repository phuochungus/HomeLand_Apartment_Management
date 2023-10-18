import {
  FaAddressBook,
  FaRegArrowAltCircleDown,
  FaSignOutAlt,
} from "react-icons/fa";
import { futuna } from "../../../public/fonts/futura";
import styles from "./infoButton.module.css";
import {
  Button,
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import React, { useState } from "react";

export const InfoButton = ({
  buttonBody,
}: {
  buttonBody?: JSX.Element[] | never[] | JSX.Element;
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownButton = React.forwardRef(() => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "fit-content",
        backgroundColor: "white",
        width: "fit-content",
        padding: "10px",
        borderStyle: "solid",
        borderRadius: "2rem",
      }}
      className={`${futuna.className}`}
    >
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
        onClick={() => setShowDropDown(!showDropDown)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30  "
          fill="currentColor"
          className="bi bi-person-circle"
          viewBox="0 0 16 16"
          style={{ margin: "auto 5px" }}
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
        <p style={{ margin: "auto 5px" }}>Nguyen Phuoc Hung</p>
        <FaRegArrowAltCircleDown style={{ margin: "auto 5px" }} size={25}>
          {" "}
        </FaRegArrowAltCircleDown>
      </button>
    </div>
  ));
  dropdownButton.displayName = "ddbtn";
  const dropdownInfo = [
    {
      title: "Edit profile",
      icon: <FaAddressBook />,
    },
    { title: "Log out", icon: <FaSignOutAlt /> },
  ];
  return (
    <Dropdown
      style={{ display: "flex", alignContent: "center", flexWrap: "wrap" }}
    >
      <DropdownToggle as={dropdownButton} />
      {/* <DropdownToggle/> */}

      <DropdownMenu
        show={showDropDown}
        style={{
          position: "absolute",
          inset: "0px 0px auto auto",
          transform: "translate3d(-10px, 94px, 0px)",
        }}
      >
        <div
          style={{
            width: "fit-content",
            marginRight: "100px",
            height: "fit-content",
          }}
          className={futuna.className}
        >
          {dropdownInfo.map((value, index) => (
            <div key={index} className={styles.dropdownItem}>
              <div style={{ margin: "auto 0" }}>{value.icon}</div>
              <div style={{ width: "10px", height: "100%" }} />
              <div style={{ fontSize: "1.3rem" }}> {value.title}</div>
            </div>
          ))}
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};
