"use client";
import React from "react";
import styles from "./addContract.module.css";
import { futuna } from "../../../../../public/fonts/futura";
import { useTranslation } from "react-i18next";
import { Col, Container, Row, Table } from "react-bootstrap";
import SearchDropdown from "@/components/searchDropdown/searchDropdown";
export default function Page() {
  const [t, i18n] = useTranslation();
  const CurrentDate=new Date();
  
  const ContractSortOptions = [
    {
      title: t("building"),
      child: (
        <SearchDropdown
          title={"hello"}
          selections={["hello1", "hello2"]}
          onChange={() => {}}
          style={{ width: "100%" }}
        ></SearchDropdown>
      ),
    },
    {
      title: t("floor"),
      child: (
        <SearchDropdown
          title={"hello"}
          selections={["hello1", "hello2"]}
          onChange={() => {}}
          style={{ width: "100%" }}
        ></SearchDropdown>
      ),
    },
    {
      title: t("apartment"),
      child: (
        <SearchDropdown
          title={"hello"}
          selections={["hello1", "hello2"]}
          onChange={() => {}}
          style={{ width: "100%" }}
        ></SearchDropdown>
      ),
    },
  ];
  const DateSortOptions = [
    {
      title: t("apartment"),
      child: <p>{new Date().toString()}</p>,
    },
    {
      title: t("apartment"),
      child: <p>{new Date().toString()}</p>,
    },
  ];

  return (
    <main className={styles.main} style={futuna.style}>
      <h1>{t("add_contract")}</h1>
      <Container style={{ padding: 0 }}>
        <Row>
          <Col>{ContractSortOptions.map((option) => FilterButton(option))}</Col>
          <Col>{DateSortOptions.map((option) => FilterButton(option))}</Col>
        </Row>
      </Container>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>{t("ID")}</th>
            <th>{t("name")}</th>
            <th>{t("phone_number")}</th>
            <th>{t("apartment")}</th>
            <th>{t("create_at")}</th>
            <th>{t("expire_at")}</th>
          </tr>
        </thead>
        <tbody>
          {/* {ContractList.map((value, index) => (
            <tr key={index}>
              <td>{value.contract_id}</td>
              <td>{value.contract_id}</td>
              <td>{value.contract_id}</td>
              <td>{value.contract_id}</td>
              <td>{value.created_at.toString()}</td>
              <td>{value.expire_at.toString()}</td> <td></td>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </main>
  );
}

const FilterButton = ({
  title,
  child,
}: {
  title: string;
  child?: React.ReactNode;
}): React.ReactNode => {
  return (
    <Container
      className={` ${futuna.className}`}
      style={{ padding: 0, margin: "10px 0" }}
    >
      <Row className="align-items-center">
        <Col md="auto">
          <p
            style={{
              width: "100px",
              alignItems: "center",
              display: "flex",
              margin: 0,
            }}
          >
            {title}
          </p>
        </Col>
        <Col>{child}</Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
