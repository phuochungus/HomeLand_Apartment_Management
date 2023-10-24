"use client";
import {
  Button,
  Form,
  FormGroup,
  Image,
  InputGroup,
  Modal,
} from "react-bootstrap";
import styles from "./add.module.css";
import { futuna } from "../../../../../public/fonts/futura";
import {
  FaBed,
  FaCheckCircle,
  FaList,
  FaPersonBooth,
  FaShower,
  FaSquare,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import DragDropFileInput from "@/components/dragDropFileInput/drapDropFileInput";
import { Person } from "@/models/person";
import { useState } from "react";
import SearchBar from "@/components/searchBar/searchBar";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
function constraintOnlyNumber(str: string): boolean {
  return !isNaN(Number(str));
}
export default function AddApartment() {
  const [show, setShow] = useState(false);
  function handleClose() {
    setShow(false);
  }
  var selectedResidentLists: Person[] = [];
  var residentLists: Person[] = [];
  const { isLoading, isError, data } = useQuery("resident", () =>
    axios.get("/api/resident").then((res) => res.data as Person[])
  );
  const router = useRouter();

  async function handleSubmit() {
    document.getElementById("name");
  }
  if (isLoading || isError) residentLists = [];
  else residentLists = data!;
  return (
    <>
      <div className={styles.content}>
        <Form className={futuna.className}>
          <Form.Control
            id="name"
            type="text"
            placeholder="Aparment name..."
            style={{ width: "30%" }}
          ></Form.Control>
          <div style={{ width: "100%", height: "20px" }}></div>
          <DragDropFileInput>
            <div
              className={styles.uploadIcon}
              style={{
                width: "100%",
                height: "200px",
                display: "flex",
                flexWrap: "wrap",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <FaUpload size={"3rem"}></FaUpload>
            </div>
          </DragDropFileInput>
          <FormGroup className={styles.typeSelectContainer}>
            <FormGroup
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div className={styles.selectItem} style={{ margin: "0" }}>
                <Form.Label>Bedrooms:</Form.Label>
                <InputGroup>
                  <FaBed
                    style={{
                      height: "100%",
                      width: "30px",
                      alignSelf: "center",
                      borderStyle: "solid",
                      borderColor: "#e8eaec",
                      borderRightStyle: "hidden",
                      paddingLeft: "10px",
                      borderRadius: "7px",
                    }}
                    size={"20px"}
                  />
                  <Form.Control
                    type="number"
                    style={{
                      borderLeftStyle: "hidden",
                      borderWidth: "3px",
                      borderColor: "#e8eaec",
                    }}
                    className="shadow-none"
                    placeholder="0"
                    min={0}
                    max={10}
                  ></Form.Control>
                </InputGroup>
              </div>
              <div className={styles.selectItem}>
                <Form.Label>Bathrooms:</Form.Label>
                <InputGroup>
                  <FaShower
                    style={{
                      height: "100%",
                      width: "30px",
                      alignSelf: "center",
                      borderStyle: "solid",
                      borderColor: "#e8eaec",
                      borderRightStyle: "hidden",
                      paddingLeft: "10px",
                      borderRadius: "7px",
                    }}
                    size={"20px"}
                  />
                  <Form.Control
                    type="number"
                    style={{
                      borderLeftStyle: "hidden",
                      borderWidth: "3px",
                      borderColor: "#e8eaec",
                    }}
                    placeholder="0"
                    className="shadow-none"
                    min={0}
                    max={10}
                  ></Form.Control>
                </InputGroup>
              </div>
              <div className={styles.selectItem}>
                <Form.Label>Square Area</Form.Label>

                <InputGroup style={{ display: "flex", alignContent: "center" }}>
                  <FaSquare
                    style={{ marginRight: "10px", alignSelf: "center" }}
                    size={"20px"}
                  />
                  <Form.Control
                    type="text"
                    style={{
                      borderRadius: "20px",
                      height: "20px",
                      alignSelf: "center",
                      marginRight: "0.5rem",
                      fontSize: "0.7rem",
                    }}
                    onChange={(e) => {
                      if (!constraintOnlyNumber(e.currentTarget.value)) {
                        alert("Square Area must be a number");
                        e.currentTarget.value = e.currentTarget.value.slice(
                          0,
                          e.currentTarget.value.length - 1
                        );
                      }
                    }}
                  />
                  <Form.Label
                    style={{
                      alignSelf: "center",
                      marginRight: "0.5rem",
                      fontSize: "1.7rem",
                    }}
                  >
                    x
                  </Form.Label>
                  <Form.Control
                    type="text"
                    style={{
                      borderRadius: "20px",
                      height: "20px",
                      alignSelf: "center",
                      marginRight: "0.5rem",
                      fontSize: "0.7rem",
                    }}
                    onChange={(e) => {
                      if (!constraintOnlyNumber(e.currentTarget.value)) {
                        alert("Square Area must be a number");
                        e.currentTarget.value = e.currentTarget.value.slice(
                          0,
                          e.currentTarget.value.length - 1
                        );
                      }
                    }}
                  />
                  <Form.Label style={{ alignSelf: "center" }}>
                    (m<sup>2</sup>)
                  </Form.Label>
                </InputGroup>
              </div>
              <div className={styles.selectItem}>
                <Form.Label>Status</Form.Label>
                <InputGroup style={{ display: "flex", alignContent: "center" }}>
                  <FaCheckCircle
                    style={{
                      height: "100%",
                      width: "30px",
                      alignSelf: "center",
                      borderStyle: "solid",
                      borderColor: "#e8eaec",
                      borderRightStyle: "hidden",
                      paddingLeft: "10px",
                      zIndex: "10",
                      borderRadius: "7px",
                    }}
                    size={"20px"}
                  />
                  <Form.Select
                    style={{
                      borderLeftStyle: "hidden",
                      borderColor: "#e8eaec",
                      borderWidth: "2px",
                    }}
                  >
                    <option value={"active"}>Active</option>
                    <option value={"disable"}>Disable</option>
                  </Form.Select>
                </InputGroup>
              </div>
            </FormGroup>
          </FormGroup>
          <FormGroup className={styles.formGroupContainer}>
            <Form.Label
              style={{
                fontWeight: "medium",
                fontSize: "20px",
                marginLeft: "20px",
              }}
            >
              About this apartment
            </Form.Label>
            <Form.Control
              as={"textarea"}
              type="text"
              aria-multiline={true}
              style={{ height: "248px" }}
            />
          </FormGroup>
          <FormGroup className={styles.formGroupContainer}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                flexWrap: "wrap",
                marginBottom: "10px",
              }}
            >
              <Form.Label
                style={{
                  fontWeight: "medium",
                  fontSize: "20px",
                  marginLeft: "20px",
                  verticalAlign: "center",
                }}
              >
                List by aparment resident
              </Form.Label>
              <Button
                style={{
                  backgroundColor: "#eadaff",
                  width: "47px",
                  height: "47px",
                  borderRadius: "20px",
                  borderStyle: "none",
                  color: "black",
                  fontSize: "20px",
                }}
                onClick={() => setShow(true)}
              >
                +
              </Button>
            </div>
            {selectedResidentLists.length == 0 ? (
              <p
                style={{ textAlign: "center" }}
              >{`This aparment haven't been lived by any resident`}</p>
            ) : (
              <div className={styles.residentListsContainer}>
                {" "}
                {selectedResidentLists.map((value, index) =>
                  ResidentItem(value, index)
                )}{" "}
              </div>
            )}
          </FormGroup>
          <FormGroup
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "2rem 0",
            }}
          >
            <Button
              style={{
                backgroundColor: "#FF4747",
                borderColor: "#FF4747",
                fontSize: "2rem",
                paddingLeft: "3rem",
                paddingRight: "3rem",
                borderRadius: "1rem",
              }}
              type="button"
              onClick={() => router.refresh()}
            >
              Clear
            </Button>
            <Button
              style={{
                backgroundColor: "#2A9928",
                borderColor: "#2A9928",
                fontSize: "2rem",
                paddingLeft: "3rem",
                paddingRight: "3rem",
                borderRadius: "1rem",
              }}
            >
              Save
            </Button>
          </FormGroup>
        </Form>
      </div>
      <Modal show={show} onHide={handleClose} className={futuna.className}>
        <Modal.Header>
          <Modal.Title>Search resident</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SearchBar className={styles.searchBar}></SearchBar>
          <hr />
          <div style={{ overflow: "scroll", height: "20rem" }}>
            {residentLists.map((value, index) =>
              ModalResidentItem(value, index, selectedResidentLists)
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
const ModalResidentItem = (
  value: Person,
  index: number,
  selectedResidentLists: Person[]
) => {
  return (
    <div
      id={"modelResidentItem:" + value.id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          style={{ marginRight: "10px" }}
          onChange={(e) => {
            if (e.currentTarget.checked) {
              console.log("Click");
              selectedResidentLists.push(value);
            } else
              selectedResidentLists.splice(
                selectedResidentLists.findIndex(() => value),
                1
              );
          }}
        />
        {value.avatar ? (
          <Image
            src={value.avatar}
            alt="ava"
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "2rem",
              marginRight: "0.5rem",
            }}
          ></Image>
        ) : (
          <FaPersonBooth style={{ marginRight: "10px" }} />
        )}

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>{value.id}</div>
          <div>{value.name}</div>
        </div>
      </div>
      <button>
        <FaList />
      </button>
    </div>
  );
};
const ResidentItem = (value: Person, index: number) => {
  return (
    <div key={index} className={styles.residentListsItem}>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            flexWrap: "wrap",
            marginRight: "20px",
          }}
        >
          <FaPersonBooth></FaPersonBooth>
        </div>
        <div>
          <div>{value.name}</div>
          <div>{value.id}</div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={styles.getMoreInfoButton}>
          <div> Get more info</div>
        </div>
        <button className={styles.removeButton} onClick={() => {}}>
          <FaTrash></FaTrash>
        </button>
      </div>
    </div>
  );
};
