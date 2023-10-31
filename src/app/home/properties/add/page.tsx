"use client";
import {
  Button,
  Form,
  FormGroup,
  Image,
  InputGroup,
  Modal,
  Spinner,
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
import { useEffect, useState } from "react";
import SearchBar from "@/components/searchBar/searchBar";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { loadingFiler, removeLoadingFilter, search } from "@/libs/utils";
function constraintOnlyNumber(str: string): boolean {
  return !isNaN(Number(str));
}
function getImageList(): string[] {
  const grid = document.getElementById("imageBlobGrid");
  const length = grid?.children.length;
  if (!length) return [];
  const result: string[] = [];
  for (let index = 0; index < length; index++) {
    const element = grid?.children.item(index);
    result.push((element as HTMLImageElement).src);
  }
  return result;
}

function missingField(element: HTMLElement) {
  element.className = element.className.split("missing")[0];
  element.className += " " + styles.missing;
  element.onfocus = () => {
    element.className = element.className.split("missing")[0];
    element.onfocus = null;
  };
}
function validateData() {
  let flag: boolean = true;
  const field = [
    "name",
    "width",
    "length",
    "bedroom",
    "bathroom",
    "description",
  ];
  const grid = document.getElementById("imageBlobGrid");
  if (!grid) {
    missingField(document.getElementById("label-file-upload")!);
    flag = false;
  }
  field.forEach((element) => {
    const inputElement = document.getElementById(element) as HTMLInputElement;
    if (inputElement.value.length === 0) {
      missingField(inputElement);
      flag = false;
    }
  });
  return flag;
}
async function addImage(data: FormData, fileList: string[]) {
  for await (const iterator of fileList) {
    const blob = await fetch(iterator).then(async (r) => {
      return await r.blob();
    });
    const file = new File(
      [blob],
      fileList.indexOf(iterator) + "." + blob.type.split("/")[1]
    );
    data.append("images", file);
  }
}
export default function AddApartment() {
  const [show, setShow] = useState(false);
  function handleClose() {
    setShow(false);
  }
  const [selectedResidentLists, setSelectedList] = useState<Person[]>([]);
  const [residentLists, setResidentLists] = useState<Person[]>([]);
  const { isLoading, isError, data } = useQuery("resident", () =>
    axios.get("/api/resident").then((res) => {
      setResidentLists(res.data as Person[]);
      return res.data as Person[];
    })
  );

  async function handleSubmit() {
    loadingFiler(document.getElementsByTagName("form")[0]);
    if (!validateData()) {
      return;
    }
    const data = new FormData();
    const fileList = getImageList();
    data.append(
      "name",
      (document.getElementById("name") as HTMLInputElement).value
    );
    data.append(
      "width",
      (document.getElementById("width") as HTMLInputElement).value
    );
    data.append(
      "length",
      (document.getElementById("length") as HTMLInputElement).value
    );
    data.append("building_id", "BLD0");
    data.append("floor_id", "BLD0/FLR0");
    data.append(
      "number_of_bedroom",
      (document.getElementById("bedroom") as HTMLInputElement).value
    );

    data.append(
      "number_of_bathroom",
      (document.getElementById("bathroom") as HTMLInputElement).value
    );
    data.append("rent", "100000");
    data.append(
      "description",
      (document.getElementById("description") as HTMLInputElement).value
    );
    selectedResidentLists.forEach((element) => {
      data.append("residentIds", element.id);
    });
    await addImage(data, fileList).then(() => {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/api/apartment",
        data: data,
      };
      console.log(data.get("images"));
      axios
        .request(config)
        .then((res) => {
          alert("Done create");
        })
        .catch((err) => {
          alert(err.response.data);
        });
    });
  }
  function searchtest(params: string) {
    setResidentLists(search(data!, "name", params));
  }
  function onCheck(param: Person) {
    const temp = selectedResidentLists;
    if (!temp.includes(param)) {
      temp.push(param);
      setSelectedList(temp);
    }
  }
  function onUnCheck(param: Person) {
    const temp = selectedResidentLists;
    if (temp.includes(param)) {
      temp.splice(temp.indexOf(param));
      setSelectedList(temp);
    }
  }
  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          margin: "50px 0px",
          justifyContent: "center",
          alignContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Spinner></Spinner>
      </div>
    );
  if (isError)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
          flexWrap: "wrap",
        }}
      >
        Co loi
      </div>
    );

  return (
    <>
      <div className={styles.content}>
        <Form
          className={futuna.className}
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e)
            handleSubmit();
          }}
        >
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
                <InputGroup
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                >
                  <Form.Control
                    type="number"
                    id="bedroom"
                    style={{
                      borderLeftStyle: "hidden",
                      borderWidth: "3px",
                      borderColor: "#e8eaec",
                      borderTopRightRadius: "7px",
                      borderBottomRightRadius: "7px",
                      borderTopLeftRadius: "0",
                      borderBottomLeftRadius: "0",
                    }}
                    className="shadow-none"
                    placeholder="0"
                    min={0}
                    max={10}
                  ></Form.Control>
                  <FaBed
                    style={{
                      height: "100%",
                      width: "30px",
                      alignSelf: "center",
                      borderStyle: "solid",
                      borderColor: "#e8eaec",
                      borderRightStyle: "hidden",
                      paddingLeft: "10px",
                      borderTopLeftRadius: "7px",
                      borderBottomLeftRadius: "7px",
                      borderWidth: "3px",
                    }}
                    size={"20px"}
                  />
                </InputGroup>
              </div>
              <div className={styles.selectItem}>
                <Form.Label>Bathrooms:</Form.Label>
                <InputGroup
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                >
                  <Form.Control
                    id="bathroom"
                    type="number"
                    style={{
                      borderLeftStyle: "hidden",
                      borderWidth: "3px",
                      borderTopRightRadius: "7px",
                      borderBottomRightRadius: "7px",
                      borderTopLeftRadius: "0",
                      borderBottomLeftRadius: "0",
                      borderColor: "#e8eaec",
                    }}
                    placeholder="0"
                    className="shadow-none"
                    min={0}
                    max={10}
                  />
                  <FaShower
                    style={{
                      height: "100%",
                      width: "30px",
                      alignSelf: "center",
                      borderStyle: "solid",
                      borderColor: "#e8eaec",
                      borderRightStyle: "hidden",
                      paddingLeft: "10px",
                      borderTopLeftRadius: "7px",
                      borderBottomLeftRadius: "7px",
                      borderWidth: "3px",
                    }}
                    size={"20px"}
                  />
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
                    id="width"
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
                    id="length"
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
                      borderTopLeftRadius: "7px",
                      borderBottomLeftRadius: "7px",
                      borderWidth: "3px",
                    }}
                    size={"20px"}
                  />
                  <Form.Select
                    id={"status"}
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
              id={"description"}
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
                  ResidentItem(value, index, onUnCheck)
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
              type="reset"
              // onClick={() => router.refresh()}
            >
              Clear
            </Button>
            <Button
              type="submit"
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
          <SearchBar
            className={styles.searchBar}
            onChange={searchtest}
          ></SearchBar>
          <hr />
          <div style={{ overflow: "scroll", height: "20rem" }}>
            {residentLists.map((value, index) =>
              ModalResidentItem(
                value,
                index,
                selectedResidentLists.includes(value),
                (param) => {
                  onCheck(param);
                },
                (param) => {
                  onUnCheck(param);
                }
              )
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
  selected: boolean,
  onCheck: (param: Person) => void,
  onUnCheck: (param: Person) => void
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
          onClick={(e) => {
            const checked = e.currentTarget.checked;
            if (checked) onCheck(value);
            else onUnCheck(value);
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
const ResidentItem = (
  value: Person,
  index: number,
  onRemove: (param: Person) => void
) => {
  return (
    <div
      id={"selectedResident" + index}
      key={index}
      className={styles.residentListsItem}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            flexWrap: "wrap",
            marginRight: "20px",
          }}
        >
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
        </div>
        <div>
          <div>{value.name}</div>
          <div>{value.id}</div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={styles.getMoreInfoButton}>
          <button> Get more info</button>
        </div>
        <button
          className={styles.removeButton}
          onClick={(e) => {
            const element = document.getElementById("selectedResident" + index);
            if (element) {
              loadingFiler(element);
              e.preventDefault();
              onRemove(value);
              removeLoadingFilter(element);
            }
          }}
        >
          <FaTrash></FaTrash>
        </button>
      </div>
    </div>
  );
};
