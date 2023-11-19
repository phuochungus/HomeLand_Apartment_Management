"use client";

import DragDropFileInput from "@/components/dragDropFileInput/drapDropFileInput";
import {
  Button,
  ButtonGroup,
  Dropdown,
  Form,
  InputGroup,
} from "react-bootstrap";
import { FaUpload } from "react-icons/fa";

import styles from "./addVehicle.module.css";
import { useRef, useState } from "react";
import { Resident } from "@/models/resident";
import { futuna } from "../../../../../public/fonts/futura";
import axios from "axios";
import { loadingFiler, removeLoadingFilter, search } from "@/libs/utils";
import { useQuery } from "react-query";
import React from "react";
import { ToastContainer } from "react-toastify";
import toastMessage from "@/utils/toast";
export default function AddVehicle(): React.ReactNode {
  const [selectedRes, setSelectedRes] = useState<Resident | undefined>(
    undefined
  );
  const [residents, setResidents] = useState<Array<Resident>>([]);
  const [imageList, setImageList] = useState<(File | URL)[]>(Array(3));
  const inputRef = useRef<HTMLButtonElement>(null);
  function handleFileChange(file: URL | File, index: number): void {
    const temp = [...imageList];
    if (temp.length > index) temp[index] = file;
    setImageList(temp);
  }
  const retrieveResidents = async () => {
    try {
      loadingFiler(document.body!);
      const res = await axios.get("/api/resident");
      removeLoadingFilter(document.body!);
      setResidents(res.data);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);
      console.log(error);
    }
  };
  const { isLoading, isError, data, refetch } = useQuery(
    "residents",
    retrieveResidents,
    {
      staleTime: Infinity,
    }
  );
  function handleOnFocus(): void {
    if (inputRef.current) inputRef.current.click();
  }
  function missingField(element: HTMLElement) {
    element.className = element.className.split("missing")[0];
    element.className += " " + styles.missing;
    element.onfocus = () => {
      element.className = element.className.split("missing")[0];
      element.onfocus = null;
    };
  }
  function validateData(): boolean {
    var flag = false;
    if (selectedRes == null) {
      flag = true;
      missingField(document.getElementById("inputId")!);
    }
    const licensePlate = document.getElementById("vehicleLicense");
    if (!licensePlate) {
      flag = true;
      missingField(document.getElementById("vehicleLicense_container")!);
    }
    const frontRegistrationPhotoURL = document.getElementById(
      "frontRegistrationPhotoURL"
    );
    if (!frontRegistrationPhotoURL) {
      flag = true;
      missingField(
        document.getElementById("frontRegistrationPhotoURL_container")!
      );
    }
    const backRegistrationPhotoURL = document.getElementById(
      "backRegistrationPhotoURL"
    );
    if (!backRegistrationPhotoURL) {
      flag = true;
      missingField(
        document.getElementById("backRegistrationPhotoURL_container")!
      );
    }
    return flag;
  }
  async function handleSubmit() {
    loadingFiler(document.body!);
    if (validateData()) {
      removeLoadingFilter(document.body!);
      return;
    }
    const data = new FormData();

    if (selectedRes) data.append("residentId", selectedRes.id);
    else {
      toastMessage({ type: "error", title: "Có lỗi đã xảy ra" });
      removeLoadingFilter(document.body!);
      return;
    }
    async function addImage(data: FormData, fileList: (File | URL)[]) {
      if (fileList[0] instanceof URL)
        data.append("licensePlate", fileList[0].href);
      else data.append("licensePlate", fileList[0]);
      if (fileList[1] instanceof URL)
        data.append("frontRegistrationPhoto", fileList[1].href);
      else data.append("frontRegistrationPhoto", fileList[1]);
      if (fileList[2] instanceof URL)
        data.append("backRegistrationPhoto", fileList[2].href);
      else data.append("backRegistrationPhoto", fileList[2]);
    }

    await addImage(data, imageList).then(async () =>  {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/api/vehicle",
        data: data,
      };
      await axios
        .request(config)
        .then((res) => {
          toastMessage({ type: "success", title: "Đã đăng ký thành công" });
          window.location.reload()
        })
        .catch((err) => {
          console.log(err);
          toastMessage({ type: "error", title: "Có lỗi đã xảy ra" });
        });
      removeLoadingFilter(document.body!);
    });
  }
  return (
    <>
      <div className={`${styles.container} ${futuna.className}`}>
        <Form style={{ width: "100%" }}>
          <Form.Group className={styles.form}>
            <Form.Group style={{ marginRight: "2vw" }}>
              <Form.Label className={`${styles.label} ${styles.required}`}>
                Biển số xe
              </Form.Label>
              <DragDropFileInput
                imageid={"vehicleLicense"}
                onChange={(files) => {
                  handleFileChange(files[0], 0);
                }}
                multiFile={false}
                className={styles.vehicleIdImage}
              >
                <div
                  className={styles.uploadIcon}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaUpload size={"3vw"}></FaUpload>
                </div>
              </DragDropFileInput>
              <Form.Label className={`${styles.label} ${styles.required}`}>
                Mặt trước giấy tờ xe
              </Form.Label>
              <DragDropFileInput
                imageid={"frontRegistrationPhotoURL"}
                onChange={(files) => {
                  handleFileChange(files[0], 1);
                }}
                multiFile={false}
                className={styles.vehicleIdImage}
              >
                <div
                  className={styles.uploadIcon}
                  style={{
                    width: "100%",
                    height: "100%",

                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaUpload size={"3vw"}></FaUpload>
                </div>
              </DragDropFileInput>
              <Form.Label className={`${styles.label} ${styles.required}`}>
                Mặt sau giấy tờ xe
              </Form.Label>
              <DragDropFileInput
                imageid={"backRegistrationPhotoURL"}
                onChange={(files) => {
                  handleFileChange(files[0], 2);
                }}
                multiFile={false}
                className={styles.vehicleIdImage}
              >
                <div
                  className={styles.uploadIcon}
                  style={{
                    width: "100%",
                    height: "100%",

                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaUpload size={"3vw"}></FaUpload>
                </div>
              </DragDropFileInput>
            </Form.Group>
            <Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className={`${styles.label} ${styles.required}`}>
                  Mã cư dân
                </Form.Label>
                <InputGroup style={{ width: "50%" }}>
                  <Form.Control
                    id="inputId"
                    size="lg"
                    name="id"
                    type="text"
                    onClick={() => handleOnFocus()}
                    onChange={(e) => {
                      setResidents(search(data, "id", e.target.value));
                    }}
                    style={{
                      margin: "0",
                    }}
                  />
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle
                      split
                      ref={inputRef}
                      style={{
                        background: "white",
                        color: "black",
                        borderColor: "#dee2e6",
                        borderLeftStyle: "none",
                        margin: "0",
                      }}
                    ></Dropdown.Toggle>
                    <Dropdown.Menu
                      align="end"
                      style={{ height: "200px", overflowY: "scroll" }}
                    >
                      {residents.map((value, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => {
                            console.log("click");
                            setSelectedRes(residents[index]);
                            (
                              document.getElementById(
                                "inputName"
                              ) as HTMLInputElement
                            ).value = residents[index].profile.name;
                            (
                              document.getElementById(
                                "inputId"
                              ) as HTMLInputElement
                            ).value = residents[index].id;
                            (
                              document.getElementById(
                                "inputSDT"
                              ) as HTMLInputElement
                            ).value = residents[index].profile.phone_number;
                          }}
                        >
                          {value.id}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </InputGroup>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className={`${styles.label} ${styles.required}`}>
                  Họ và tên
                </Form.Label>
                <Form.Control
                  id={"inputName"}
                  size="lg"
                  name="name"
                  type="text"
                  disabled={selectedRes ? true : false}
                  placeholder="Nguyễn Văn A..."
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className={`${styles.label} ${styles.required}`}>
                  CCCD
                </Form.Label>
                <Form.Control
                  id={"inputCCCD"}
                  size="lg"
                  name="CCCD"
                  type="text"
                  placeholder="CCCD is appeared here"
                  disabled={true}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className={`${styles.label} ${styles.required}`}>
                  Số điện thoại
                </Form.Label>
                <Form.Control
                  id={"inputSDT"}
                  size="lg"
                  name="SDT"
                  type="phone"
                  placeholder="03**************"
                  disabled={true}
                />
              </Form.Group>
            </Form.Group>
          </Form.Group>
          <Form.Group
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "2vw",
            }}
          >
            <Button onClick={handleSubmit} className={styles.creatBtn}>
              Tạo
            </Button>
          </Form.Group>
        </Form>
      </div>
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
    </>
  );
}