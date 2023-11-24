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
  const field = ["name", "description"];
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
export default function AddService() {
  const [show, setShow] = useState(false);
  function handleClose() {
    setShow(false);
  }

  async function handleSubmit() {
    loadingFiler(document.body!);
    if (!validateData()) {
      removeLoadingFilter(document.body!);
      return;
    }
    const data = new FormData();
    const fileList = getImageList();
    data.append(
      "name",
      (document.getElementById("name") as HTMLInputElement).value
    );
    data.append(
      "description",
      (document.getElementById("description") as HTMLInputElement).value
    );
    await addImage(data, fileList).then(() => {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/api/service",
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
    removeLoadingFilter(document.body!);
  }

  return (
    <>
      <div className={styles.content}>
        <Form
          className={futuna.className}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Form.Control
            id="name"
            type="text"
            placeholder="Service Name..."
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
          <FormGroup className={styles.formGroupContainer}>
            <Form.Label
              style={{
                fontWeight: "medium",
                fontSize: "20px",
                marginLeft: "20px",
              }}
            >
              Description
            </Form.Label>
            <Form.Control
              id={"description"}
              as={"textarea"}
              type="text"
              aria-multiline={true}
              style={{ height: "248px" }}
            />
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
    </>
  );
}
