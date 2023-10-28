"use client";
import React, { ChangeEvent, useCallback, useState } from "react";
import styles from "./AddResident.module.scss";
import mainStyles from "../../page.module.css";
import utilStyles from "@/styles/utils.module.scss";
import { useDropzone } from "react-dropzone";
import Form from "react-bootstrap/Form";
import clsx from "clsx";
import { FormGroup } from "react-bootstrap";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import Image from "next/image";
import ToastComponent from "@/components/ToastComponent/ToastComponent";
import { FaFontAwesome } from "react-icons/fa";
import { residentService } from "@/apiServices/residentService";
import { futuna } from "../../../../../public/fonts/futura";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormValue = {
  name: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  frontImg: any;
  backImg: any;
};
const AddResident = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
  });
  const [errors, setErrors] = useState<any>();
  const [frontImg, setFrontImg] = useState<any>();
  const [backImg, setBackImg] = useState<any>();
  const handleFontImg = (e: any) => {
    const file = e.target.files[0];

    setFrontImg(file);
  };
  const handleBackImg = (e: any) => {
    const file = e.target.files[0];
    setBackImg(file);
  };
  const validation = () => {
    let err = {} as FormValue;
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phonePattern =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    if (formValue.name === "") {
      err.name = "Trường họ và tên là bắt buộc!";
    }
    if (formValue.dateOfBirth === "") {
      err.dateOfBirth = "Trường ngày sinh là bắt buộc!";
    }
    if (formValue.gender === "") {
      err.gender = "Trường giới tính là bắt buộc!";
    }
    if (formValue.email === "") {
      err.email = "Trường email là bắt buộc!";
    } else if (!emailPattern.test(formValue.email)) {
      err.email = "Email không hợp lệ!";
    }
    if (formValue.phoneNumber === "") {
      err.phoneNumber = "Trường số điện thoại là bắt buộc!";
    } else if (!phonePattern.test(formValue.phoneNumber)) {
      err.phoneNumber = "Số điện thoại không hợp lệ!";
    }
    if (!frontImg) {
      err.frontImg = "Vui lòng chọn ảnh!";
    }
    if (!backImg) {
      err.backImg = "Vui lòng chọn ảnh!";
    }
    return err;
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const newObj = { ...formValue, [e.target.name]: e.target.value };
    setFormValue(newObj);
  };

  const createHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validation();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      const form = new FormData();
      form.append("name", formValue.name);
      form.append("role", "resident");
      form.append("date_of_birth", formValue.dateOfBirth);
      form.append("gender", formValue.gender);
      form.append("phone_number", formValue.phoneNumber);
      form.append("email", formValue.email);
      form.append("front_identify_card_photo", frontImg);
      form.append("back_identify_card_photo", backImg);
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
        <p className={utilStyles.headingXl}>Tạo cư dân</p>

        <Form className={clsx(styles.form, futuna.className)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className={styles.label}>Họ và tên</Form.Label>
            <Form.Control
              size="lg"
              name="name"
              value={formValue.name}
              onChange={handleChange}
              type="text"
              placeholder="Nguyễn Văn A..."
            />
            {errors && errors.name && (
              <span className={styles.error}>{errors.name}</span>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label className={styles.label}>Giới tính</Form.Label>
            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                label="Nam"
                name="gender"
                type="radio"
                value="male"
                onChange={handleChange}
                id={`inline-radio-1`}
              />
              <Form.Check
                inline
                label="Nữ"
                name="gender"
                type="radio"
                onChange={handleChange}
                value="femmale"
                id={`inline-radio-2`}
              />
            </div>
            {errors && errors.gender && (
              <span className={styles.error}>{errors.gender}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Email</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              name="email"
              value={formValue.email}
              onChange={handleChange}
              placeholder="abc@gmail.com..."
            />
            {errors && errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Phone number</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="phoneNumber"
              onChange={handleChange}
              value={formValue.phoneNumber}
              placeholder=""
            />
            {errors && errors.phoneNumber && (
              <span className={styles.error}>{errors.phoneNumber}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Ngày sinh</Form.Label>
            <Form.Control
              size="lg"
              type="date"
              name="dateOfBirth"
              value={formValue.dateOfBirth}
              onChange={handleChange}
              placeholder=""
            />
            {errors && errors.dateOfBirth && (
              <span className={styles.error}>{errors.dateOfBirth}</span>
            )}
          </Form.Group>
          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Ảnh trước CCCD</Form.Label>
              <Form.Control
                accept="image/*"
                onChange={handleFontImg}
                size="lg"
                name="front"
                type="file"
                placeholder=""
              />
              {frontImg && (
                <Image
                  onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
                  className={styles.img}
                  width={80}
                  height={40}
                  alt=""
                  src={URL.createObjectURL(frontImg)}
                />
              )}
              {errors && errors.frontImg && (
                <span className={styles.error}>{errors.frontImg}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Ảnh sau CCCD</Form.Label>
              <Form.Control
                accept="image/*"
                name="back"
                onChange={handleBackImg}
                size="lg"
                type="file"
                placeholder=""
              />
              {backImg && (
                <Image
                  onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
                  className={styles.img}
                  width={80}
                  height={40}
                  alt=""
                  src={URL.createObjectURL(backImg)}
                />
              )}
              {errors && errors.backImg && (
                <span className={styles.error}>{errors.backImg}</span>
              )}
            </Form.Group>
          </div>

          <ButtonComponent onClick={createHandle} className={styles.creatBtn}>
            Tạo
          </ButtonComponent>
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
    </main>
  );
};

export default AddResident;
