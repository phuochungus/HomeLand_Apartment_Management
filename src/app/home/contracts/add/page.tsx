"use client";
import React, { useState } from "react";
import styles from "./addContract.module.css";
import { futuna } from "../../../../../public/fonts/futura";
import { useTranslation } from "react-i18next";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import SearchDropdown from "@/components/searchDropdown/searchDropdown";
import { format } from "date-fns";
import { Resident } from "@/models/resident";
import axios from "axios";
import { useQuery } from "react-query";
export default function Page() {
  const [t, i18n] = useTranslation();
  //const [selectedResident, setSelectedResident] = useState<Resident>();
  const [Residents, setResidents] = useState<Resident[]>([]);
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const { isLoading, isError, data, refetch } = useQuery(
    "contract",
    () =>
      axios.get("/api/resident").then((res) => {
        setResidents([...Residents, ...(res.data as Resident[])]);
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

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
      title: t("create_at"),
      child: (
        <Form.Group className="mb-3">
          <Form.Control
            size="lg"
            type="date"
            name="dateOfBirth"
            value={new Date().toISOString().split("T")[0]}
            //    onChange={handleChange}
          />
          {/* {errors && errors.dateOfBirth && (
        <span className={styles.error}>{errors.dateOfBirth}</span>
      )} */}
        </Form.Group>
      ),
    },
    {
      title: t("expire_at"),
      child: (
        <Form.Group className="mb-3">
          <Form.Control
            size="lg"
            type="date"
            name="dateOfBirth"
            //value={formValue.dateOfBirth}
            //    onChange={handleChange}
          />
          {/* {errors && errors.dateOfBirth && (
            <span className={styles.error}>{errors.dateOfBirth}</span>
          )} */}
        </Form.Group>
      ),
    },
  ];

  return (
    <main className={styles.main} style={futuna.style}>
      <h1>{t("add_contract")}</h1>
      <Container style={{ padding: 0 }} fluid>
        <Row>
          <Col>{ContractSortOptions.map((option) => FilterButton(option))}</Col>
          <Col>{DateSortOptions.map((option) => FilterButton(option))}</Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col>
            <Table responsive="sm" style={{ width: "100%" }}>
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
                {/* {resident != undefined ? (
                  <tr>
                    <td>{resident.id}</td>
                    <td>{resident.profile.name}</td>
                    <td>{resident.payment_info}</td>
                    <td>{resident.stay_at && resident.stay_at.name}</td>
                    <td>{resident.profile.phone_number}</td>
                    <td>
                      {format(
                        new Date(resident.created_at),
                        "yyyy-MM-dd HH:mm:ss"
                      )}
                    </td>
                  </tr>
                ) : (
                  <></>
                )} */}
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
          </Col>
          <Col md="auto">
            <Button onClick={() => setShow(true)}>Edit</Button>
          </Col>

          <Modal
            show={show}
            fullscreen={"lg-down"}
            onHide={() => setShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>Modal body content</Modal.Body>
          </Modal>
        </Row>
      </Container>
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
              padding: 0,
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
