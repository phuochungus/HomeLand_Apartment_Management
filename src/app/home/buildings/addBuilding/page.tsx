"use client";
import React, { ChangeEvent, useCallback, useState } from "react";
import styles from "./addBuilding.module.scss";
import mainStyles from "../../page.module.css";
import utilStyles from "@/styles/utils.module.scss";
import Form from "react-bootstrap/Form";
import clsx from "clsx";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import Image from "next/image";
import ToastComponent from "@/components/ToastComponent/ToastComponent";
import { residentService } from "@/apiServices/residentService";
import { futuna } from "../../../../../public/fonts/futura";
type FormValue = {
  name: string;
  address: string;
  maxFloor: string;
  managerId: string;
};
const AddBuilding = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    address: "",
    maxFloor: "",
    managerId: "",
  });
  const [errors, setErrors] = useState<any>();
  const validation = () => {
    let err = {} as FormValue;
   
    if (formValue.name === "") {
      err.name = "Trường tên là bắt buộc!";
    }
    if (formValue.address === "") {
      err.address = "Trường địa chỉ là bắt buộc!";
    }
    if (formValue.maxFloor === "") {
      err.maxFloor = "Trường số tầng là bắt buộc!";
    }
    if (formValue.managerId === "") {
      err.managerId = "Trường mã người quản lí là bắt buộc!";
    }
    return err;
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newObj = { ...formValue, [e.target.name]: e.target.value };
    setFormValue(newObj);
  };

  const createHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validation();
    setErrors(err);
    if(Object.keys(err).length === 0) {
      const form = new FormData();
    form.append("name", formValue.name);
    form.append("address", formValue.address);
    form.append("manager_id", formValue.managerId);
    form.append("max_floor", formValue.maxFloor);
    try {
      await residentService.createResident(form);
    } catch (error) {
      console.log("error");
    }
    }
  };
  return (
    <main className={mainStyles.main}>
      <div className={styles.wapper}>
        <p className={utilStyles.headingXl}>Tạo tòa nhà</p>

        <Form className={clsx(styles.form, futuna.className)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className={styles.label}>Tên</Form.Label>
            <Form.Control
              size="lg"
              name="name"
              value={formValue.name}
              onChange={handleChange}
              type="text"
              placeholder="A01..."
            />
            {errors && errors.name && <span className={styles.error}>{errors.name}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Địa chỉ</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="address"
              value={formValue.address}
              onChange={handleChange}
              
            />
            {errors &&errors.address && (
              <span className={styles.error}>{errors.address}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Số tầng</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="maxFloor"
              onChange={handleChange}
              value={formValue.maxFloor}
              placeholder=""
            />
            {errors &&errors.maxFloor && (
              <span className={styles.error}>{errors.maxFloor}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Mã người quản lí</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="managerId"
              value={formValue.managerId}
              onChange={handleChange}
              placeholder=""
            />
            {errors &&errors.managerId && (
              <span className={styles.error}>{errors.managerId}</span>
            )}
          </Form.Group>
         
          <ToastComponent type="success" />

          <ButtonComponent onClick={createHandle} className={styles.creatBtn}>
            Tạo
          </ButtonComponent>
        </Form>
      </div>
    </main>
  );
};

export default AddBuilding;
