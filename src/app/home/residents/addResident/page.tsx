"use client";
import React, { useCallback, useState } from "react";
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
interface File {
  preview: string;
}
const AddResident = () => {
  const [name, setName] = useState("");
  const [cccd, setCccd] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [frontImg, setFrontImg] = useState<File>({ preview: "" });
  const [backImg, setBackImg] = useState<File>({ preview: "" });
  const handleFontImg = (e: any) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);

    setFrontImg(file);
  };
  const handleBackImg = (e: any) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setBackImg(file);
  };
  const createHandle = async() => {
    const data = {
      role:'resident',
      gender,
      name,
      dayOfBirth : new Date(dayOfBirth),
      phone,
      email,
      cccd,
      frontImg: "fdfd",
      backImg:"fdfs"
    }

    try {
      await residentService.createResident(data)
    console.log(data)

    }
    catch (error){
      console.log('sai rồi')
    }
   

  };
  return (
    <main className={mainStyles.main}>
      <div className={styles.wapper}>
        <p className={utilStyles.headingXl}>Tạo cư dân</p>
        <Form method="post" className={clsx(styles.form, futuna.className) }>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className={styles.label}>Họ và tên</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="lg"
              type="text"
              placeholder="Nguyễn Văn A..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className={styles.label}>Số CCCD</Form.Label>
            <Form.Control
              value={cccd}
              onChange={(e) => setCccd(e.target.value)}
              size="lg"
              type="text"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={styles.label}>Giới tính</Form.Label>

            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                label="Nam"
                name="group1"
                type="radio"
                value="male"
                onChange={(e) => setGender(e.target.value)}
                id={`inline-radio-1`}
              />
              <Form.Check
                inline
                label="Nữ"
                name="group1"
                type="radio"
                onChange={(e) => setGender(e.target.value)}
                value="femmale"
                id={`inline-radio-2`}
              />
              <Form.Check
                inline
                label="Khác "
                name="group1"
                type="radio"
                id={`inline-radio-3`}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              type="email"
              placeholder="abc@gmail.com..."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Phone number</Form.Label>
            <Form.Control
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              size="lg"
              type="text"
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Ngày sinh</Form.Label>
            <Form.Control
              value={dayOfBirth}
              onChange={(e) => setDayOfBirth(e.target.value)}
              size="lg"
              type="date"
              placeholder=""
            />
          </Form.Group>
          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Ảnh trước CCCD</Form.Label>
              <Form.Control
                accept="image/*"
                onChange={handleFontImg}
                size="lg"
                type="file"
                placeholder=""
              />
              {frontImg.preview !== "" && (
                <Image
                  onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
                  className={styles.img}
                  width={80}
                  height={40}
                  alt=""
                  src={frontImg.preview}
                />
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Ảnh sau CCCD</Form.Label>
              <Form.Control
                accept="image/*"
                onChange={handleBackImg}
                size="lg"
                type="file"
                placeholder=""
              />
              {backImg.preview !== "" && (
                <Image
                  onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
                  className={styles.img}
                  width={80}
                  height={40}
                  alt=""
                  src={backImg.preview}
                />
              )}
            </Form.Group>
          </div>
          <ToastComponent type="success" />
       
        </Form>
        <ButtonComponent onClick={createHandle} className={styles.creatBtn}>
            Tạo
          </ButtonComponent>
      </div>
    </main>
  );
};

export default AddResident;
