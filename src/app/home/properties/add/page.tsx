"use client";
import { Button, Form, FormGroup, InputGroup } from "react-bootstrap";
import styles from "./add.module.css";
import { futuna } from "../../../../../public/fonts/futura";
import {
  FaBed,
  FaPersonBooth,
  FaShower,
  FaSquare,
  FaSquareRootAlt,
} from "react-icons/fa";
export default function AddApartment() {
  const residentLists = [
    {
      avatar: "",
      name: "Manh Dinh ho",
      id: "21521234124",
    },
  ];
  return (
    <div className={styles.content}>
      <Form className={futuna.className}>
        <Form.Control
          type="text"
          placeholder="Aparment name..."
          style={{ width: "30%" }}
        ></Form.Control>
        <Form.Control type="file"></Form.Control>
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
                  }}
                />
                <Form.Label style={{ alignSelf: "center" }}>x</Form.Label>
                <Form.Control
                  type="text"
                  style={{
                    borderRadius: "20px",
                    height: "20px",
                    alignSelf: "center",
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
                <FaSquare
                  style={{
                    height: "100%",
                    width: "30px",
                    alignSelf: "center",
                    borderStyle: "solid",
                    borderColor: "#e8eaec",
                    borderRightStyle: "hidden",
                    paddingLeft: "10px",
                  }}
                  size={"20px"}
                />
                <Form.Select
                  style={{
                    borderLeftStyle: "hidden",
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
            >
              +
            </Button>
          </div>

          {residentLists.length == 0 ? (
            <p
              style={{ textAlign: "center" }}
            >{`This aparment haven't been lived by any resident`}</p>
          ) : (
            <div className={styles.residentListsContainer}>
              {" "}
              {residentLists.map((value, index) => (
                <div key={index} className={styles.residentListsItem}>
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
                  <div className={styles.getMoreInfoButton}>
                    <div> Get more info</div>
                  </div>
                  <div className={styles.removeButton}>x</div>
                </div>
              ))}{" "}
            </div>
          )}
        </FormGroup>
      </Form>
    </div>
  );
}
