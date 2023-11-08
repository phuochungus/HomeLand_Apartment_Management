"use client";
import React, { ChangeEvent, ReactNode, useCallback, useState } from "react";
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
  Tab,
  Table,
} from "react-bootstrap";
import SearchDropdown from "@/components/searchDropdown/searchDropdown";
import { format } from "date-fns";
import { Resident } from "@/models/resident";
import axios from "axios";
import { useQuery } from "react-query";
import { Apartment } from "@/models/apartment";
import { Building } from "@/models/building";
import SearchBar from "@/components/searchBar/searchBar";
import { loadingFiler, removeLoadingFilter } from "../../../../libs/utils";
import toastMessage from "../../../../utils/toast";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
type CreateContractParams = {
  resident_id: string;
  apartment_id: string;
  role: string;
  status: string;
  created_at?: string;
  expire_at: string;
};
export default function Page() {
  const [t, i18n] = useTranslation();
  const [selectedResident, setSelectedResident] = useState<Resident>();
  const [Residents, setResidents] = useState<Resident[]>([]);
  const [Apartments, setApartments] = useState<Apartment[]>([]);
  const [Buildings, setBuildings] = useState<Building[]>([]);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState<any>();

  const [createContractParams, setCreateContractParams] =
    useState<CreateContractParams>({
      resident_id: "",
      apartment_id: "",
      role: "rent",
      status: "inactive",
      created_at: "",
      expire_at: "",
    });

  const handleCreate = async () => {
    const err = validation();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      const form = new FormData();
      form.append("resident_id", createContractParams.resident_id);
      form.append("apartment_id", createContractParams.apartment_id);
      form.append("role", createContractParams.role);
      form.append("status", createContractParams.status);
      form.append(
        "expire_at",
        `${createContractParams.expire_at}T03:37:07.070Z`
      );
      try {
        loadingFiler(document.body!);
        await axios
          .post("/api/contract", form)
          .then((response) => {
            router.back();
            removeLoadingFilter(document.body!);
            toastMessage({ type: "success", title: "Create successfully!" });
          })
          .catch((e) => {
            removeLoadingFilter(document.body!);
            toastMessage({ type: "error", title: "Create fail!" });
          });
      } catch (e) {
        console.log(e);
      }
    }
  };
  const validation = () => {
    let err = {} as CreateContractParams;
    if (createContractParams.apartment_id === "") {
      err.apartment_id = "Vui lòng chọn phòng!";
    }
    if (createContractParams.apartment_id === "") {
      err.expire_at = "Vui lòng chọn ngày hết hạn!";
    }
    if (createContractParams.apartment_id === "") {
      err.resident_id = "Vui lòng chọn cư dân!";
    }
    return err;
  };
  useQuery(
    "resident",
    () =>
      axios.get("/api/resident").then((res) => {
        setResidents(res.data as Resident[]);
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  useQuery(
    "apartment",
    () =>
      axios.get("/api/apartment").then((res) => {
        setApartments(res.data as Apartment[]);
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  useQuery(
    "building",
    () =>
      axios.get("/api/building").then((res) => {
        setBuildings(res.data as Building[]);
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newObj = {
        ...createContractParams,
        [e.target.name]: e.target.value,
      };
      setCreateContractParams(newObj);
    },
    [createContractParams]
  );

  const ContractSortOptions = [
    {
      title: t("building"),
      child: (
        <SearchDropdown
          title={"Choose Building"}
          selections={Buildings.map((building) => building.name)}
          onChange={(index) => {}}
          style={{ width: "100%" }}
        ></SearchDropdown>
      ),
    },
    {
      title: t("floor"),
      child: (
        <SearchDropdown
          title={"Choose Floor"}
          selections={["hello1", "hello2"]}
          onChange={() => {}}
          style={{ width: "100%" }}
        ></SearchDropdown>
      ),
    },
    {
      title: t("apartment"),
      required: true,
      child: (
        <div style={{ width: "100%" }}>
          {" "}
          <SearchDropdown
            title={"Choose Apartment"}
            style={{ width: "100%" }}
            selections={Apartments.map((apartment) => apartment.name)}
            onChange={(index) => {
              const newObj = {
                ...createContractParams,
                ["apartment_id"]: Apartments[index].apartment_id,
              };
              setCreateContractParams(newObj);
            }}
          ></SearchDropdown>
          {errors && errors.apartment_id && (
            <span className={styles.error}>{errors.apartment_id}</span>
          )}
        </div>
      ),
    },
  ];
  const DateSortOptions = [
    {
      title: t("create_at"),
      child: (
        <Form.Group>
          <Form.Control
            size="lg"
            type="date"
            name="create_at"
            disabled
            value={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
          />
        </Form.Group>
      ),
    },
    {
      title: t("expire_at"),
      required: true,

      child: (
        <Form.Group>
          <Form.Control
            size="lg"
            type="date"
            name="expire_at"
            onChange={handleChange}
          />
          {errors && errors.expire_at && (
            <span className={styles.error}>{errors.expire_at}</span>
          )}
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
      <Container style={{ padding: 0, marginTop: "20px" }}>
        <Row>
          <Col>
            <h5 className={styles.required} style={{ width: "100px" }}>
              {t("resident")}
            </h5>
            <Table responsive="sm" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>{t("ID")}</th>
                  <th>{t("name")}</th>
                  <th>{t("phone_number")}</th>
                  <th>{t("apartment")}</th>
                  <th>{t("create_at")}</th>
                </tr>
              </thead>
              <tbody>
                {selectedResident != undefined ? (
                  <tr>
                    <td>{selectedResident.id}</td>
                    <td>{selectedResident.profile.name}</td>
                    <td>{selectedResident.profile.phone_number}</td>
                    <td>
                      {selectedResident.stay_at &&
                        selectedResident.stay_at.name}
                    </td>
                    <td>
                      {format(
                        new Date(selectedResident.created_at),
                        "yyyy-MM-dd HH:mm:ss"
                      )}
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
              </tbody>
            </Table>
            {errors && errors.resident_id && (
              <span className={styles.error}>{errors.resident_id}</span>
            )}
          </Col>
          <Col md="auto">
            <Button onClick={() => setShow(true)}>Edit</Button>
          </Col>

          <Modal
            dialogClassName={styles.modal}
            show={show}
            style={futuna.style}
            onHide={() => setShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("residentsList")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                className={styles.itemContainer}
                style={{
                  height: "40px",
                  width: "40%",
                  borderStyle: "none",
                  margin: 0,
                }}
              >
                <SearchBar
                  className={styles.searchBar}
                  placeholder={t("search_resident")}
                ></SearchBar>
              </div>

              <Table style={{ width: "100%" }} striped hover>
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>{t("ID")}</th>
                    <th style={{ width: "20%" }}>{t("name")}</th>
                    <th style={{ width: "25%" }}>{t("phone_number")} </th>
                    <th style={{ width: "10%" }}>{t("apartment")}</th>
                    <th style={{ width: "25%" }}>{t("create_at")}</th>
                  </tr>
                </thead>
                <tbody>
                  {Residents.map((resident, index): ReactNode => {
                    const time = new Date(resident.created_at);
                    const createAt = format(time, "yyyy-MM-dd HH:mm:ss");
                    const handleRowClick = () => {
                      setSelectedResident(resident);
                      setCreateContractParams({
                        ...createContractParams,
                        resident_id: resident.id,
                      });
                      setShow(false);
                    };

                    return (
                      <tr
                        key={index}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRowClick()}
                      >
                        <td>{resident.id}</td>
                        <td>{resident.profile && resident.profile.name}</td>
                        <td>{resident.profile.phone_number}</td>
                        <td>{resident.stay_at && resident.stay_at.name}</td>
                        <td>{createAt}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Modal.Body>
          </Modal>
        </Row>
        <Row
          style={{
            display: "flex",

            marginTop: "250px",
            justifyContent: "center",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              paddingRight: "120px",
            }}
          >
            {" "}
            <Button
              className=" start-50"
              onClick={handleCreate}
              style={{ width: "100px" }}
            >
              Create
            </Button>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}

const FilterButton = ({
  title,
  child,
  required,
}: {
  title: string;
  child?: React.ReactNode;
  required?: boolean;
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
              marginRight: "20px",
            }}
            className={required ? styles.required : styles.non}
          >
            {title}
          </p>
        </Col>
        <Col
          style={{
            width: "100px",
            alignContent: "center",
            display: "flex",
            padding: 0,
            margin: 0,
          }}
        >
          {child}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
